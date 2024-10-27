import React from 'react';
import Container from '../Container/Container';
import Logo from '../Logo';
import LogoutBtn from './LogoutBtn';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.status);
  const navigate = useNavigate();

  // Navigation items that will be rendered based on authentication status
  const navItems = [
    {
      name: 'Home',
      url: "/",
      active: true
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",
      url: "/profile",
      active: authStatus,
    }
  ];

  return (
    <section className='py-4 shadow bg-color5'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='200px' />
            </Link>
          </div>
          <ul className='flex space-x-4'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.url)}
                    className='inline-block px-4 py-2 text-color5 bg-color2 hover:bg-color1 rounded-full transition duration-200'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </section>
  );
}

export default Header;
