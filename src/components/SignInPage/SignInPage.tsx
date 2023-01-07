import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/tsHooks';
import { displayModalMsgWith, hideModalMsg } from '../ModalMsg/ModalMsgSlice';
import { motion } from "framer-motion"
import './SignInPage.css'
import { signIn } from '../Authentication/AuthenticationSlice';
import AnimatePages from '../AnimatePages/AnimatePages';

const SignInPage = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    console.log("render Signin")

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.email || !form.password || !form.username) {
            // dispatch(closeLoader())
            dispatch(displayModalMsgWith('You should complete all fields.'))
            return setTimeout(() => dispatch(hideModalMsg()), 3500)
        }

        dispatch(signIn(form))
            .then(({payload}) => payload && navigate("/home"))
    }

    return (
        <AnimatePages>
            <div className='signIn-container'>
                <div className="signin-fields">
                    <h2>Sign In</h2>
                    <form
                        className='signIn-inputs-container'
                        onSubmit={handleSignIn}
                    >
                        <label htmlFor="username">Username</label>
                        <input type="text" name='username' value={form.username} required onChange={handleForm} autoComplete='off' />
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' value={form.email} onChange={handleForm} autoComplete='off' />
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' value={form.password} required onChange={handleForm} autoComplete='off' />
                        <span
                            onClick={() => navigate("/login")}
                        >Already a user?</span>
                        <button>Sign in</button>
                    </form>
                </div>
            </div>
        </AnimatePages>
    );

}

export default SignInPage;
