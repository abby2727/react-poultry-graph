import { useContext, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { Paper, Typography } from '@mui/material';
import { AuthContext } from '../App'; // import AuthContext
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
	const [logoutAnchor, setLogoutAnchor] = useState(null);
	const [navMenuAnchor, setNavMenuAnchor] = useState(null);
	const [notificationAnchor, setNotificationAnchor] = useState(null);

	const logoutOpen = Boolean(logoutAnchor);
	const navMenuOpen = Boolean(navMenuAnchor);
	const notificationOpen = Boolean(notificationAnchor);
	const id = open ? 'simple-popover' : undefined;

	const { setIsLoggedIn } = useContext(AuthContext); // use AuthContext
	const navigate = useNavigate();

	const handleClick = (event, name) => {
		if (name === 'logout') setLogoutAnchor(event.currentTarget);
		if (name === 'navMenu') setNavMenuAnchor(event.currentTarget);
		if (name === 'notification') setNotificationAnchor(event.currentTarget);
	};

	const handleClose = (name) => {
		if (name === 'logout') setLogoutAnchor(null);
		if (name === 'navMenu') setNavMenuAnchor(null);
		if (name === 'notification') setNotificationAnchor(null);
	};

	const handleLogout = () => {
		setLogoutAnchor(null);
		setIsLoggedIn(false); // Logout the user
		navigate('/'); // Redirect to login page
	};

	return (
		<>
			<button
				id='navMenu-button'
				aria-controls={navMenuOpen ? 'navMenu-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={navMenuOpen ? 'true' : undefined}
				onClick={(event) => handleClick(event, 'navMenu')}
				className='nav-menu-button'
			>
				<MenuIcon className='icon' />
			</button>
			{/* <button
				aria-describedby={id}
				variant='contained'
				onClick={(event) => handleClick(event, 'notification')}
			>
				<NotificationsIcon className='icon' />
			</button> */}
			<button
				id='logout-button'
				aria-controls={logoutOpen ? 'logout-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={logoutOpen ? 'true' : undefined}
				onClick={(event) => handleClick(event, 'logout')}
			>
				<AccountCircleIcon className='icon' />
			</button>

			<Menu
				id='logout-menu'
				anchorEl={logoutAnchor}
				open={logoutOpen}
				onClose={() => handleClose('logout')}
				MenuListProps={{
					'aria-labelledby': 'logout-button'
				}}
			>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>

			{/* Nav Menu */}
			<Menu
				id='navMenu-menu'
				anchorEl={navMenuAnchor}
				open={navMenuOpen}
				onClose={() => handleClose('navMenu')}
				MenuListProps={{
					'aria-labelledby': 'navMenu-button'
				}}
			>
				<MenuItem onClick={() => navigate('/ammonia')}>
					Ammonia
				</MenuItem>
				<MenuItem onClick={() => navigate('/temperature')}>
					Temperature
				</MenuItem>
				<MenuItem onClick={() => navigate('/humidity')}>
					Humidity
				</MenuItem>
			</Menu>

			<Popover
				id={id}
				open={notificationOpen}
				anchorEl={notificationAnchor}
				onClose={() => handleClose('notification')}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
			>
				<Paper sx={{ p: 2 }}>
					<Typography>New Notification 1</Typography>
					<Typography>New Notification 2</Typography>
					<Typography>New Notification 3</Typography>
				</Paper>
			</Popover>
		</>
	);
};

export default UserMenu;
