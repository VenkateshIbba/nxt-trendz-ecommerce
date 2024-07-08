import { useReducer } from 'react'
import { useNavigate, Navigate} from 'react-router-dom'
import jsCookie from 'js-cookie'
import './index.css'

const Login = () => {

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {username:'', password: '', errorMessage:''}
      )
    let navigate = useNavigate();

    const onChangeUsername = event => {
        setState({username: event.target.value})
    }

    const onChangePassword = event => {
        setState({password: event.target.value})
    }

    const onSubmitSuccess = jwtToken => {
        console.log(jwtToken);
        jsCookie.set('jwt_token', jwtToken, {expires: 30});
        navigate('/')

    }

    const onSubmitFalure = (errorMessage) => {
        setState({errorMessage})
    }

    const onClickSubmit = async event => {
        const {username, password} = state
        const userDetails = {
            username,
            password
        }
        event.preventDefault()
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        /* console.log(data);
        console.log(response); */
        if (response.ok) {
            onSubmitSuccess(data.jwt_token)
        }else{
            onSubmitFalure(data.error_msg)
        }
    }

    const jwtToken = jsCookie.get('jwt_token')
        if (jwtToken !== undefined) {
            return <Navigate to="/" />

        }

    const {errorMessage} = state
    return (
        <div className='login-container'>
            <img className='login-image' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png' alt='login' />
            <div className='form-container'>
            <img className='logo-style' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png' alt='logo' />
                <form className='form'>
                    <div className='form-field-container'>
                        <label className='label-text'>USERNAME</label>
                        <input 
                        className='input-field' 
                        type='text' 
                        placeholder='Username:- rahul' 
                        onChange={onChangeUsername}
                        />
                    </div>
                    <div className='form-field-container'>
                        <label className='label-text'>PASSWORD</label>
                        <input 
                        className='input-field' 
                        type='password' 
                        placeholder='Password:- rahul@2021'
                        onChange={onChangePassword} 

                        />
                    </div>
                    <div className='form-field-container'>
                        <button onClick={onClickSubmit} className='submit-btn' type='submit'>Login</button>
                        <p className='error-message' id='error-message'>{errorMessage}</p>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Login