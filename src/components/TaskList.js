import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Stack,
  Chip,
} from '@mui/material';

// Helper function to get chip color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Completed':
      return 'success';
    default:
      return 'default';
  }
};

// Helper function to capitalize and prettify labels
const formatLabel = (text) => text.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

const TaskList = ({ tasks, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No tasks available.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} key={task.id}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h6">{task.title}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Chip
                    label={formatLabel(task.status)}
                    color={getStatusColor(task.status)}
                    size="small"
                  />
                  <Chip
                    label={`Priority: ${formatLabel(task.priority)}`}
                    variant="outlined"
                    size="small"
                  />
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  Due: {task.due_date}
                </Typography>

                <Stack direction="row" spacing={1} mt={1}>
                  <Button
                    component={Link}
                    to={`/edit/${task.id}`}
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(task.id)}
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{ textTransform: 'none' }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
