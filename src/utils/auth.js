import { useAuthStore } from '../store/auth';
import axios from './axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: false,
})


export const login = async (email, password) => {
    try{
        const { data, status } = await axios.post('user/token/', { 
            email, 
            password 
        });
        if (status === 200) {
            // Save the token in the local storage
            setAuthUser(data.access, data.refresh);
            // alert - sign in success
            Toast.fire({
                icon: 'success',
                title: 'Logged in successfully'
            })
        }
        return {data, error: null}
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'An error occurred logging in.'
        };
    }
}

export const register = async (full_name, email, phone, password, password2) => {
    try{
        const { data } = await axios.post('user/register/',{
            full_name,
            email,
            phone,
            password,
            password2
        });

        await login(email, password);
        // alert - sign up success
        Toast.fire({
            icon: 'success',
            title: 'Registered successfully'
        })
        return {data, error: null}
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'An error occurred registering.'
        }
    }
}


export const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    useAuthStore.getState().setUser(null);

    // alert - logged out successfully
    Toast.fire({
        icon: 'success',
        title: 'Logged out successfully'
    })
}


export const setUser = async () => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if ( !accessToken || !refreshToken ) {
        return;
    }

    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else{
        setAuthUser(accessToken, refreshToken);
    }
}


export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token, {
        expires: 1,
        secure:true
    });
    Cookies.set('refresh_token', refresh_token, {
        expires: 7,
        secure:true
    });

    const user = jwtDecode(access_token) ?? null

    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
}

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.exp < Date.now() / 100; 
    } catch (error) {
        console.log(error);
        return true;
    }
}

export const getRefreshToken = async () => {
    const refresh_token = Cookies.get('refresh_token');
    const response = await axios.post('user/token/refresh/', { 
        refresh: refresh_token 
    });
    return response.data;
}