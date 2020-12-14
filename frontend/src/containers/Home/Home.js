import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ProfilHome from '../../components/ProfilHome/ProfilHome'
import PostHome from '../../components/PostHome/PostHome'
import './Home.css';

class Home extends Component {

  state = {
    userprofil: '',
    goToProfil: false,
  }

  componentDidMount () {


  }

  handleGoToProfil = () => {
    this.setState({ goToProfil: true })
  }


  render() {

    if (this.state.goToProfil) {
        return <Redirect push to={`/profil`} />
    }

    return (
        <div id="conteneur">
          <section className="profil">
            <ProfilHome></ProfilHome>
          </section>
          <section className="post">
            <PostHome></PostHome>
          </section>
        </div>
    )
  }
}


export default Home;