import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '../components/Alert';

import cx from 'classnames';
import styles from '../styles/Login.module.scss';

import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { auth, db } from '../config/config';

import { ReactComponent as SpinnerIcon } from '../media/icons/spinner.svg'
import { ReactComponent as LinkIcon } from '../media/icons/link.svg'
import { ReactComponent as GoogleIcon } from '../media/icons/google-g.svg'

import { NavLink } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion'


const Login = ({ user, loginUser, logoutUser }) => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        return setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email
        });
      }).then(() => {
        resetForm();
        setErrorMsg('');
        setTimeout(() => {
          history('/update-profile')
        }, 500);
      }).catch((err) => {
        setLoading(false);
        setErrorMsg(err.message);
        resetForm();
      }).finally(() => {
        setLoading(false);
      })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    signInWithEmailAndPassword(auth, email, password).then(async (res) => {
      const docSnap = await getDoc(doc(db, 'users', res.user.uid));
      if (docSnap.exists()) {
        const authUser = {
          user: res.user,
          isProfileComplete: docSnap.data().isProfileComplete === true,
          admin: false
        }
        redirect(authUser);  
      }
      else {
        signOut(auth);
        setErrorMsg('Invalid user!');
        resetForm();
        setLoading(false);
      }
    }).catch(err => {
      setErrorMsg(err.message);
      resetForm();
      logoutUser();
      setLoading(false);
    })
  }

  const redirect = (user) => {
    if (user.isProfileComplete) {
      history('/register');
    } else {
      history('/update-profile');
    }
  }

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    if (errorMsg.length < 25) {
      setTimeout(() => {
        setErrorMsg('');
      }, 5000)
    }
  }, [errorMsg])

  useEffect(() => {
    if (user.user) history('/');
  }, [])

  return (
    <motion.div className={cx(styles['login-page'], 'page-transition')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <div className='container'>
        <header className={cx('page-header', styles.header)}>
          <h1 className='heading'>Login</h1>
        </header>
        <div className={styles['form-box']}>
          <Alert severity='error' message={errorMsg} handleDismiss={(e) => {e.preventDefault(); setErrorMsg('')}} />
          <form className={styles['login-form']} onSubmit={handleLogin}>
            <div className={cx(styles['login-field'], styles.email)}>
              <input type='email' required placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} value={email} ></input>
            </div>
            <div className={cx(styles['login-field'], styles.password)}>
              <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required placeholder='Password'></input>
            </div>

            <div className={styles['btns-wrapper']}>
              <button disabled={loading} className={'btn'} type="submit">
                <span className='btn-subtitle'></span>
                <span className='btn-text'>Login</span>
                {loading && <SpinnerIcon />}
              </button>
              <NavLink to='/signup' className='btn secondary'>
                <span className='btn-subtitle'>Don't have an account?</span>
                <span className='btn-text'>Sign up</span>
                <LinkIcon />
              </NavLink>
            </div>
            <div className={styles['btn-wrapper']}>
              <button onClick={handleGoogleLogin} value='google' type='button' className='btn secondary'>
                <span className='btn-subtitle'></span>
                <span className='btn-text'>Continue with Google</span>
                <GoogleIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default Login;