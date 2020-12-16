import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import './Connexion.css'
import logo from '../../img/logo.png'


class Connexion extends Component {


    state = {
        usernameReg: '',
        passwordReg: '',
        mailReg: '',
        id: 0,
        mail: '',
        password: '',
        loginStatus: '',
        goToProfil: false,
        goToHome: false
    }

    register = () => {
        Axios.post(`${process.env.REACT_APP_API_URL}/register`, {
            username: this.state.usernameReg, 
            mail: this.state.mailReg,
            password: this.state.passwordReg
        }).then((response) => {
            this.setState({ loginStatus: response.data.message })
        })     
    }

    login = () => {

        Axios.post(`${process.env.REACT_APP_API_URL}/login`, {
            mail: this.state.mail, 
            password: this.state.password
        }).then((response) => {

            if (response.data.message) {
                const loginStatus = response.data.message
                this.setState({ loginStatus })
            } else {

                //mets le token dans le local storage
                let setTokenStringify = JSON.stringify([response.data.token])
                localStorage.setItem("token",setTokenStringify)

                this.setState({ goToHome: true })
            }
        })
    }


    handleUsernameReg = e => {
        const usernameReg = e.target.value
        this.setState({ usernameReg })
    }

    handlePasswordReg = e => {
        const passwordReg = e.target.value
        this.setState({ passwordReg })
    }

    handleUserMailReg = e => {
        const mailReg = e.target.value
        this.setState({ mailReg })
    }

    handleMail = e => {
        const mail = e.target.value
        this.setState({ mail })
    }

    handlePassword = e => {
        const password = e.target.value
        this.setState({ password })
    }

    render() {

        if (this.state.goToHome) {
            return <Redirect push to={`/home`} />
        }

        return (
            <div id="container">
            <div id="login">
                <img id="groupomania" src={logo} alt='logo'/>
                <input type="text" placeholder="Email..." onChange={this.handleMail} />
                <input type="password" placeholder="Password..." onChange={this.handlePassword} />
                <button onClick={this.login}> Se connecter </button>
            </div>
            <div id="main">
                <div className="registration">
                    <h2>Pas encore inscrit ?</h2>
                    <label>Nom d'utilisateur</label>
                    <input type="text" onChange={this.handleUsernameReg} />
                    <label>Adresse email</label>
                    <input type="text" onChange={this.handleUserMailReg} />
                    <label>Mot de passe</label>
                    <input type="password" onChange={this.handlePasswordReg} />
                    <button onClick={this.register}> S'inscrire </button>
                    <h2>{ this.state.loginStatus }</h2>
                </div>
            </div>

        </div>
        )
    }
}

export default Connexion;


