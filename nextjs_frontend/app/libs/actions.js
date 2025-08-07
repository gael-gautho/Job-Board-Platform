
const apiService = {

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
                .then((response) => {
                    console.log('Response:', response);

                    resolve(response);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }

}

export default apiService;

