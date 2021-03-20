import React, { useState } from 'react'
import LoginForm from './LoginForm'

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
                    <h2> Bienvenue <span> {user.login}</span></h2>
                    <button onClick={Logout}> Déconnexion </button>
                </div>

            ) : (
                <LoginForm Login={Login} error={error} />
            )}
        </div>
    );
}

export default Form;