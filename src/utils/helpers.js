import { STATUS_COLORS } from './constants';

// Get status color class
export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
};

// Format date for display
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Filter tasks by search query
export const filterTasksBySearch = (tasks, query) => {
  if (!query) return tasks;
  
  return tasks.filter(task =>
    task.title.toLowerCase().includes(query.toLowerCase()) ||
    task.assignedTo.toLowerCase().includes(query.toLowerCase())
  );
};

// Filter tasks by status
export const filterTasksByStatus = (tasks, status) => {
  if (status === 'all') return tasks;
  return tasks.filter(task => task.status === status);
};

// Sort tasks by due date
export const sortTasksByDate = (tasks) => {
  return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};