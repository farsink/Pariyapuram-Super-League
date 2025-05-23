import React, { useEffect, useState } from "react";
import { Menu, Search, User, X, ChevronDown } from "lucide-react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import "../App.css";
import { useUserContext } from "../context/UserContext";
import { useModal } from "../context/ModalContext";

const TestNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { user } = useUserContext(); // Get user data from the context
  const navigate = useNavigate();
  const { openModal } = useModal();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, [user]);

  return (
    <StyledWrapper className='font-oswald sticky top-0 z-40'>
      <nav
        className={`bg-black text-white ${
          isMenuOpen ? "mobile-menu-open" : ""
        } border-b-4 border-accent`}
      >
        <div className='max-w-7xl mx-auto px-4'>
          {/* Main Navigation Bar */}
          <div className='flex items-center h-16 relative'>
            {/* Left Section with Menu and Primary Links */}
            <div className='flex items-center '>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='p-2 nav-icon lg:hidden'
                aria-label='Menu'
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className='hidden lg:flex lg:items-center lg:space-x-8 ml-8 z-100'>
                <Link to={"/tickets"} className='nav-link'>
                  TICKETS
                </Link>
                <Link to={"/gallery"} className='nav-link'>
                  GALLERY
                </Link>
                <Link to={"/videos"} className='nav-link'>
                  VIDEOS
                </Link>
                <Link to={"/news"} className='nav-link'>
                  NEWS
                </Link>
              </div>
            </div>

            {/* Centered Logo */}
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <Link to='/'>
                <img
                  src='/assets/LogoText.png'
                  alt='PSL_logo'
                  className='h-10 w-auto'
                />
              </Link>{" "}
            </div>

            {/* Right Section */}
            <div className='flex items-center ml-auto'>
              {/* Only show Adidas logo and Help icon on larger screens */}
              <div className='hidden md:block'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg'
                  alt='Adidas'
                  className='h-6 w-auto'
                />
                <div className='nav-divider mb-4'></div>
              </div>
              <div className='flex space-x-4'>
                <button aria-label='Search' className='p-2 nav-icon'>
                  <Search size={20} />
                </button>
                <button
                  onClick={() => {
                    user ? openModal() : navigate("/login");
                  }}
                  aria-label='Account'
                  className='p-2 nav-icon'
                >
                  <User size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className='mobile-menu ' onClick={() => setIsMenuOpen(false)}>
              <div className='px-4 py-3 space-y-2'>
                <Link
                  to='/news'
                  className='nav-link flex items-center justify-between'
                >
                  NEWS <ChevronDown size={16} />
                </Link>
                <Link
                  to='/gallery'
                  className='nav-link flex items-center justify-between'
                >
                  GALLERY <ChevronDown size={16} />
                </Link>
                <Link
                  to='/videos'
                  className='nav-link flex items-center justify-between'
                >
                  VIDEOS <ChevronDown size={16} />
                </Link>
                <Link
                  to='/history'
                  className='nav-link flex items-center justify-between'
                >
                  HISTORY <ChevronDown size={16} />
                </Link>
                <Link
                  to='/tickets'
                  className='nav-link flex items-center justify-between'
                >
                  TICKETS <ChevronDown size={16} />
                </Link>
                <a href='#' className='nav-link'>
                  PARTNERS
                </a>
                <a href='#' className='nav-link'>
                  SEARCH
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  .font-oswald {
    font-family: "Oswald", sans-serif;
  }

  .nav-link {
    text-transform: uppercase;
    font-family: "Oswald", sans-serif;
    letter-spacing: 0.05em; /* tracking-wider */
    font-size: 0.875rem; /* text-sm */
    font-weight: 500; /* font-medium */
    transition-property: color;
    transition-duration: 200ms;
    padding-top: 0.5rem; /* py-2 */
    padding-bottom: 0.5rem; /* py-2 */
  }

  .nav-link:hover {
    color: var(--accent-color); /* hover:text-rose-300 */
  }

  .nav-icon {
    transition-property: color;
    transition-duration: 200ms;
  }

  .nav-icon:hover {
    color: var(--accent-color); /* hover:text-rose-300 */
  }

  .nav-divider {
    height: 3rem; /* h-8 */
    width: 1px; /* w-px */
    background-color: #374151; /* bg-gray-700 */
    margin-left: 1rem; /* mx-4 */
    margin-right: 1rem; /* mx-4 */
  }

  .mobile-menu-open {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.9) 25%,
      rgba(0, 0, 0, 0.8) 50%,
      rgba(0, 0, 0, 0.7) 75%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }

  .mobile-menu {
    position: fixed;
    left: 0;
    right: 0;
    top: 4rem; /* top-16 */
    bottom: 0;
    z-index: 50;
    overflow-y: auto;
    background-color: black; /* Add this line */
  }
  .border {
    border: 1px solid var(--accent-color);
    background-color: var(--accent-color);
    margin: 0;
    padding: 0;
  }
`;

export default TestNavbar;
