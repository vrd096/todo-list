import { ChangeEvent, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';

type LoginFormInputs = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const [showForm, setShowForm] = useState(false);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  // const { auth } = useContext(Context);

  // const [login, setLogin] = useState('');
  // const [password, setPassword] = useState('');
  // const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  // const { register, handleSubmit, reset, watch } = useForm<LoginFormInputs>();

  // const onSubmit = (data: LoginFormInputs) => {
  //   let pass = watch('password').replace(/\s/g, '');

  //   data.password = pass;
  //   console.log(JSON.stringify(data.password));

  //   setIsSubmitDisabled(true);
  //   reset();
  //   setShowForm(false);
  // };
  // console.log(errors);

  // const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setLogin(e.currentTarget.value);
  //   setIsSubmitDisabled(e.target.value === '' || password === '');
  // };
  // const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  //   setIsSubmitDisabled(login === '' || e.target.value === '');
  // };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        setPhotoURL(String(result.user.photoURL));
        setEmail(String(result.user.email));
        setDisplayName(String(result.user.displayName));

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
          <img src={photoURL} />
        </button>
      ) : (
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
      )}

      {showForm && (
        <div className={styles.loginForm}>
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              {...register('username', { required: true, minLength: 6 })}
              placeholder="Email:"
              onChange={handleLoginChange}
            />

            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              placeholder="Password:"
              onChange={handlePasswordChange}
            />

            <button className={styles.buttonSubmit} type="submit" disabled={isSubmitDisabled}>
              Отправить
            </button>
          </form> */}
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
                <p>{displayName}</p>
                <p>{email}</p>
              </div>
            </div>
          ) : (
            <button className={styles.enterGoogle} onClick={signInWithGoogle}>
              Войти с помощью Google
            </button>
          )}

          <button
            className={styles.buttonClose}
            onClick={() => {
              setShowForm(false);
            }}>
            X
          </button>
        </div>
      )}
    </div>
  );
};
