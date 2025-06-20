import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import {useAuthRedux} from "../../hooks/useAuthRedux.ts";

function Header() {
    const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout, loading } = useAuthRedux();


    const handleClick = () => {
        setIsHeaderMenuOpen(prev => !prev);
    };
    const closeMenu = () => {
        setIsHeaderMenuOpen(false);
    };
    const handleLogout = () => {
        logout();
        closeMenu();
        navigate('/signin');
    };

    if(loading) return null;

    return (
        <header className="header">
            <nav className="header__nav header__nav--desktop">
                <ul className="header__nav-list header__nav-list--desktop">
                    <li className="header__nav-item">
                        <NavLink to="/" className="header__nav-link">
                            <img src="./src/assets/header/logo.svg" alt="logo" className="header__logo" />
                        </NavLink>
                    </li>
                    <div className="header__nav-wrapper">
                        <li className="header__nav-item">
                            <NavLink to="/" className="header__nav-link">
                                <span className="header__nav-title">Home</span>
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
                            <NavLink to="/menu" className="header__nav-link">
                                <span className="header__nav-title">Menu</span>
                            </NavLink>
                        </li>
                    </div>
                    <li className="header__nav-item">
                        <NavLink to="/favorites" className="header__nav-link">
                            <img src="./src/assets/header/fav-icon.svg" alt="favourite" className="header__nav-icon" />
                            <span className="header__nav-title">My Favorites</span>
                        </NavLink>
                    </li>
                    <li className="header__nav-item">
                        <NavLink to="/cart" className="header__nav-link">
                            <img src="./src/assets/header/cart-icon.svg" alt="cart" className="header__nav-icon" />
                            <span className="header__nav-title">My Cart</span>
                        </NavLink>
                    </li>
                    <li className="header__nav-item">
                        {isAuthenticated ? (
                            <NavLink to="/profile" className="header__nav-link">
                                <span className="header__nav-title">Account</span>
                            </NavLink>
                        ) : (
                            <NavLink to="/registration" className="header__nav-link">
                                <span className="header__nav-title">Sign In</span>
                            </NavLink>
                        )}
                    </li>
                    {isAuthenticated && (
                        <li className="header__nav-item">
                            <button onClick={handleLogout} className="header__nav-link header__nav-logout-button">
                                <span className="header__nav-title">Logout</span>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>

            <nav className="header__nav header__nav--mobile">
                <ul className="header__nav-list header__nav-list--mobile">
                    <li className="header__nav-list-item">
                        <NavLink to="/" className="header__nav-link">
                            <img src="./src/assets/header/logo.svg" alt="logo" className="header__logo" />
                        </NavLink>
                    </li>
                    <div className="header__nav-btns">
                        <li className="header__nav-list-item">
                            <NavLink to="/cart" className="header__nav-btn header__nav-btn--cart">
                                <img src="./src/assets/header/cart-icon.svg" alt="cart" className="header__nav-img" />
                            </NavLink>
                        </li>
                        <li className="header__nav-list-item">
                            <button className="header__nav-btn header__nav-btn--menu" onClick={handleClick}>
                                <img src="./src/assets/header/menu-icon.svg" alt="menu" className="header__nav-img" />
                            </button>
                        </li>
                    </div>
                </ul>
            </nav>

            {isHeaderMenuOpen && (
                <div className="header__menu">
                    <div className="header__icons-wrapper">
                        <img src="./src/assets/header/logo.svg" alt="logo" className="header__menu-logo" />
                        <button className="header__menu-btn" onClick={closeMenu}>
                            <img src="./src/assets/header/close-btn-icon.svg" alt="close" className="header__menu-close" />
                        </button>
                    </div>
                    <ul className="header__menu-list">
                        <li className="header__menu-item">
                            <NavLink to="/" className="header__menu-link" onClick={closeMenu}>
                                Home
                            </NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink to="/menu" className="header__menu-link" onClick={closeMenu}>
                                Menu
                            </NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink to="/favorites" className="header__menu-link" onClick={closeMenu}>
                                <img src="./src/assets/header/fav-icon.svg" alt="favourite" className="header__menu-fav" />
                                My Favorites
                            </NavLink>
                        </li>
                        <li className="header__menu-item">
                            {isAuthenticated ? (
                                <NavLink to="/account" className="header__menu-link" onClick={closeMenu}>
                                    Account
                                </NavLink>
                            ) : (
                                <NavLink to="/signin" className="header__menu-link" onClick={closeMenu}>
                                    Sign In
                                </NavLink>
                            )}
                        </li>
                        {isAuthenticated && (
                            <li className="header__menu-item">
                                <button onClick={() => { handleLogout(); }} className="header__menu-link">
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                    <NavLink to="/contact" className="header__menu-btn header__menu-btn--contact" onClick={closeMenu}>
                        Contact us
                    </NavLink>
                </div>
            )}
        </header>
    );
}

export default Header;
