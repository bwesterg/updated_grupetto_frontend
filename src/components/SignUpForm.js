import React, { useState, useEffect } from 'react' 
import { Link } from 'react-router-dom'

export default function SignUpForm(props) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(false)

    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        let user ={
            username,
            password
        }

        login 
        ? props.login(user)
            .then(() => props.history.push('/'))
        : props.signUp(user)
            .then(() => props.history.push('/'))
    }
    
    const handleChange = ({target}) => {
        return target.name === "username" 
        ? setUserName(target.value) 
        : setPassword(target.value)
    }

    const handleLoginForm = (event) => {
        event.preventDefault()
        setLogin(!login)
    }

    const showAlerts = () => props.alerts.map(alert => <p key={alert}>{alert}</p>)

    return(
        <form className="signup-form" onSubmit={handleSubmit}>
            {login ? <h1>Log In</h1> : <h2>Sign Up</h2>}
            {props.alerts ? showAlerts() : null }
            <label>Username</label>
            <input name="username" value={username} onChange={handleChange}/>
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handleChange}/>
            <input type="submit" />
            {login
                ? <p>Not a member? <button onClick={handleLoginForm}>Sign Up</button></p>
                : <p>Already a member? <button onClick={handleLoginForm}>Sign In</button></p>
            }

        </form>
    )
}