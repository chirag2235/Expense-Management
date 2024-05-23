
// these functions help frontend to connect with backend 
import { BACKEND_BASE_URL } from "../config";

// const backendBaseUrl = 'http://localhost:8080';
const backendBaseUrl = BACKEND_BASE_URL;

export const makeUnauthenticatedPOSTRequest = async (route, body) => { // route will be API route  

    // fetch(APIRoute, {some things to specify about API})
    const response = await fetch(backendBaseUrl + route, 
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json" // we need to specify the headers content type as well
            },
            body:JSON.stringify(body) // converting the body recieved from user into string format, and set body equals to that
        }
    )

    const formattedResponse = await response.json();
    return formattedResponse;
}; 
export const makeAuthenticatedDELETERequest = async (route, token) => {
    const response = await fetch(backendBaseUrl + route, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const formattedResponse = await response.json();
    return formattedResponse;
};


export const makeAuthenticatedPOSTRequest = async (route, body) => { // route will be API route  

    const token = getToken();
    // fetch(APIRoute, {some things to specify about API})
    const response = await fetch(backendBaseUrl + route, 
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json", // we need to specify the headers content type as well
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(body) // converting the body recieved from user into string format, and set body equals to that
        }
    )

    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthenticatedGETRequest = async (route, body) => { // route will be API route  

    const token = getToken();
    // fetch(APIRoute, {some things to specify about API})
    const response = await fetch(backendBaseUrl + route, 
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json", // we need to specify the headers content type as well
                "Authorization":`Bearer ${token}`
            },
            // body:JSON.stringify(body) // converting the body recieved from user into string format, and set body equals to that
        }
    )

    const formattedResponse = await response.json();
    return formattedResponse;
};


const getToken = () => {
    const accessToken = document.cookie.replace( // getting the token from cookies using regExpression
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken; 
}