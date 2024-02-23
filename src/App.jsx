import { useRef, useState } from 'react';
import './App.css'
import "./config.mjs"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {

  const [showSignup, setShowSignup] = useState(false)

  const auth = getAuth();

  const signupEmailRef = useRef()
  const signupPasswordRef = useRef()

  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()

  const signup = async (e) => {

    e.preventDefault()

    const email = signupEmailRef.current.value
    const password = signupPasswordRef.current.value

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const login = async (e) => {

    e.preventDefault()

    const email = loginEmailRef.current.value
    const password = loginPasswordRef.current.value

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  return (
    <>

      {

        showSignup ?
          <>
            {/* signup */}
            < form onSubmit={signup} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              height: "80vh"
            }}>
              <h2>Signup</h2>
              <input ref={signupEmailRef} type="email" placeholder='email' />
              <input ref={signupPasswordRef} type="password" placeholder='password' />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                <button style={{ cursor: 'pointer' }} type="submit">Signup</button>
                <p style={{ cursor: 'pointer' }}
                  onClick={() => setShowSignup(false)}
                >Login</p>
              </div>
            </form >
          </>
          :
          <>
            {/* login */}
            < form onSubmit={login} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              height: "80vh"
            }}>
              <h2>Login</h2>
              <input ref={loginEmailRef} type="email" placeholder='email' />
              <input ref={loginPasswordRef} type="password" placeholder='password' />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                <p style={{ cursor: 'pointer' }}
                  onClick={() => setShowSignup(true)}
                >Signup</p>
                <button style={{ cursor: 'pointer' }} type="submit">Login</button>
              </div>
            </form >
          </>

      }

    </>
  )
}

export default App
