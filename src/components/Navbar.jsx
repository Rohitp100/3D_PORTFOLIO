import { NavLink } from "react-router-dom";

import rlogo4 from "/rlogo4.png";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={rlogo4} alt='logo' className='w-14 h-18 object-contain' />
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-rose-700" }>
          About
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600" : "text-rose-700"}>
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;