import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';
import './UpdateProfil.css';

class UpdateProfil extends Component {

    state = {
        username: 'anonyme',
        age: '',
        department: '',
        selectedFile: 'null',
        goToHome: false
    }

    componentDidMount () {

        let getTokenStringify = localStorage.getItem("token");
        let getToken = JSON.parse(getTokenStringify);
    
        Axios.get(`${process.env.REACT_APP_API_URL}/getProfil/${getToken[0]}`, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {
                const res = response.data[0]
                this.setState({ username: res.username })
                this.setState({ age: res.age })
                this.setState({ department: res.department })
            })
    }


    confirmProfil = () => {
        let getTokenStringify = localStorage.getItem("token");
        let getToken = JSON.parse(getTokenStringify);

        var formData = new FormData();
        formData.append("image", this.state.selectedFile);
        formData.append("age", this.state.age);
        formData.append("department", this.state.department);

        Axios.put(`${process.env.REACT_APP_API_URL}/updateProfil/${getToken[0]}`, formData, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {
            this.setState({ goToHome: true })
        })
    }

    handleAge = (e) => {
        const age = e.target.value
        this.setState({ age })
    }

    handleDepartment = (e) => {
        const department = e.target.value
        this.setState({ department })
    }
    
    fileSelectedHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    }

    backToHome = () => {
        this.setState({ goToHome: true })
    }

    render() {

        if (this.state.goToHome) {
            return <Redirect push to={`/home`} />
        }

    return ( 
    <Fragment>
        <div className="conteneur">
            <h1 className='title'>Profil de {this.state.username}</h1>
            <h3>Age</h3>
            <input type="text" value={this.state.age} placeholder="33" onChange={this.handleAge} />
            <h3>Service</h3>
            <input type="text" value={this.state.department} placeholder="RH" onChange={this.handleDepartment} />
            <h3>Photo de profil</h3>
            <input type="file" onChange={this.fileSelectedHandler}/>
            <button onClick={this.confirmProfil}>Valider son profil</button>
            <button onClick={this.backToHome}>Retour au fil d'actualité</button>
        </div>
    </Fragment>
    )
  }
}


export default UpdateProfil;


