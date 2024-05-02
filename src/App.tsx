import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./config/RouterConfig.tsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useEffect, useState} from "react";
import {FirebaseUserData} from "./data/user/FirebaseUserData.ts";
import * as FirebaseAuthService from "./authService/FirebaseAuthService.ts";
import {LoginUserContext} from "./context/LoginUserContext.ts";

function App() {
    const [loginUser, setLoginUser] = useState<FirebaseUserData | null | undefined>(undefined);


    useEffect(() => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
    }, []);

    return (
        loginUser !== undefined &&
        <LoginUserContext.Provider value={loginUser}>
            <RouterProvider router={router} />
        </LoginUserContext.Provider>
    )
}

export default App
