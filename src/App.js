import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import Teams from './pages/Teams';
import CreateTeam from './pages/CreateTeam';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/taskService';
import { fetchTeams, createTeam, deleteTeam } from './services/teamService';
import {
  loginUser,
  signupUser,
  verifyToken,
  saveAuthData,
  getAuthToken,
  getUser,
  clearAuthData,
  isAuthenticated
} from './services/authService';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    const token = getAuthToken();
    
    if (token) {
      try {
        const result = await verifyToken(token);
        if (result.valid) {
          const userData = getUser();
          setUser(userData);
          setAuthenticated(true);
          setCurrentScreen('dashboard');
          await loadData();
        } else {
          clearAuthData();
          setCurrentScreen('login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        clearAuthData();
        setCurrentScreen('login');
      }
    } else {
      setCurrentScreen('login');
    }
    setLoading(false);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      
      if (response.success) {
        saveAuthData(response.token, response.user);
        setUser(response.user);
        setAuthenticated(true);
        setCurrentScreen('dashboard');
        await loadData();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const response = await signupUser(name, email, password);
      
      if (response.success) {
        saveAuthData(response.token, response.user);
        setUser(response.user);
        setAuthenticated(true);
        setCurrentScreen('dashboard');
        await loadData();
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    clearAuthData();
    setUser(null);
    setAuthenticated(false);
    setTasks([]);
    setTeams([]);
    setCurrentScreen('login');
  };

  const loadData = async () => {
    try {
      const [tasksData, teamsData] = await Promise.all([fetchTasks(), fetchTeams()]);
      setTasks(tasksData);
      setTeams(teamsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks([...tasks, newTask]);
    setCurrentScreen('tasks');
  };

  const handleUpdateTask = async (id, taskData) => {
    const updatedTask = await updateTask(id, taskData);
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    setCurrentScreen('tasks');
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleCreateTeam = async (teamData) => {
    const newTeam = await createTeam(teamData);
    setTeams([...teams, newTeam]);
    setCurrentScreen('teams');
  };

  const handleDeleteTeam = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      await deleteTeam(id);
      setTeams(teams.filter((t) => t.id !== id));
    }
  };

  const renderScreen = () => {
    // Auth screens
    if (currentScreen === 'login') {
      return <Login
  onLogin={handleLogin}
  setCurrentScreen={setCurrentScreen}
  setAuthenticated={setAuthenticated}
/>;
    }

    if (currentScreen === 'signup') {
      return <Signup onSignup={handleSignup} setCurrentScreen={setCurrentScreen} />;
    }

    // Protected screens
    if (!authenticated) {
      return <Login onLogin={handleLogin} setCurrentScreen={setCurrentScreen} />;
    }

    if (currentScreen === 'dashboard') {
      return <Dashboard tasks={tasks} setCurrentScreen={setCurrentScreen} />;
    }

    if (currentScreen === 'tasks') {
      return (
        <TaskList
          tasks={tasks}
          setCurrentScreen={setCurrentScreen}
          onDeleteTask={handleDeleteTask}
        />
      );
    }

    if (currentScreen === 'createTask') {
      return (
        <CreateTask
          teams={teams}
          onCreateTask={handleCreateTask}
          setCurrentScreen={setCurrentScreen}
        />
      );
    }

    if (currentScreen.startsWith('editTask-')) {
      const taskId = parseInt(currentScreen.split('-')[1]);
      const task = tasks.find((t) => t.id === taskId);
      return (
        <EditTask
          task={task}
          teams={teams}
          onUpdateTask={handleUpdateTask}
          setCurrentScreen={setCurrentScreen}
        />
      );
    }

    if (currentScreen === 'teams') {
      return (
        <Teams teams={teams} setCurrentScreen={setCurrentScreen} onDeleteTeam={handleDeleteTeam} />
      );
    }

    if (currentScreen === 'createTeam') {
      return (
        <CreateTeam onCreateTeam={handleCreateTeam} setCurrentScreen={setCurrentScreen} />
      );
    }

    return <Dashboard tasks={tasks} setCurrentScreen={setCurrentScreen} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
     <AuthProvider>
    <div className="App">
      {authenticated && (
        <Navbar
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          user={user}
          onLogout={handleLogout}
        />
      )}
      {renderScreen()}
    </div>
    </AuthProvider>
  );
}

export default App;