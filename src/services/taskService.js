import { apiCall } from './api';

// Demo data for testing without backend
const DEMO_TASKS = [
  {
    id: 1,
    title: 'Complete Project Documentation',
    description: 'Write detailed documentation for the new feature',
    assignedTo: 'john@example.com',
    status: 'In Progress',
    dueDate: '2025-10-30',
    teamId: 1
  },
  {
    id: 2,
    title: 'Review Code Changes',
    description: 'Review pull requests from team members',
    assignedTo: 'sarah@example.com',
    status: 'Pending',
    dueDate: '2025-10-28',
    teamId: 1
  },
  {
    id: 3,
    title: 'Bug Fixes',
    description: 'Fix critical bugs in production',
    assignedTo: 'mike@example.com',
    status: 'Completed',
    dueDate: '2025-10-25',
    teamId: 2
  }
];

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    return await apiCall('/tasks');
  } catch (error) {
    console.log('Using demo data');
    return DEMO_TASKS;
  }
};

// Create new task
export const createTask = async (taskData) => {
  try {
    return await apiCall('/tasks', 'POST', taskData);
  } catch (error) {
    console.log('Demo mode: Task created locally');
    return { ...taskData, id: Date.now() };
  }
};

// Update task
export const updateTask = async (id, taskData) => {
  try {
    return await apiCall(`/tasks/${id}`, 'PUT', taskData);
  } catch (error) {
    console.log('Demo mode: Task updated locally');
    return { ...taskData, id };
  }
};

// Delete task
export const deleteTask = async (id) => {
  try {
    return await apiCall(`/tasks/${id}`, 'DELETE');
  } catch (error) {
    console.log('Demo mode: Task deleted locally');
    return { success: true };
  }
};