import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import logo from '../assets/logo/SNSU_Logo-Bg.png';
import { Divider } from '@mui/material';

const Navbar = () => {
	return (
		<nav>
			<div className='left-nav'>
				<div className='logo'>
					<img src={logo} alt='Logo' width={55} height={55} />
				</div>
				<NavLink className='nav-link' to='/ammonia'>
					<span style={{ fontSize: 20 }}>Ammonia</span>
				</NavLink>
				<NavLink className='nav-link' to='/temperature'>
					<span style={{ fontSize: 20 }}>Temperature</span>
				</NavLink>
				<NavLink className='nav-link' to='/humidity'>
					<span style={{ fontSize: 20 }}>Humidity</span>
				</NavLink>
				<Divider
					orientation='vertical'
					variant='middle'
					flexItem
					className='divider'
					sx={{ borderColor: 'white', marginLeft: '10px' }}
				/>
				<NavLink className='nav-link' to='/all-reading'>
					<span style={{ fontWeight: 500, fontSize: 20 }}>All</span>
				</NavLink>
			</div>
			<ul>
				<UserMenu />
			</ul>
		</nav>
	);
};

export default Navbar;
