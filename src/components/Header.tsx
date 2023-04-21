import React from 'react';
import LogoSvg from '../assets/img/pizza-logo.svg';
import { Link } from 'react-router-dom';
import { Search } from './Search';

export const Header = () => {
  return (
    <div>
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={LogoSvg} alt="Todo logo" />
            <div>
              <h1>Todolist</h1>
            </div>
          </div>
        </Link>
        <Search />
      </div>
    </div>
  );
};
