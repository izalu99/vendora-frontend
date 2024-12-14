import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';



const GetUserData = () => {

    let accessToken = Cookie.get('access_token')
    let refreshToken = Cookie.get('refresh_token')

    if (accessToken && refreshToken){
        const token = refreshToken
        const decoded = jwtDecode(token)
        return decoded
    } else{
        console.log('No user token found.')
        //return null
    }

}

export default GetUserData;
