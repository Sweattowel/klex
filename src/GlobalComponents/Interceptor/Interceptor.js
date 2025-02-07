import axios from "axios"

const API = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ADDRESS
});

API.interceptors.request.use((config) => {
    try {
        // GET HEADERS FROM REQUEST
        const sentRequestHeaders = [config.headers["RequestType"], config.headers["RequestDateSent"], config.headers["RelevantID"], config.headers["UserType"]]
        
        // LOG REQUEST AND CONTINUE
        console.log(`Request Intercepted, \n Type: ${sentRequestHeaders[0]}, \n Date: ${sentRequestHeaders[1]},\n From: ${sentRequestHeaders[2]},\n UserType: ${sentRequestHeaders[3]}`);
        
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
})

API.interceptors.response.use((config) => {
    try {
        // GET HEADERS FROM RESPONSE
        const sentResponseHeaders = [config.headers["ResponseType"], config.headers["ResponseDateSent"], config.headers["RelevantID"], config.headers["UserType"]]
        // LOG RESPONSE AND CONTINUE
        console.log(`Response Intercepted, \n Type: ${sentResponseHeaders[0]}, \n Date: ${sentResponseHeaders[1]},\n From: ${sentResponseHeaders[2]},\n UserType: ${sentResponseHeaders[3]}`);
        
        return config;
        
        } catch (error) {
        return Promise.reject(error);
    }
})

export default API;