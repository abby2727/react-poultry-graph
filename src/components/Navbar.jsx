import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import logo from '../assets/logo/SNSU_Logo-Bg.png';

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
			</div>
			<ul>
				<UserMenu />
			</ul>
		</nav>
	);
};

export default Navbar;
