import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, Switch, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2', 
    },
    background: {
      paper: '#424242', 
      default: '#303030', 
    },
    text: {
      primary: '#ffffff', 
    },
  },
});

export default function LoginForm({ setLoggedIn, setEmail }) {
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `/api/auth/${isRegister ? 'register' : 'login'}`;
      const res = await axios.post(url, { email, password });
      setMessage(res.data.message);
      setLoggedIn(true);
      setEmail(email);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5">{isRegister ? 'Register' : 'Login'}</Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '16px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>
            <FormControlLabel
              control={
                <Switch
                  checked={isRegister}
                  onChange={() => setIsRegister(!isRegister)}
                />
              }
              label={isRegister ? 'Already have an account? Login' : 'Don’t have an account? Register'}
              sx={{ mt: 2, textAlign: 'center' }}
            />
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
              {message}
            </Typography>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
