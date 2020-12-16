import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ProfilHome from '../../components/ProfilHome/ProfilHome'
import PostHome from '../../components/PostHome/PostHome'
import './Home.css';
import Logo from '../../img/logo.png'
import ProfilIcon from '../../img/anonyme.png'
import Axios from 'axios'

class Home extends Component {

  state = {
    userProfil: {
      username: '',
      mail: '',
      age: '',
      department: '',
      image_url: '',
      isadministrator: false
    },
    goToProfil: false,
    showProfil: false
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
            user.isadministrator = res.isadministrator
            this.setState({ userProfil: user })
        })
  }

  handleGoToProfil = () => {
    this.setState({ goToProfil: true })
  }


  showProfil = () => {
    console.log('showProfil ' + this.state.showProfil )

    this.setState({ showProfil: !this.state.showProfil })
  }

  render() {

    if (this.state.goToProfil) {
        return <Redirect push to={`/profil`} />
    }

    let profil = "profilFalse"
    if (this.state.showProfil) {
      profil = "profilFalse profilTrue"
    }

    return (
        <div id="conteneur">
          <div id="topBar">
            <img id="profilIcon" onClick={this.showProfil} src={ProfilIcon} alt='profilIcon' />
            <img id="logoHome" src={Logo} alt='logo'/>
          </div>
          <section className={profil}>
            <ProfilHome userProfil={this.state.userProfil}></ProfilHome>
          </section>
          <section className="post">
            <PostHome userProfil={this.state.userProfil}></PostHome>
          </section>
        </div>
    )
  }
}


export default Home;