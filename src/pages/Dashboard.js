import React, { useEffect, useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Divider,
  Container,
  Fade,
} from '@mui/material';
import { PlusCircle, Filter } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get('tasks/');
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`tasks/${id}/`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleStatusChange = (_, newFilter) => {
    if (newFilter !== null) setStatusFilter(newFilter);
  };

  const handlePriorityChange = (_, newFilter) => {
    if (newFilter !== null) setPriorityFilter(newFilter);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'all' || task.status.toLowerCase() === statusFilter;
    const matchesPriority =
      priorityFilter === 'all' || task.priority.toLowerCase() === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={4}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box>
          <Typography 
            variant="h4" 
            fontWeight="700" 
            color="primary"
            sx={{ mb: 0.5 }}
          >
            My Tasks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and organize your tasks efficiently
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<PlusCircle size={20} />}
          onClick={() => navigate('/add')}
          sx={{ 
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            py: 1.5,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Add New Task
        </Button>
      </Box>

      {/* Compact Filters Bar */}
      <Paper 
        elevation={0} 
        sx={{ 
          px: 3, 
          py: 2, 
          mb: 3, 
          borderRadius: 2,
          backgroundColor: 'grey.50',
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box 
          display="flex" 
          alignItems="center" 
          gap={3}
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' },
          }}
        >
          {/* Filter Label */}
          <Box display="flex" alignItems="center" flexShrink={0}>
            <Filter size={18} style={{ marginRight: 6 }} color="#666" />
            <Typography variant="subtitle2" fontWeight="600" color="text.primary">
              Filters:
            </Typography>
          </Box>

          {/* Status Filter - Compact */}
          <Box sx={{ minWidth: { xs: '100%', md: 'auto' } }}>
            <ToggleButtonGroup
              value={statusFilter}
              exclusive
              onChange={handleStatusChange}
              size="small"
              aria-label="status filter"
              color="primary"
              sx={{ 
                '& .MuiToggleButton-root': {
                  px: 2,
                  py: 0.5,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  fontWeight: 500,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    borderColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }
              }}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="pending">Pending</ToggleButton>
              {/* <ToggleButton value="in_progress">Progress</ToggleButton> */}
              <ToggleButton value="completed">Done</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Divider */}
          <Divider 
            orientation="vertical" 
            flexItem 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              borderColor: 'grey.300',
              height: '30px',
              alignSelf: 'center'
            }} 
          />

          {/* Priority Filter - Compact */}
          <Box sx={{ minWidth: { xs: '100%', md: 'auto' } }}>
            <ToggleButtonGroup
              value={priorityFilter}
              exclusive
              onChange={handlePriorityChange}
              size="small"
              aria-label="priority filter"
              color="secondary"
              sx={{ 
                '& .MuiToggleButton-root': {
                  px: 2,
                  py: 0.5,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  fontWeight: 500,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  '&.Mui-selected': {
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                    borderColor: 'secondary.main',
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }
              }}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="high">High</ToggleButton>
              <ToggleButton value="medium">Med</ToggleButton>
              <ToggleButton value="low">Low</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Quick Clear Filters */}
          {(statusFilter !== 'all' || priorityFilter !== 'all') && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
              sx={{
                ml: 'auto',
                textTransform: 'none',
                fontSize: '0.75rem',
                px: 2,
                py: 0.5,
                minWidth: 'auto',
                borderColor: 'grey.400',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'grey.600',
                  backgroundColor: 'grey.100',
                }
              }}
            >
              Clear
            </Button>
          )}
        </Box>
      </Paper>

      {/* Content Section */}
      <Box sx={{ minHeight: '400px' }}>
        {loading ? (
          <Box 
            display="flex" 
            flexDirection="column"
            alignItems="center" 
            justifyContent="center"
            py={8}
          >
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Loading your tasks...
            </Typography>
          </Box>
        ) : filteredTasks.length === 0 ? (
          <Fade in={true}>
            <Paper
              elevation={0}
              sx={{
                textAlign: 'center',
                py: 8,
                backgroundColor: 'grey.50',
                borderRadius: 3,
                border: '2px dashed',
                borderColor: 'grey.300',
              }}
            >
              <Typography variant="h6" color="text.primary" fontWeight="600" mb={1}>
                No tasks found
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                {statusFilter !== 'all' || priorityFilter !== 'all' 
                  ? 'No tasks match the selected filters. Try adjusting your filter settings.'
                  : 'You don\'t have any tasks yet. Create your first task to get started!'
                }
              </Typography>
              {(statusFilter !== 'all' || priorityFilter !== 'all') && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setStatusFilter('all');
                    setPriorityFilter('all');
                  }}
                  sx={{ mr: 2 }}
                >
                  Clear Filters
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={<PlusCircle size={18} />}
                onClick={() => navigate('/add')}
                sx={{ textTransform: 'none' }}
              >
                Add Your First Task
              </Button>
            </Paper>
          </Fade>
        ) : (
          <Fade in={true}>
            <Box>
              <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </Typography>
              </Box>
              <Stack spacing={2}>
                <TaskList tasks={filteredTasks} onDelete={deleteTask} />
              </Stack>
            </Box>
          </Fade>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;