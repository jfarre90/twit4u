import axios from 'axios';

export function setTokenHeader(token) {
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function apiCall(method,path,data){
    return new Promise((resolve, reject)=> {
        //we added toLowerCase in case we wrote the method in uppercaps
        return axios[method.toLowerCase](path,data)
        .then(res => {
            return resolve(res.data)
        })
        .catch(err => {
            return reject(err.response.data.error);
        });
    });
    
    //when getting a response from Axios, we get a response in a certain object.
    //We get an object called response and a subobject called data. Inside data there's the subobject error
}