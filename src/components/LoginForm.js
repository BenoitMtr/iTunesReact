import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import * as css from './theme.css'
import { ThemeContext } from '../themeContext'
import FormControl from '@material-ui/core/FormControl'
import { Button } from '@material-ui/core'


function LoginForm({Login}, error) {
    const { theme } = useContext(ThemeContext)
    const [details, setDetails] = useState({name:"",email:"",password:""});

    const submitHandler = e => {
        e.preventDefault();
        Login(details)
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <h2 className={classNames([css.lightText], {
                    [css.lightText]: theme === 'light',
                    [css.darkText]: theme === 'dark',
                })}>Connexion</h2>
                {/* ERROR! */}
                <label className={classNames([css.lightText], {
                    [css.lightText]: theme === 'light',
                    [css.darkText]: theme === 'dark',
                })} > E-mail </label>
                <input type="text" name="e-mail" id="e-mail" onChange={e => setDetails({...details, email:e.target.value})} value={details.email}/>
            </div>
            <br/>
            <div>
                <label className={classNames([css.lightText], {
                    [css.lightText]: theme === 'light',
                    [css.darkText]: theme === 'dark',
                })}> Password </label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>
            </div>
            <br/>
            <FormControl>
                <Button
                    className={classNames([], {
                        [css.lightTheme]: theme === 'light',
                        [css.darkTheme]: theme === 'dark',
                    })}
                    style={{ height: '100%' }}
                    type="submit"
                >
                    LOGIN
                </Button>
            </FormControl>
        </form>
    )
}

export default LoginForm