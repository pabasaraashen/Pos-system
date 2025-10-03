import React, {useState} from 'react'
import Login from '../components/auth/login/Login';
import Register from '../components/auth/register/Register';

const Auth = () => {
  const [currentView, setCurrentView] = useState('login') // Start with login

  const switchToLogin = () => setCurrentView('login')
  const switchToRegister = () => setCurrentView('register')

  return (
    <>
      {currentView === 'login' && (
        <Login onSwitchToRegister={switchToRegister} />
      )}
      {currentView === 'register' && (
        <Register onSwitchToLogin={switchToLogin} />
      )}
    </>
  )
}

export default Auth