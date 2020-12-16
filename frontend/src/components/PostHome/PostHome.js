import React, { Component } from 'react'
import './PostHome.css';
import Axios from 'axios'
import PostComment from './PostComment';
import Anonyme from '../../img/anonyme.png'
import DefaultPost from '../../img/defaultPost.png'
import grayThumb from '../../img/thumb_gray.png'
import blueThumb from '../../img/thumb_blue.png'
import redThumb from '../../img/thumb_red.png'
import Trash from '../../img/trash.png'



class PostHome extends Component {

  state = {
    description: '',
    selectedFile: 'null',
    postArray: [],
    showCommentIdPost: -1,
    comments: [],
    inputCommentValue: ''
}

componentDidMount () {
   this.updatePost()
}

updatePost () {

  let getTokenStringify = localStorage.getItem("token");
  let getToken = JSON.parse(getTokenStringify);

  Axios.get(`${process.env.REACT_APP_API_URL}/getPost`, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {
    console.log(response)

      let postArray = response.data.reverse()
      this.setState({ postArray })

  })
}

addPost = () => {

  let getTokenStringify = localStorage.getItem("token");
  let getToken = JSON.parse(getTokenStringify);

  var formData = new FormData();
  if (this.state.selectedFile !== null) {
    formData.append("image", this.state.selectedFile);
  }
    formData.append("description", this.state.description);



  Axios.post(`${process.env.REACT_APP_API_URL}/addPost/${getToken[0]}`, formData, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then(() => {
          this.updatePost()
          this.setState({ 
            description: '',
            selectedFile: null
          })
    })

}


fileSelectedHandler = (e) => {
  this.setState({ selectedFile: e.target.files[0] })
}

handleDescription = (e) => {
  const description = e.target.value
  this.setState({ description })
}

handleShowComment = (postId) => {

    if (this.state.showCommentIdPost === -1) {
      this.setState({ showCommentIdPost: postId })
      this.getComment(postId)
    } else {
      if (this.state.showCommentIdPost === postId) {
        this.setState({ showCommentIdPost: -1 })
      } else {
        this.setState({ showCommentIdPost: postId })
        this.getComment(postId)
      }
    }
}

getComment = (postId) => {

    this.setState({ comments: [] })

    let getTokenStringify = localStorage.getItem("token");
    let getToken = JSON.parse(getTokenStringify);

    Axios.get(`${process.env.REACT_APP_API_URL}/getComments/${postId}`, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {
        this.setState({ comments: response.data })
    })

}

addCommentChange = (e) => {
  this.setState({ inputCommentValue: e.target.value })
}

addCommentPress = (e, idposts, userProfil) => {

  if (e.key === 'Enter') {

      let getTokenStringify = localStorage.getItem("token");
      let getToken = JSON.parse(getTokenStringify);

      Axios.post(`${process.env.REACT_APP_API_URL}/addComment/${getToken[0]}`, {
          postId: idposts+'',
          comment: e.target.value+''
      }, { headers: {"Authorization" : `Bearer ${getToken[1]}`} }).then((response) => {
          
          let comments = this.state.comments
          comments.push({
            comment: e.target.value+'',
            idComment: 0,
            postId: idposts,
            userId: getToken[0],
            username: userProfil.username,
            profilimage: userProfil.image_url
          })
          this.setState({ comments: comments})
          this.setState({ inputCommentValue: ''}) 
      })
  } 
}

addDefaultSrc(ev){
  ev.target.src = Anonyme
}

defaultPostImageSrc(ev){
  ev.target.src = DefaultPost
}

deletePost = (post) => {

  let getTokenStringify = localStorage.getItem("token");
  let getToken = JSON.parse(getTokenStringify);

  console.log(getToken[0] + ' ' + post)

  Axios.delete(`${process.env.REACT_APP_API_URL}/deletePost/${getToken[0]}/${post}`,
  { headers: {"Authorization" : `Bearer ${getToken[1]}`}}).then((response) => {
     console.log(response)
  })


}

 render() {

    const user = this.props.userProfil

    let addPost = []
    
    this.state.postArray.forEach((post, postIndex) => {
      
      const comments = []
      if(post.idposts === this.state.showCommentIdPost) {
        comments.push(
          <PostComment
            key={'comment' + postIndex}
            comments={this.state.comments}
            idposts={post.idposts}
            addCommentChange={this.addCommentChange}
            addCommentPress={this.addCommentPress}
            inputCommentValue={this.state.inputCommentValue}
            userProfil={this.props.userProfil}
          >
          </PostComment>
        )
      }

      let heightDiv;
      if (post.urlimage.length < 1) {
        heightDiv = {
          height: '120px'
        }
      }

      let administratorBtn = []
      if (user.isadministrator) {
        administratorBtn.push(<img key={'trash'+post.idposts} onClick={() => this.deletePost(post.idposts)} className='trash' src={Trash} alt="trash" />)
      }

      addPost.push(
        <div key={'post' + post.idposts}>
          <div className="postDiv" style={heightDiv}>
              <div className='userPostContainer'>
                  <img className='imageUserPost' onError={this.addDefaultSrc} src={post.profilimage} alt={'userProfil'}/>
                  <h3 className='usernamePost'>
                      publication de {post.username}
                  </h3>
                  {administratorBtn}
              </div>
            <p className="descriptionPost">{post.description}</p>
            <img onError={this.defaultPostImageSrc} className="imagePost" src={post.urlimage} alt={`post ${postIndex}`} />
            <div id="thumbContainer">
                <img className="thumb_up" src={grayThumb} alt='thumb_up' />
                <img className="thumb_down" src={grayThumb} alt='thumb_down' />
            </div>
            <button 
              onClick={() => this.handleShowComment(post.idposts)} 
              className="showAddCommentBtn">
                ...
            </button>
          </div>
          {comments}
        </div>)

    });

    return (

      <div id="postView">
        {addPost}
        <div id="lastDiv"></div>
        <div id="homeBottomBar">
          <div id="inputPost">
            <input 
              type="text" 
              id="description" 
              value={this.state.description} 
              placeholder="Description" 
              onChange={this.handleDescription}
            />
            <input type="file" onChange={this.fileSelectedHandler}/>
          </div>
            <button id="addPostBtn" onClick={this.addPost}>+</button>
        </div>
      </div>
    )
  }
}

export default PostHome;
