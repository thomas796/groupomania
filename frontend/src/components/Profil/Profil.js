import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';
import './Profil.css';
import { connect } from 'react-redux'

class Profil extends Component {

    state = {
        id: 0,
        username: 'anonyme',
        age: '',
        department: '',
        selectedFile: null,
        goToHome: false
    }

    componentDidMount () {
        const { user } = this.props;
        this.setState({ username: user.username })
        this.setState({ id: user.id })
        this.setState({ age: user.age })
        this.setState({ department: user.department })
    }

    confirmProfil = () => {

        Axios.put('http://localhost:3001/updateProfil/', {
            id: this.state.id,
            age: this.state.age,
            department: this.state.department
        }).then(() => {

            const user = {
                age: this.state.age,
                department: this.state.department
            }
    
            this.props.addprofildata(user)
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
        console.log(e.target.files[0])
        this.setState({ selectedFile: e.target.files[0] })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
        Axios.post('http://localhost:3001/image')
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
            <button onClick={this.fileUploadHandler}>Upload</button>
            <button onClick={this.confirmProfil}>Valider son profil</button>
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
        addprofildata: (newObject) => {
            dispatch({ type: "PROFIL", payload: newObject })
        }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Profil);


