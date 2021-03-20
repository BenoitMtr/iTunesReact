import React, { useState } from 'react'

function LoginForm({Login}, error) {
    const [details, setDetails] = useState({name:"",email:"",password:""});

    const submitHandler = e => {
        e.preventDefault();
        Login(details)
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <h2>Login</h2>
                {/* ERROR! */}
                <label> E-mail </label>
                <input type="text" name="e-mail" id="e-mail" onChange={e => setDetails({...details, email:e.target.value})} value={details.email}/>
            </div>
            <br/>
            <div>
                <label> Password </label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>
            </div>
            <br/>
            <input type="submit" value="LOGIN"/>
        </form>
    )
}

export default LoginForm