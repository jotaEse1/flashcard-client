import { useEffect } from "react";
import { authUser } from "../components/Authentication/AuthenticationSlice";
import { closeLoader } from "../components/Loader/LoaderSlice";
import { displayModalMsgWith, hideModalMsg } from "../components/ModalMsg/ModalMsgSlice";
import { CheckTokenResponseSuccessful, CheckTokenResponseUnSuccessful } from "../interfaces/auth";

export function useCheckToken(dispatch: any, navigate: any, url: string, isAuth: boolean) {
    const options: RequestInit = {
        method: 'POST',
        credentials: 'include', // Needed to include the cookie
        headers: {
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        if(isAuth) return;
        
        let ignore = false;

        fetch(url, options)
            .then(res => res.json())
            .then((response: CheckTokenResponseSuccessful | CheckTokenResponseUnSuccessful) => {
                if(!ignore) {   
                    console.log(response)
                    const { success } = response;

                    if(success){
                        if (response.payload.status === 404) {
                            dispatch(closeLoader())
                            navigate("/")
                            return
                        }
    
                        dispatch(closeLoader())
                        dispatch(displayModalMsgWith(`Welcome back ${response.payload.user.username}`))
                        dispatch(authUser(response.payload.user))
                        navigate("/home")
                        setTimeout(() => {
                            dispatch(hideModalMsg())
                        }, 3500)
                        
                    }
                }
            })

        return () => {
            ignore = true;
        }
    }, [])

    return true;
}