import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, Tabs, Tab, InputAdornment, Divider, IconButton
} from '@mui/material';
import { Mail, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

const Register = () => {
  const [tab, setTab] = useState(1); // 0 = Sign In, 1 = Signup
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register/', form);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <Box
      display="flex"
      height="100vh"
      width="100vw"
      sx={{ backgroundColor: '#e8eaef' }}
    >
      {/* Left Panel */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={3} sx={{ p: 6, width: '100%', maxWidth: 400, borderRadius: 4 }}>
          <Box textAlign="center" mb={3}>
            <img src="/logo.svg" alt="SmartSave" width={100} />
          </Box>

          <Typography variant="h5" fontWeight={600} textAlign="center">
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary" textAlign="center" mb={2}>
            Please fill in your details
          </Typography>

          <Tabs value={tab} onChange={(e, newValue) => {
            setTab(newValue);
            if (newValue === 0) navigate('/login'); // navigate to login if user clicks Sign In
          }} centered sx={{ mb: 2 }}>
            <Tab label="Sign In" />
            <Tab label="Signup" />
          </Tabs>

          <form onSubmit={register}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={18} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="password"
              margin="normal"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2, bgcolor: '#0066ff', borderRadius: '10px', textTransform: 'none' }}
            >
              Create Account
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>Or Continue With</Divider>

          <Box display="flex" justifyContent="center" gap={2}>
            <IconButton><GoogleIcon /></IconButton>
            <IconButton><AppleIcon /></IconButton>
            <IconButton><FacebookIcon /></IconButton>
          </Box>

          <Typography variant="caption" display="block" mt={3} textAlign="center" color="textSecondary">
            Join the millions of smart investors who trust us to manage their finances.
            Sign up to access your personalized dashboard, track your portfolio performance,
            and make informed investment decisions.
          </Typography>
        </Paper>
      </Box>

      {/* Right Panel with Image */}
      <Box
        flex={1}
        sx={{
          background: 'linear-gradient(180deg, #e0f0ff 0%, #cce4f6 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          src="/vault.png" // Save vault image from original design as /public/vault.png
          alt="Vault"
          style={{ width: '60%', maxWidth: 400 }}
        />
      </Box>
    </Box>
  );
};

export default Register;
