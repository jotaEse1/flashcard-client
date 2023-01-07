import { Suspense } from 'react'
import { useAppSelector } from "../../hooks/tsHooks";
import { Navigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import "./Authentication.css"
import SignInPage from '../SignInPage/SignInPage';

const Authentication = () => {
    const { isAuth } = useAppSelector(state => state.authentication)
    console.log("render Auth")

    //if()

    return (
        <Suspense fallback={<Loader />}>
            <div className='auth-container'>
                {isAuth ? (
                    <Navigate to="/home" />
                ) : (
                    <SignInPage />
                )}
            </div>
        </Suspense>
    );
}

export default Authentication;