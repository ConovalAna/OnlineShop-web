import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
function Header({ onOpenCart, email }: any) {
    //const { itemsPrice } = useCheckout();

    const logout = () => {
        //setIsAuth(false);
        localStorage.removeItem('token');
    };

    return (
        <header className="header">
            <div className="header__content">
                <NavLink to="/">
                    <div className="header__logo">
                        <img
                            className="logo"
                            src="/asset/resource/logo.png"
                            alt="Sneakers"
                        />
                        <div className="header__logo-text">
                            <h1 className="header__title">React Sneakers</h1>
                            <p className="header__subtitle">
                                Store with best sneakers
                            </p>
                        </div>
                    </div>
                </NavLink>
                <ul className="header__account">
                    <li onClick={onOpenCart} className="header__cart">
                        <img
                            className="header__cart-image"
                            src="/asset/sneakers/cart.svg"
                            alt="Cart"
                        />
                        <span className="header__price">
                            {/* {itemsPrice}  */}0 RON.
                        </span>
                    </li>
                    <NavLink
                        to="/orders"
                        //activeClassName="header__link_active"
                    >
                        <li>
                            <img
                                className="header__icon"
                                src="/asset/sneakers/profile.svg"
                                alt="Profile"
                            />
                        </li>
                    </NavLink>
                    <NavLink
                        to="/sneakers/favorite"
                        //activeClassName="header__link_active"
                    >
                        <li>
                            <img
                                className="header__icon"
                                src="/asset/sneakers/favorite.svg"
                                alt="Heart"
                            />
                        </li>
                    </NavLink>
                    <li>
                        <img
                            onClick={logout}
                            className="header__icon"
                            src="/asset/sneakers/exit.svg"
                            alt="Exit"
                        />
                    </li>
                </ul>
            </div>
            <p className="header__email">{email}</p>
        </header>
    );
}

export default Header;
