import {signIn, signOut, signUp} from "../../controllers/auth.controller.js";

export const authEndpoints = [
    {
        name: 'sign-in',
        method: 'post',
        endpoint: 'sign-in',
        controller: signIn
    },
    {
        name: 'sign-up',
        method: 'post',
        endpoint: 'sign-up',
        controller: signUp
    },
    {
        name: 'sign-out',
        method: 'post',
        endpoint: 'sign-out',
        controller: signOut
    },
]