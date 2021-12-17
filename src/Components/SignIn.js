import React from 'react';
import { GoogleLogin } from 'react-google-login';
const clientId = '365387672860-0nufnftmst8vqpp4l2rlreje9jch3m3c.apps.googleusercontent.com';
function Login() {
    const onSuccess = (res) => { console.log('[Login Success] currentUser:', res.profileObj); };
    const onFailure = (res) => {
        console.log('[Login failed] res: ', res);
    };
    return (<div> < GoogleLogin clientId={clientId} buttonText="Login" onSuccess={onSuccess} onFailure={onFailure} cookieftlicy={'single_host_origin'} style={{ marginTop: '100px' }} isSignedln={true} /> </div>);
}
    
export default Login; 