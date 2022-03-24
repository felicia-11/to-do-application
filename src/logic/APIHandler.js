import axios from "axios";

const BASE_URL = 'https://virtserver.swaggerhub.com/';

export const getToDoLists = async() => {
    let errorResp = null, result = null;
    try {
        const resp = await axios({
            method: 'GET',
            url: 'hanabyan/todo/1.0.0/to-do-list',
            baseURL: BASE_URL,
            timeout: 60000,
            timeoutErrorMessage: 'Request has exceeded 60s. Please try again.',
        });
        result = resp.data;
    }
    catch(error) {
        errorResp = error.message;
    }
    return [result, errorResp];
};
