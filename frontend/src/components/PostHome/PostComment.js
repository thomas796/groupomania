import React, { Component } from 'react'
import './PostComment.css';
import Anonyme from '../../img/anonyme.png'

class PostComment extends Component {


    addDefaultSrc(ev){
        ev.target.src = Anonyme
      }

    render() {

        const props = this.props

        let comments = []
        props.comments.forEach((comment, commentIndex) => {

            comments.push(
                <div key={'theComment'+commentIndex}>
                    <div className='userCommentContainer'>
                        <img className='imageUserComment' onError={this.addDefaultSrc} src={comment.profilimage} alt={'userProfil'}/>
                        <h3 className='usernameComment'>
                            {comment.username}
                        </h3>
                    </div>
                    <p className='theComment'>
                        {comment.comment}
                    </p>
                </div>
            )
        })

        return (
            <div>
                {comments}
                <input
                    type="text"
                    value={props.inputCommentValue}
                    className="addCommentInput"
                    placeholder="ajouter un commentaire..."
                    onChange={(e) => props.addCommentChange(e)}
                    onKeyPress={(e) => props.addCommentPress(e, props.idposts, props.userProfil)}
                />
            </div>
        )
    }

}


export default PostComment;