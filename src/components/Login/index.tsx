import { useState, useEffect, useRef } from 'react';
import 'firebase/auth';
import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import styles from './Login.module.scss';

export const LoginForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    photoURL: '',
    email: '',
    displayName: '',
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
        setUserData({
          photoURL: String(user.photoURL),
          email: String(user.email),
          displayName: String(user.displayName),
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as HTMLElement)) {
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);

        setShowForm(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const signOut = () => {
    auth.signOut();
    setShowForm(false);
  };

  return (
    <div>
      {user ? (
        <button
          className={styles.buttonExitAccount}
          onClick={() => {
            setShowForm(true);
          }}>
          <img src={userData.photoURL} />
        </button>
      ) : (
        <div className={styles.openLoginWrapper}>
          <button className={styles.openLoginButton} onClick={() => setShowForm(true)}>
            <svg x="0" y="0" width="20px" height="20px" viewBox="0 0 683.721 683.721" fill="#fff">
              <g>
                <g>
                  <path
                    d="M646.019,604.816V72.985c0-40.928-32.9-72.985-74.901-72.985H213.643c-42.417,0-78.251,33.42-78.251,72.981V229.35
     c0,4.777,3.877,8.655,8.654,8.655h38.946c4.777,0,8.655-3.877,8.655-8.655V72.981c0-6.82,8.568-16.726,21.996-16.726h357.469
     c13.684,0,18.646,10.005,18.646,16.726V610.68c0,6.746-4.963,16.787-18.646,16.787H213.643c-13.428,0-21.996-9.941-21.996-16.787
     v-151.98c0-4.777-3.877-8.654-8.655-8.654h-38.946c-4.777,0-8.654,3.877-8.654,8.654v151.98c0,39.596,35.834,73.041,78.251,73.041
     h357.469c43.399,0,76.396-31.594,76.746-73.49C647.88,608.262,647.222,606.354,646.019,604.816z M571.117,666.412H213.643
     c-33.035,0-60.942-25.523-60.942-55.732V467.354h21.637V610.68c0,16.467,15.795,34.096,39.306,34.096h357.469
     c22.507,0,35.956-17.336,35.956-34.096V72.981c0.004-16.729-13.445-34.035-35.951-34.035H213.643
     c-23.511,0-39.306,17.599-39.306,34.035v147.714h-21.637V72.981c0-30.175,27.907-55.671,60.942-55.671h357.469
     c32.3,0,57.598,24.454,57.598,55.671v537.175c0,1.861,0.588,3.588,1.588,4.998C627.537,644.711,602.936,666.412,571.117,666.412z"
                  />
                  <path
                    d="M226.266,540.996c0,3.416,2.004,6.504,5.12,7.898c1.133,0.51,2.341,0.758,3.535,0.758c2.086,0,4.146-0.754,5.769-2.199
     l223.135-199.166c1.839-1.641,2.891-3.99,2.891-6.457c0-2.466-1.052-4.816-2.891-6.456l-223.14-199.167
     c-2.549-2.271-6.188-2.843-9.299-1.441c-3.116,1.394-5.12,4.488-5.12,7.897v103.995H44.517c-4.777,0-8.655,3.877-8.655,8.655
     v181.749c0,4.777,3.877,8.654,8.655,8.654h181.749V540.996z M53.172,428.408v-164.44H234.92c4.777,0,8.655-3.877,8.655-8.654
     V161.99l201.485,179.84L243.575,521.672v-84.609c0-4.777-3.877-8.654-8.655-8.654H53.172z"
                  />
                </g>
              </g>
            </svg>
          </button>
        </div>
      )}

      {showForm && (
        <div ref={modalRef} className={styles.loginForm}>
          {user ? (
            <div className={styles.modalWrapper}>
              <div className={styles.modalHeader}>
                <div className={styles.modalLogo}>
                  <svg id="sw-js-blob-svg" viewBox="0 0 100 100" width="30" height="30">
                    {' '}
                    <defs>
                      {' '}
                      <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                        {' '}
                        <stop
                          id="stop1"
                          stopColor="rgba(55, 120.514, 248, 1)"
                          offset="0%"></stop>{' '}
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
                  <p>TimeKeeper</p>
                </div>
                <button onClick={signOut}>Выйти</button>
              </div>
              <div className={styles.aboutAccount}>
                <img src={userData.photoURL} />
                <div className={styles.aboutDataAccount}>
                  <p>{userData.displayName}</p>
                  <p>{userData.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <button className={styles.enterGoogle} onClick={signInWithGoogle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 186.69 190.5">
                <g transform="translate(1184.583 765.171)">
                  <path
                    clipPath="none"
                    mask="none"
                    d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                    fill="#4285f4"
                  />
                  <path
                    clipPath="none"
                    mask="none"
                    d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                    fill="#34a853"
                  />
                  <path
                    clipPath="none"
                    mask="none"
                    d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                    fill="#fbbc05"
                  />
                  <path
                    d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                    fill="#ea4335"
                    clipPath="none"
                    mask="none"
                  />
                </g>
              </svg>
              Войти с помощью Google аккаунта
            </button>
          )}

          {/* <button
            className={styles.buttonClose}
            onClick={() => {
              setShowForm(false);
            }}>
            X
          </button> */}
        </div>
      )}
    </div>
  );
};
