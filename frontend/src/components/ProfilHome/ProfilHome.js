import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './ProfilHome.css';
import Anonyme from '../../img/anonyme.png'

class ProfilHome extends Component {

  state = {
    goToProfil: false,
    goToLogin: false
  }

 

  handleGoToProfil = () => {
    this.setState({ goToProfil: true })
  }

  signOut = () => {
    localStorage.clear()
    this.setState({ goToLogin: true })
  }
  
  addDefaultSrc(ev){
    ev.target.src = Anonyme
  }

  render() {

    const props = this.props

    if (this.state.goToProfil) {
        return <Redirect push to={`/profil`} />
    }

    if (this.state.goToLogin) {
        return <Redirect push to={`/`} />
    }

    return (
        <div id="profil-home">
          <h3 id="profilTitle">Profil de {props.userProfil.username}</h3>
          <img id="imageProfil" onError={this.addDefaultSrc} src={props.userProfil.image_url} alt='profil' />
          <h4>age : {props.userProfil.age} ans</h4>
          <h4>Adresse mail :</h4>
          <h4>{props.userProfil.mail}</h4>
          <h4>Service : {props.userProfil.department}</h4>
          <button onClick={this.handleGoToProfil}>modifier son profil</button>
          <button onClick={this.signOut}>Déconnexion</button>
        </div>
    )
  }
}


export default ProfilHome;


