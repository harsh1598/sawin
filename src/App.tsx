import React, { useEffect } from 'react';
import Navigation from './navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_LOGIN_SUCCESS } from './action/Types';
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";
import { ActivePage } from './action/CommonAction';
import { getCurrentPage } from './utility/HelperService';


const App = () => {
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    getLocalState() // eslint-disable-next-line
  }, [])

  const getLocalState = () => {
    const value = localStorage.getItem('token')
    if (value) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: { access_token: value } })
    }


    if (window.location.pathname) {
      dispatch(ActivePage(getCurrentPage(window.location.pathname) as string))
    }
  }

  return (
    <>
      <div><ToastContainer /></div>
      <Navigation />

    </>
  )
}

export default App;