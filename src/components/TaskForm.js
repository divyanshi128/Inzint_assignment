import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Stack,
} from '@mui/material';
import { Save } from 'lucide-react';

const TaskForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    due_date: initialData.due_date || '',
    priority: initialData.priority || '',
    status: initialData.status || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => onSubmit(e, formData)}
      noValidate
      sx={{ maxWidth: 600, mx: 'auto', p: 3, borderRadius: 2, boxShadow: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Task Details
      </Typography>

      <Stack spacing={2}>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          name="due_date"
          label="Due Date"
          type="date"
          value={formData.due_date}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Description
        </Typography>
        <TextField
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={5}
          placeholder="Add task details..."
          fullWidth
        />
      </Box>

      <Box mt={4}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<Save size={18} />}
          fullWidth
          sx={{ py: 1.5 }}
        >
          Save Task
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
