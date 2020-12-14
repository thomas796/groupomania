import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './ProfilHome.css';
import Axios from 'axios'

class ProfilHome extends Component {

  state = {
    userProfil: {
      username: '',
      mail: '',
      age: '',
      department: '',
      image_url: ''
    },
    goToProfil: false,
    goToLogin: false
  }

  componentDidMount () {

    let getTokenStringify = localStorage.getItem("token");
    let getToken = JSON.parse(getTokenStringify);

    Axios.get(`${process.env.REACT_APP_API_URL}/getProfil/${getToken[0]}`, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {
            const res = response.data[0]
            const user = this.state.userProfil
            user.username = res.username
            user.mail = res.mail
            user.age = res.age
            user.department = res.department
            user.image_url = res.profilimage
            this.setState({ userProfil: user })
        })
  }

  handleGoToProfil = () => {
    this.setState({ goToProfil: true })
  }

  signOut = () => {
    localStorage.clear()
    this.setState({ goToLogin: true })
  }

  render() {

    if (this.state.goToProfil) {
        return <Redirect push to={`/profil`} />
    }

    if (this.state.goToLogin) {
        return <Redirect push to={`/`} />
    }

    return (
        <div id="profil-home">
          <h2>Profil de {this.state.userProfil.username}</h2>
          <img id="imageProfil" src={this.state.userProfil.image_url} alt='profil' />
          <h3>age : {this.state.userProfil.age} ans</h3>
          <h3>Adresse mail :</h3>
          <h3>{this.state.userProfil.mail}</h3>
          <h3>Service :</h3>
          <h3>{this.state.userProfil.department}</h3>
          <button onClick={this.handleGoToProfil}>modifier son profil</button>
          <button onClick={this.signOut}>Déconnexion</button>
        </div>
    )
  }
}


export default ProfilHome;


