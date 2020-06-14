import React from 'react';
import Axios from 'axios';

//Retrives a response for the requested url.
// Returns a promise containing the requested data if successful, otherwise returns null.
export function getResponseData(url) {
    var responseData = Axios.get(url).then(
        (response) => {
            console.log("Successfully got a response for: " + url);
            return response.data;
        }, 
        (error) => {
            console.log(error);
            return null;
        }
    );

    console.log(responseData);
    return responseData;
}

