import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
// import Axios from 'axios';
import './App.css';
import { connect } from 'react-redux'

class App extends Component {

  state = {
    username: '',
    goToProfil: false,
  }

  componentDidMount () {

    const { user } = this.props;
    this.setState({ username: user.username })

    // Axios.get(`http://localhost:3001/user/${user.id}`).then((response) => {
    //     this.setState({ user: response.data[0].username })
    // })

  }

  handleGoToProfil = () => {
    this.setState({ goToProfil: true })
  }

  render() {

    if (this.state.goToProfil) {
        return <Redirect push to={`/profil`} />
    }

    return (
      <Fragment>
        <div className="conteneur">
        <h1>Bienvenue {this.state.username}</h1>
          <p>Groupomania, un réseau social</p>
          <button onClick={this.handleGoToProfil}>Ajouter un profil</button>
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

export default connect(mapStateToProps)(App);
