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
					Ammonia
				</NavLink>
				<NavLink className='nav-link' to='/temperature'>
					Temperature
				</NavLink>
				<NavLink className='nav-link' to='/humidity'>
					Humidity
				</NavLink>
			</div>
			<ul>
				<UserMenu />
			</ul>
		</nav>
	);
};

export default Navbar;
