import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/tsHooks";
import AnimatePages from "../AnimatePages/AnimatePages";
import { logIn } from "../Authentication/AuthenticationSlice";
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice";
import "./LogInPage.css"

const LogInPage = () => {
    const [form, setForm] = useState({email: "", password: ""});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log("render Login")

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      })
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!form.email || !form.password){
            // dispatch(closeLoader())
            dispatch(displayModalMsgWith("You should complete all fields."))
            return setTimeout(() => dispatch(hideModalMsg()), 3500)
        }

        dispatch(logIn(form))
            .then(({payload}) => payload && navigate("/home"))
    }
    
    return (
        <AnimatePages>
            <div className="logIn-container">
                <div>
                    <h2>Login</h2>
                    <form
                        className="logIn-inputs-container"
                        onSubmit={handleLogin}
                    >
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleForm} required/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={form.password} onChange={handleForm} required/>
                        <span
                            onClick={() => navigate("/signin")}
                        >You don't have an account?
                        </span>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </AnimatePages>
    );
}

export default LogInPage;