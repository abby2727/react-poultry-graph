import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginFailed, setLoginFailed] = useState(false);

	const { setIsLoggedIn } = useContext(AuthContext);
	const credentials = {
		username: 'researcher1',
		password: 'Thesis!2024'
	};

	const handleLogin = (event) => {
		event.preventDefault();
		if (
			username === credentials.username &&
			password === credentials.password
		) {
			setIsLoggedIn(true);
		} else {
			setLoginFailed(true);
		}
	};

	useEffect(() => {
		navigate('/');
	}, []);

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			minHeight='100vh'
			bgcolor='#e9ecef'
		>
			<Container
				maxWidth='xs'
				sx={{
					padding: 3,
					borderRadius: 4,
					backgroundColor: '#fff'
				}}
			>
				<Typography variant='h4' align='center'>
					Sign in
				</Typography>
				{loginFailed && (
					<Typography
						variant='h6'
						align='center'
						style={{ color: 'red' }}
						sx={{ fontSize: '1rem' }}
					>
						Invalid username or password
					</Typography>
				)}
				<form onSubmit={handleLogin}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='username'
						label='Username'
						name='username'
						autoComplete='username'
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						error={loginFailed}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={loginFailed}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						style={{ marginTop: '1rem' }}
					>
						Login
					</Button>
				</form>
			</Container>
		</Box>
	);
};

export default LoginPage;
