import { ChangeEvent, useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
import 'firebase/auth';
import styles from './Login.module.scss';
import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';

export const LoginForm = () => {
  const [showForm, setShowForm] = useState(false);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
        setPhotoURL(String(user.photoURL));
        setEmail(String(user.email));
        setDisplayName(String(user.displayName));
      } else {
        setUser(null);
      }
    });
  }, []);

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

  return (
    <div>
      {user ? (
        <button
          className={styles.buttonExitAccount}
          onClick={() => {
            setShowForm(true);
          }}>
          <img src={photoURL} />
        </button>
      ) : (
        <div className={styles.openModalWrapper}>
          <button className={styles.openModalButton} onClick={() => setShowForm(true)}>
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
                  <p>Todolist</p>
                </div>
                <button onClick={signOut}>Выйти</button>
              </div>
              <div className={styles.aboutAccount}>
                <img src={photoURL} />
                <div className={styles.aboutDataAccount}>
                  <p>{displayName}</p>
                  <p>{email}</p>
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
