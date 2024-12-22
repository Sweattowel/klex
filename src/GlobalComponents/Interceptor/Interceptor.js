import axios from "axios"

const API = axios.create({
    baseURL: process.env.REACT_SERVER_ADDRESS
});

let save = null;

API.interceptors.request.use((config) => {
    try {
        // GET HEADERS FROM REQUEST
        const sentRequestHeaders = [config.headers["RequestType"], config.headers["RequestDateSent"], config.headers["RelevantID"], config.headers["UserType"]]
        // VERIFY PRESENCE OF ALL HEADERS
        for (const header of sentRequestHeaders){
            if (!header || header === undefined){return Promise.reject("IncorrectHeaders")};
        }
        save = sentRequestHeaders;
        // LOG REQUEST AND CONTINUE
        console.log(`Request Intercepted, \n Type: ${sentRequestHeaders[0]}, \n Date: ${sentRequestHeaders[1]},\n From: ${sentRequestHeaders[2]},\n UserType: ${sentRequestHeaders[3]}`);
        
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
})

API.interceptors.response.use((config) => {
    try {
        // GET HEADERS FROM REQUEST
        const sentRequestHeaders = [config.headers["RequestType"], config.headers["RequestDateSent"], config.headers["RelevantID"], config.headers["UserType"]]
        // VERIFY PRESENCE OF ALL HEADERS
        for (const header of sentRequestHeaders){
            if (!header || header === undefined){return Promise.reject("IncorrectHeaders")};
        }
        // VERIFY REQUEST AND RESPONSE MATCH
        if (sentRequestHeaders !== save){
            return Promise.reject("Request does not match response, aborting");
        }
        // LOG REQUEST AND CONTINUE
        console.log(`Request Intercepted, \n Type: ${sentRequestHeaders[0]}, \n Date: ${sentRequestHeaders[1]},\n From: ${sentRequestHeaders[2]},\n UserType: ${sentRequestHeaders[3]}`);
        
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
})

export default API;