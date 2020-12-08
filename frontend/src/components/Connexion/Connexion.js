import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';
import './Connexion.css';
import { connect } from 'react-redux'

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

    register = () => {
        Axios.post('http://localhost:3001/register', {
            username: this.state.usernameReg, 
            mail: this.state.mailReg,
            password: this.state.passwordReg
        }).then((response) => {
            this.setState({ loginStatus: response.data.message })
        })     
    }

    login = () => {
        Axios.post('http://localhost:3001/login', {
            mail: this.state.mail, 
            password: this.state.password
        }).then((response) => {
            console.log(response.data[0])
            if (response.data.message) {
                const loginStatus = response.data.message
                this.setState({ loginStatus })
            } else {
                const user = {
                    id: response.data[0].id,
                    mail: response.data[0].mail,
                    username: response.data[0].username,
                    password: response.data[0].password
                }

                this.props.addusers(user)

                this.setState({ loginStatus: user.username })
                this.setState({ goToHome: true })
            }
        })
    }
        


    render() {

        if (this.state.goToHome) {
            return <Redirect push to={`/home`} />
        }

        return (
        <Fragment>
        <div>
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input type="text" onChange={this.handleUsernameReg} />
                <label>Email</label>
                <input type="text" onChange={this.handleUserMailReg} />
                <label>Password</label>
                <input type="password" onChange={this.handlePasswordReg} />
                <button onClick={this.register}> Register </button>
            </div>
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Email..." onChange={this.handleMail} />
                <input type="password" placeholder="Password..." onChange={this.handlePassword} />
                <button onClick={this.login}> Connexion </button>
            </div>

            <h1>{ this.state.loginStatus }</h1>
        </div>
        </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        addusers: (newObject) => {
            dispatch({ type: "USER", payload: newObject })
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Connexion);
