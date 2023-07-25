import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Search } from '../Search';
import { Settings } from '../Settings';
import { LoginForm } from '../Login';
import { Tooltip } from '@chakra-ui/react';

export const Header: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <Link to="/today">
        <div className={styles.headerLogo}>
          <svg id="sw-js-blob-svg" viewBox="0 0 100 100" width="30" height="30">
            {' '}
            <defs>
              {' '}
              <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                {' '}
                <stop id="stop1" stopColor="rgba(55, 120.514, 248, 1)" offset="0%"></stop>{' '}
                <stop id="stop2" stopColor="rgba(31, 224.917, 251, 1)" offset="100%"></stop>{' '}
              </linearGradient>{' '}
            </defs>{' '}
            <path
              fill="none"
              d="M15.2,-22C20,-17.5,24.2,-13.4,29.1,-7.3C34.1,-1.2,39.8,6.8,36,9.6C32.2,12.5,19,10.2,11.4,10.2C3.8,10.2,1.9,12.4,-3.1,16.7C-8.1,20.9,-16.3,27.3,-19.1,25.8C-21.8,24.2,-19.2,14.8,-19.1,7.9C-19,1,-21.5,-3.4,-19.8,-5.8C-18.1,-8.2,-12.3,-8.5,-8.3,-13.3C-4.3,-18,-2.2,-27.2,1.5,-29.3C5.2,-31.4,10.5,-26.5,15.2,-22Z"
              transform="translate(50 50)"
              strokeWidth="3"
              stroke="url(#sw-gradient)"></path>{' '}
          </svg>

          <p className={styles.title}>TimeKeeper</p>
        </div>
      </Link>
      {/* <Search /> */}
      <div className={styles.toolbarWrapper}>
        {/* <Settings /> */}
        <LoginForm />
      </div>
    </div>
  );
};
