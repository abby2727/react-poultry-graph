import React, { useState, createContext, useContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import TemperatureGraph from './pages/TemperatureGraph';
import HumidityGraph from './pages/HumidityGraph';
import LoginPage from './pages/LoginPage';
import AllReading from './pages/AllReading';

const queryClient = new QueryClient();

export const AuthContext = createContext();

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		const saved = localStorage.getItem('isLoggedIn');
		const savedTime = localStorage.getItem('savedTime');
		const now = new Date();
		if (savedTime && now.getTime() - savedTime > 6 * 60 * 60 * 1000) {
			// If more than 6 hours has passed, ignore the saved value
			return false;
		} else {
			const initialValue = JSON.parse(saved);
			return initialValue || false;
		}
	});

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (isLoggedIn && location.pathname === '/') {
			navigate('/ammonia');
		}
	}, [isLoggedIn, location, navigate]);

	useEffect(() => {
		localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
		localStorage.setItem('savedTime', new Date().getTime());
	}, [isLoggedIn]);

	const routing = useRoutes([
		{ path: '/ammonia', element: isLoggedIn ? <Home /> : <LoginPage /> },
		{
			path: '/temperature',
			element: isLoggedIn ? <TemperatureGraph /> : <LoginPage />
		},
		{
			path: '/humidity',
			element: isLoggedIn ? <HumidityGraph /> : <LoginPage />
		},
		{
			path: '/all-reading',
			element: isLoggedIn ? <AllReading /> : <LoginPage />
		},
		{ path: '/', element: <LoginPage /> }
	]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			<QueryClientProvider client={queryClient}>
				{isLoggedIn && <Navbar />}
				<div className='container'>{routing}</div>
			</QueryClientProvider>
		</AuthContext.Provider>
	);
};

export default App;
