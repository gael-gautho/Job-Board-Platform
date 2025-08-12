import { getAccessToken } from "../libs/actions";

const apiService = {

get: async function (url) {
    console.log('get', url);
    
    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);

                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
    })
},



post: async function(url, data) {
    console.log('post', url, data);

    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);

                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
        })
    },

postWithoutToken: async function(url, data) {
    console.log('post', url, data);

    return new Promise((resolve, reject) => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async(response) => {
                console.log('Response:', response);
                const parsedResponse = await response.json();
                resolve({
                status: response.status,
                data: parsedResponse
                });
            })
            .catch((error => {
                reject(error);
            }))
    })
}

}

export default apiService;

