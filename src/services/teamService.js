import { apiCall } from './api';

// Demo data for testing
const DEMO_TEAMS = [
  { id: 1, name: 'Development Team', members: 5 },
  { id: 2, name: 'Design Team', members: 3 },
  { id: 3, name: 'Marketing Team', members: 4 }
];

// Fetch all teams
export const fetchTeams = async () => {
  try {
    return await apiCall('/teams');
  } catch (error) {
    console.log('Using demo data');
    return DEMO_TEAMS;
  }
};

// Create new team
export const createTeam = async (teamData) => {
  try {
    return await apiCall('/teams', 'POST', teamData);
  } catch (error) {
    console.log('Demo mode: Team created locally');
    return { ...teamData, id: Date.now() };
  }
};

// Delete team
export const deleteTeam = async (id) => {
  try {
    return await apiCall(`/teams/${id}`, 'DELETE');
  } catch (error) {
    console.log('Demo mode: Team deleted locally');
    return { success: true };
  }
};