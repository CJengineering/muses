import * as React from 'react';
import { useContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';


const defaultTheme = createTheme();
export default function SignIn() {
  const { setAuthenticated, authenticated } = useContext(AuthContext);
  const [loading, setLoading] = React.useState<boolean>(false)
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      // Make a POST request to the sign-in URL with form values

      const response = await fetch(
        'https://new-alerts-e4f6j5kdsq-ew.a.run.app/users/tokens/sign_in',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        // Sign-in successful
        const data = await response.json();
        const { token, refresh_token } = data;
        setLoading(true)
        console.log(token);
        // Store the access token and refresh token in localStorage or secure storage
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
        await setAuthenticated(true);
        setLoading(false)
        console.log(authenticated);
        navigate('/')
        // Redirect to dashboard or perform other actions
        console.log('Sign-in successful');
      } else {
        // Sign-in failed
        // Handle error or display error message
        console.error('Sign-in failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      { loading ?  (
        <Paper
          sx={{
            width: '80%',
            backgroundColor: 'gray',
            overflow: 'hidden',
            marginLeft: '10%',
          }}
        >
          <div className="container_loading">
            <div className="loading_text">
              <p>
               KNOCK .... KNOCKKK .. 
              </p>
            </div>
            <div className="loading_indicator">
              <CircularProgress />
            </div>
          </div>
        </Paper>
    ): <div></div>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

function useState<T>(arg0: { email: string; password: string }): [any, any] {
  throw new Error('Function not implemented.');
}
function setSignInFromr(arg0: FormDataEntryValue | null) {
  throw new Error('Function not implemented.');
}
