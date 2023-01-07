import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import SignInPage from './components/SignInPage/SignInPage';
import LogInPage from './components/LogInPage/LogInPage';
import HomePage from './components/HomePage/HomePage';
import DecksPage from './components/DeckPage/DeckPage';
import Loader from './components/Loader/Loader'
import Authentication from './components/Authentication/Authentication';
import { useAppDispatch, useAppSelector } from './hooks/tsHooks';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ModalMsg from './components/ModalMsg/ModalMsg';
import { useCheckToken } from './hooks/useCheckToken';
import { URL_AUTH } from './constants/constants';
import DeckPage from './components/DeckPage/DeckPage';
import StudyPage from './components/StudyPage/StudyPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const {isAuth} = useAppSelector(state => state.authentication)
  const { isModalMsgOpen } = useAppSelector(state => state.modalMsg)
  const {isLoaderOpen} = useAppSelector(state => state.loader)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const checkToken = useCheckToken(dispatch, navigate, URL_AUTH.REFRESH_TOKEN, isAuth)
  console.log("render App")

  if(isLoaderOpen) return <div className='loader-container'><Loader /></div>

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<SignInPage />}/>
          <Route path="/signin" element={<SignInPage />}/>
          <Route path="/login" element={<LogInPage />}/>
          <Route path="/home" element={ isAuth? <HomePage /> : <Navigate to="/" /> }/>
          <Route path="/decks" element={ isAuth? <DecksPage /> : <Navigate to="/" />}/>
          <Route path="/decks/:name*" element={ isAuth? <DeckPage /> : <Navigate to="/" />} />
          <Route path="/study" element={isAuth? <StudyPage /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </AnimatePresence>
      {isModalMsgOpen && <ModalMsg />}    
    
    </>
  );
}

export default App;
