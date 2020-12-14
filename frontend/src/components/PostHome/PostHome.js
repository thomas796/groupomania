import React, { Component } from 'react'
import './PostHome.css';
import Axios from 'axios'

class PostHome extends Component {

  state = {
    description: '',
    selectedFile: 'null',
    postArray: [],
    currentPostIndex: -1,
    comment: [],
    inputCommentValue: ''
}

componentDidMount () {
   this.updatePost()
}

updatePost () {

  let getTokenStringify = localStorage.getItem("token");
  let getToken = JSON.parse(getTokenStringify);

  Axios.get(`${process.env.REACT_APP_API_URL}/getPost`, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {

      let postArray = response.data.reverse()
      this.setState({ postArray })

  })
}



addPost = () => {

  let getTokenStringify = localStorage.getItem("token");
  let getToken = JSON.parse(getTokenStringify);

  var formData = new FormData();
  formData.append("image", this.state.selectedFile);
  formData.append("description", this.state.description);

  Axios.post(`${process.env.REACT_APP_API_URL}/addPost/${getToken[0]}`, formData, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then(() => {
          this.updatePost()
    })

}


fileSelectedHandler = (e) => {
  this.setState({ selectedFile: e.target.files[0] })
}

handleDescription = (e) => {
  const description = e.target.value
  this.setState({ description })
}



showComment = (index) => {

  if (this.state.currentPostIndex === index) {
    this.setState({ currentPostIndex: -1 })
  } else {
    this.setState({ currentPostIndex: index })
    this.getComment()
  }

}

getComment = () => {

  console.log('user data et post data')

  let getTokenStringify = localStorage.getItem("token");
  let getToken = JSON.parse(getTokenStringify);

  Axios.get(`${process.env.REACT_APP_API_URL}/getComments/${this.state.currentPostIndex}`, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {
      console.log(response)
  })
}


addCommentChange = (e) => {
    this.setState({ inputCommentValue: e.target.value })
}

addCommentPress = (e, postId) => {
    if (e.key === 'Enter') {

      let getTokenStringify = localStorage.getItem("token");
      let getToken = JSON.parse(getTokenStringify);

      Axios.post(`${process.env.REACT_APP_API_URL}/addComment/${getToken[0]}`, {
        postId: postId+'',
        comment: e.target.value+''
      }, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {
        
        this.getComment()
        // let comment = this.state.comment
        // comment.push([getToken[0], postId, e.target.value])
        // this.setState({ comment })
        // this.setState({ inputCommentValue: '' })
      })
    } 
}

 render() {

    let test = []
        
    this.state.postArray.forEach((post, postIndex) => {
      
      let comment = []
      if (this.state.currentPostIndex === postIndex) {

        let lastComment = []
        this.state.comment.forEach((theComment, commentIndex) => {
          if (this.state.currentPostIndex === theComment[1]) {
            lastComment.push(
              <p 
                key={'theComment'+commentIndex} 
                className='theComment'
              >
                {theComment[2]}
              </p>
            )
          }
        })
              
        comment.push(
          <div key={'comment'+postIndex}>
              {lastComment}
              <input 
                type="text" 
                value={this.state.inputCommentValue} 
                className="addCommentInput" 
                placeholder="ajouter un commentaire..." 
                onChange={(e) => this.addCommentChange(e)}
                onKeyPress={(e) => this.addCommentPress(e, postIndex)}
              />
          </div>)
      }

      test.push(
        <div key={'post' + postIndex}>
        <div className="postDiv">
          <h1 className="titlePost">{post.description}</h1>
          <img className="imagePost" src={post.urlimage} alt={`post ${postIndex}`} />
          <button 
            onClick={() => this.showComment(postIndex)} 
            className="showAddCommentBtn">
              ...
          </button>
        </div>
        {comment}
        </div>)
    });

    return (
          <div id="postView">
              {test}
              <div id="lastDiv"></div>
          <div id="homeBottomBar">
            <div id="inputPost">
              <input type="text" id="description" value={this.state.description} placeholder="Description" onChange={this.handleDescription} />
              <input type="file" onChange={this.fileSelectedHandler}/>
            </div>
              <button id="addPostBtn" onClick={this.addPost}>+</button>
          </div>
        </div>
    )
  }
}

export default PostHome;
