import React, { useEffect, useState } from 'react';
import axios from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import {
  Paper,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Pencil } from 'lucide-react';

const EditTask = () => {
  const [initialData, setInitialData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const res = await axios.get(`tasks/${id}/`);
      setInitialData(res.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    try {
      await axios.put(`tasks/${id}/`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (!initialData) {
    return (
      <Box sx={{ px: { xs: 2, sm: 4 }, py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Pencil size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5" fontWeight="bold">
            Edit Task
          </Typography>
        </Box>
        <TaskForm onSubmit={handleSubmit} initialData={initialData} />
      </Paper>
    </Box>
  );
};

export default EditTask;
