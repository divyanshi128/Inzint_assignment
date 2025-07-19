import React from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { PlusCircle } from 'lucide-react';

const AddTask = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    try {
      await axios.post('tasks/', formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PlusCircle size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5" fontWeight="bold">
            Add New Task
          </Typography>
        </Box>
        <TaskForm onSubmit={handleSubmit} />
      </Paper>
    </Box>
  );
};

export default AddTask;
