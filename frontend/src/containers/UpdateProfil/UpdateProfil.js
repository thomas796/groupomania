import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';
import './UpdateProfil.css';

class UpdateProfil extends Component {

    state = {
        username: 'anonyme',
        age: '',
        department: '',
        selectedFile: null,
        image_url: '',
        goToHome: false,
        goToConnexion: false,
        errorMessage: ''
    }

    componentDidMount () {

        let getTokenStringify = localStorage.getItem("token");
        let getToken = JSON.parse(getTokenStringify);
    
        Axios.get(`${process.env.REACT_APP_API_URL}/getProfil/${getToken[0]}`, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {
                const res = response.data[0]
                this.setState({ 
                    username: res.username,
                    age: res.age,
                    department: res.department,
                    image_url: res.profilimage
                })
            })
    }


    confirmProfil = () => {
        let getTokenStringify = localStorage.getItem("token");
        let getToken = JSON.parse(getTokenStringify);

        var formData = new FormData();
        formData.append("image", this.state.selectedFile);
        formData.append("age", this.state.age);
        formData.append("department", this.state.department);

        Axios.put(`${process.env.REACT_APP_API_URL}/updateProfil/${getToken[0]}`, formData, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((err, result) => {

            if (err.data.length > 0) {
                this.setState({ errorMessage: err.data })
            } else {
                this.setState({ goToHome: true })
            }

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

    deleteProfil = () => {

        if (window.confirm('Êtes-vous sûr de vouloir supprimer votre profil ? Sa suppression sera définitive')) {
            console.log('profil supprimer')

            let getTokenStringify = localStorage.getItem("token");
            let getToken = JSON.parse(getTokenStringify);

            var formData = new FormData();
            formData.append("image_url", this.state.image_url);

            Axios.delete(`${process.env.REACT_APP_API_URL}/deleteProfil/${getToken[0]}`,
             { headers: {"Authorization" : `Bearer ${getToken[1]}`}}).then((response) => {
                console.log(response)

                this.setState({ goToConnexion: true })


            })

        } 

    }

    render() {

        if (this.state.goToHome) {
            return <Redirect push to={`/home`} />
        }
        if (this.state.goToConnexion) {
            return <Redirect push to={`/`} />
        }

    return ( 
    <Fragment>
        <div className="conteneur">
            <button id='backToHome' onClick={this.backToHome}></button>
            <h2 className='title'>Profil de {this.state.username}</h2>
            <p className="inputProfil">Age :</p>
            <input type="text" className="inputProfil" value={this.state.age} placeholder="33" onChange={this.handleAge} />
            <p className="inputProfil">Service :</p>
            <input className="inputProfil" type="text" value={this.state.department} placeholder="RH" onChange={this.handleDepartment} />
            <p lassName="inputProfil">Photo de profil :</p>
            <input type="file" onChange={this.fileSelectedHandler}/>
            <button onClick={this.confirmProfil}>Valider son profil</button>
            <p id='errorMessageProfil'>{this.state.errorMessage}</p>
            <button onClick={this.deleteProfil}>Supprimer son profil</button>
        </div>
    </Fragment>
    )
  }
}


export default UpdateProfil;


