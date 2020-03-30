import React, { useState, useEffect } from 'react'
import firebase, { auth, provider, database } from '../firebase.js'


const LoginPage = () => {

  const [user, setUser] = useState(null);
  const [list, setList] = useState(null);
  
  useEffect(() => {
    auth.onAuthStateChanged( user => {
      if (user) {
        setUser(user.user)
      }
    })
  });

  const login = () => {
    auth.signInWithPopup(provider).then(result => {
      setUser(result.user)
    })

    database.ref('users').on('value', snap => {
      setList(snap.val())

    });
  }

  return(
    <>
      <h1>Test App</h1>
      <button onClick={login}>Log In</button>
    </>
  )
}


export default LoginPage