
import  {useState, useEffect} from "react"
import {googleLogout, useGoogleLogin} from "@react-oauth/google"
import axios from "axios"

const AuthComp = () => {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
		<div>
			{profile ? (
				<div className='header-right-side'>
					<img src={profile.picture} height={'40px'} alt='user image' />
					<p>{profile.name}</p>
					<button className='auth-button' onClick={logOut}>
						Log out
					</button>
				</div>
			) : (
				<button className='auth-button' onClick={() => login()}>
					Sign in with Google{" "}
				</button>
			)}
		</div>
	)
}


export default AuthComp
