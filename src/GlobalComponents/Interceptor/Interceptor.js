import axios from "axios"

const API = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ADDRESS
});

let save = null;

API.interceptors.request.use((config) => {
    try {
        // GET HEADERS FROM REQUEST
        const sentRequestHeaders = [config.headers["RequestType"], config.headers["RequestDateSent"], config.headers["RelevantID"], config.headers["UserType"]]
        // VERIFY PRESENCE OF ALL HEADERS
        for (const header of sentRequestHeaders){
            console.log(header)
            continue;
            if (!header || header === undefined){return Promise.reject("IncorrectHeaders REQ", header)};
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
        // GET HEADERS FROM RESPONSE
        const sentResponseHeaders = [config.headers["ResponseType"], config.headers["ResponseDateSent"], config.headers["RelevantID"], config.headers["UserType"]]
        // VERIFY PRESENCE OF ALL HEADERS
        for (const header of sentResponseHeaders){
            console.log(header)
            continue;
            if (!header || header === undefined){return Promise.reject("IncorrectHeaders RES", header)};
        }
        // VERIFY REQUEST AND RESPONSE MATCH
        //if (sentResponseHeaders !== save){
        //    return Promise.reject("Response does not match response, aborting");
        //}
        // LOG RESPONSE AND CONTINUE
        console.log(`Response Intercepted, \n Type: ${sentResponseHeaders[0]}, \n Date: ${sentResponseHeaders[1]},\n From: ${sentResponseHeaders[2]},\n UserType: ${sentResponseHeaders[3]}`);
        
        return config;
        
        } catch (error) {
        return Promise.reject(error);
    }
})

export default API;