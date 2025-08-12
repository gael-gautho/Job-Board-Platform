'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';


export async function handleRefresh() {
    console.log('handleRefresh');
    console.log(cookies().getAll());
    const refreshToken = await getRefreshToken();
    console.log('Refresh token utilisé :', refreshToken);

    const token = await fetch('http://localhost:8000/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((json) => {
            console.log('Response - Refresh:', json);

            if (json.access) {
                cookies().set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 60 * 60, // 60 minutes
                    path: '/'
                });

                return json.access;
            } else {
                resetAuthCookies();
                redirect('/login');
            }
        })
        .catch((error) => {
            console.log('error', error);

            resetAuthCookies();
            redirect('/login');
        })

    return token;
}

export async function handleLogin(accessToken, refreshToken) {
    
    console.log("1-----------",cookies().getAll());

    // userInfo = jwtDecode(accessToken)

    // cookies().set('session_userid', userInfo, {
    //     httpOnly: true,
    //     secure: false,
    //     maxAge: 60 * 60 * 24 * 1, // One day
    //     path: '/'
    // });

    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });

    cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 1, // One day
        path: '/'
    });

    console.log("------------",cookies().getAll());

}


export async function resetAuthCookies() {
    console.log('resetAuthCookies')
    cookies().set('session_userid', '');
    cookies().set('session_access_token', '');
    cookies().set('session_refresh_token', '');
}



// Get data

export async function getUserId() {
    const userId = cookies().get('session_userid')?.value
    return userId ? userId : null
}

export async function getAccessToken() {
    let accessToken = cookies().get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }
    return accessToken;
}



export async function getRefreshToken() {
    let refreshToken = cookies().get('session_refresh_token')?.value;
    return refreshToken;
}