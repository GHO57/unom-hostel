import { useEffect, useRef, useState } from 'react'
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate
} from 'react-router-dom'
import { Header, Footer, Loader } from './layouts'
import { Home, Account } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './layouts/404/NotFound'
import { clearUserError, clearUserMessage } from './features/user/userSlice'
import { loaduser } from './features/user/userThunks'

function App() {

  const dispatch = useDispatch()
  const hasLoadedUser = useRef(false)

  const { loading, loadingLogin, isAuthenticated, message, error } = useSelector((state) => state.user)
  useEffect(() => {
    
    if(!hasLoadedUser.current){
      dispatch(loaduser())
      hasLoadedUser.current = true
    }

    if((!loadingLogin && message) || (!loading && message)){
      toast.dismiss()
      toast.success(message);

      if (message) dispatch(clearUserMessage());

    }else if((!loadingLogin && error)   || (!loading && error)){
      if(error){
        toast.dismiss()
        toast.error(error.message)
        dispatch(clearUserError());
      }
    }

  }, [dispatch, loading, loadingLogin, message, error])

  return (
    <Router>
      <ToastContainer 
            position='bottom-center'
            autoClose={4000}
            hideProgressBar={true}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            transition={Slide}
            stacked
            limit={1}
            theme='dark'
        />
      <div className={`z-[5000] fixed top-0 left-0 right-0 shadow-[0_3px_16px_-4px_rgba(0,0,0,0.1)] bg-white`}>
        <Header />
      </div>
      <div className='mt-[87px]'>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/account' element={isAuthenticated ? <Account /> : <NotFound />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </div>
      <div>
        <Footer/>
      </div>
    </Router>
  )
}

export default App