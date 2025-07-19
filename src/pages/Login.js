import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, Tabs, Tab, InputAdornment, Divider, IconButton
} from '@mui/material';
import { Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

const AuthForm = () => {
  const [tab, setTab] = useState(0); // 0 = Sign In, 1 = Signup
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login/', loginData);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register/', registerData);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <Box display="flex" height="100vh" width="100vw" sx={{ backgroundColor: '#e8eaef' }}>
      {/* Left Panel */}
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={3} sx={{ p: 6, width: '100%', maxWidth: 400, borderRadius: 4 }}>
          {/* <Box textAlign="center" mb={3}>
            <img src="/logo.svg" alt="SmartSave" width={100} />
          </Box> */}

          <Typography variant="h5" fontWeight={600} textAlign="center">
            {tab === 0 ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <Typography variant="body2" color="textSecondary" textAlign="center" mb={2}>
            {tab === 0 ? 'Please enter your details' : 'Please fill in your details'}
          </Typography>

          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered sx={{ mb: 2 }}>
            <Tab label="Sign In" />
            <Tab label="Signup" />
          </Tabs>

          {tab === 0 ? (
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                placeholder="Email Address"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
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
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                placeholder="Username"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
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
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
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
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
          )}

          
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
          src="https://images.unsplash.com/photo-1605008423974-ad30a5d22125?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Vault"
          style={{ width: '100%', height:"100%" }}
        />
      </Box>
    </Box>
  );
};

export default AuthForm;
