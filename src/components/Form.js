import React, { useContext, useState } from 'react'
import LoginForm from './LoginForm'
import classNames from 'classnames'
import * as css from './theme.css'
import { ThemeContext } from '../themeContext'
import { Button } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'

function Form() {

    const Utilisateurs = [
    {
        login :"User1",
        email: "user1@gmail.com",
        password: "user1"
    },
    {
        login:"User2",
        email: "user2@gmail.com",
        password: "user2"
    },
    {
        login:"User3",
        email: "user3@gmail.com",
        password: "user3"
    },
    {
        login:"User4",
        email: "user4@gmail.com",
        password: "user4"
    }
    ];


    const [user, setUser] = useState({ login:"",email: "", password: "" });
    const [error, setError] = useState("");
    const {theme} = useContext(ThemeContext)

    const Login = details => {
        console.log(details);
        Utilisateurs.forEach(user =>{
           if (details.email == user.email && details.password == user.password){
               setUser({
                   login : user.login,
                   name: details.email,
                   email: details.password
               });
           }
           else if (details.email == "" || details.password == "") {
               console.log("Il faut renseigner au moins un champ")
               setError("Il faut renseigner au moins un champ")

           }
           else {
               console.log("Pas le bon user")
           }
        });
    }

    const Logout = () => {
        setUser({login :"",email: "",password:""});
        console.log("Logout");
    }

    return (
        <div>
            {(user.email != "") ? (
                <div>
                    <h2 className={classNames([css.lightTitleStyle], {
                        [css.lightText]: theme === 'light',
                        [css.darkText]: theme === 'dark',
                    })}> Bienvenue <span> {user.login}</span></h2>
                    <FormControl>
                        <Button
                            className={classNames([], {
                                [css.lightTheme]: theme === 'light',
                                [css.darkTheme]: theme === 'dark',
                            })}
                            style={{ height: '100%' }}
                            type="text"
                            onClick={Logout}
                        >
                            Deconnexion
                        </Button>
                    </FormControl>
                </div>

            ) : (
                <LoginForm Login={Login} error={error} />
            )}
        </div>
    );
}

export default Form;