// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(req) {
    let accessToken = req.cookies.get('session_access_token')?.value;
    const refreshToken = req.cookies.get('session_refresh_token')?.value;

    console.log("-------------------------------------------in middleware")

    // Si on a déjà un access token valide → continuer
    if (accessToken && !isExpired(accessToken)) {
        return NextResponse.next();
    }
    
    // Pas d'access token mais on a un refresh token → essayer de rafraîchir
    if (refreshToken) {
        try {
            const refreshResponse = await fetch('http://localhost:8000/refresh/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: refreshToken })
            });

            const json = await refreshResponse.json();

            if (json.access) {
                // Créer la réponse et mettre le nouveau cookie
                const res = NextResponse.redirect(req.url);
                res.cookies.set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: false, 
                    maxAge: 60 * 1, // 1 min
                    path: '/'
                });

                return res;
            } else {
                // Refresh échoué → supprimer cookies et rediriger
                const res = NextResponse.redirect(new URL('/login', req.url));
                res.cookies.delete('session_access_token');
                res.cookies.delete('session_refresh_token');
                return res;
            }
        } catch (error) {
            console.error('Erreur refresh token:', error);
            const res = NextResponse.redirect(new URL('/login', req.url));
            res.cookies.delete('session_access_token');
            res.cookies.delete('session_refresh_token');
            return res;
        }
    }

    // Pas de refresh token → redirection login
    const res = NextResponse.redirect(new URL('/login', req.url));
    res.cookies.delete('session_access_token');
    res.cookies.delete('session_refresh_token');
    return res;
}

function isExpired(token) {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}



export const config = {
    matcher: [
        '/',
        '/jobs/:path*',
        '/myprofile'
    ],
};
