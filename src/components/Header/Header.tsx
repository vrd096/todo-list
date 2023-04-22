import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Search } from '../Search';
import { Settings } from '../Settings';
import { Login } from '../Login';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link to="/today">
        <div className={styles.headerLogo}>
          <svg
            height="32"
            id="svg2"
            version="1.1"
            viewBox="0 0 281.25 281.25"
            width="32"
            fill="#fff">
            <defs id="defs4" />
            <g id="layer1" transform="translate(7276.1064,-5205.6831)">
              <path
                d="m -7135.4814,5244.5213 c -56.159,-1e-4 -101.7865,45.6273 -101.7865,101.7865 0,56.159 45.6275,101.7866 101.7865,101.7865 56.159,0 101.7865,-45.6275 101.7865,-101.7865 0,-56.1591 -45.6275,-101.7865 -101.7865,-101.7865 z m 0,9.375 c 51.0924,0 92.4115,41.319 92.4115,92.4115 0,51.0924 -41.3191,92.4115 -92.4115,92.4115 -51.0924,1e-4 -92.4115,-41.3191 -92.4115,-92.4115 0,-51.0925 41.3191,-92.4116 92.4115,-92.4115 z m -42.3798,35.6854 c -9.2018,1e-4 -16.7614,7.5598 -16.7614,16.7615 -1e-4,9.2018 7.5595,16.7613 16.7614,16.7614 9.2018,0 16.7634,-7.5596 16.7633,-16.7614 0,-9.2018 -7.5615,-16.7615 -16.7633,-16.7615 z m 0,9.375 c 4.1352,0 7.3883,3.2513 7.3883,7.3865 1e-4,4.1353 -3.2531,7.3864 -7.3883,7.3864 -4.1352,-10e-5 -7.3865,-3.2511 -7.3864,-7.3864 0,-4.1351 3.2512,-7.3864 7.3864,-7.3865 z m 32.4353,2.699 a 4.6875,4.6875 0 0 0 -4.6875,4.6875 4.6875,4.6875 0 0 0 4.6875,4.6875 h 64.3982 a 4.6875,4.6875 0 0 0 4.6875,-4.6875 4.6875,4.6875 0 0 0 -4.6875,-4.6875 z m -32.4353,27.8906 c -9.2019,0 -16.7615,7.5597 -16.7614,16.7615 -1e-4,9.2017 7.5595,16.7633 16.7614,16.7633 9.2018,0 16.7634,-7.5615 16.7633,-16.7633 1e-4,-9.2019 -7.5615,-16.7615 -16.7633,-16.7615 z m 0,9.375 c 4.1352,0 7.3884,3.2512 7.3883,7.3865 1e-4,4.1352 -3.2531,7.3883 -7.3883,7.3883 -4.1352,0 -7.3865,-3.2531 -7.3864,-7.3883 -1e-4,-4.1352 3.2512,-7.3865 7.3864,-7.3865 z m 32.4353,2.699 a 4.6875,4.6875 0 0 0 -4.6875,4.6875 4.6875,4.6875 0 0 0 4.6875,4.6875 h 64.3982 a 4.6875,4.6875 0 0 0 4.6875,-4.6875 4.6875,4.6875 0 0 0 -4.6875,-4.6875 z m -32.4353,27.8888 c -9.2019,0 -16.7615,7.5615 -16.7614,16.7633 -1e-4,9.2017 7.5595,16.7613 16.7614,16.7614 9.2018,0 16.7634,-7.5596 16.7633,-16.7614 1e-4,-9.2019 -7.5615,-16.7633 -16.7633,-16.7633 z m 0,9.375 c 4.1352,0 7.3884,3.253 7.3883,7.3883 1e-4,4.1352 -3.2531,7.3864 -7.3883,7.3864 -4.1352,0 -7.3865,-3.2512 -7.3864,-7.3864 -1e-4,-4.1352 3.2512,-7.3883 7.3864,-7.3883 z m 32.4353,2.7008 a 4.6875,4.6875 0 0 0 -4.6875,4.6875 4.6875,4.6875 0 0 0 4.6875,4.6875 h 64.3982 a 4.6875,4.6875 0 0 0 4.6875,-4.6875 4.6875,4.6875 0 0 0 -4.6875,-4.6875 z"
                id="circle2353"
              />
            </g>
          </svg>

          <p className={styles.title}>Todolist</p>
        </div>
      </Link>
      <Search />
      <div className="wrapper">
        <Settings />
        <Login />
      </div>
    </div>
  );
};
