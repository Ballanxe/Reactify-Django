import React, { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies'

import PostInline from './PostInline'
import PostCreate from './PostCreate'


class Posts extends Component {

  constructor(props){
    super(props)
    // To have event object by default and use event.preventDefault()
    this.togglePostListClass = this.togglePostListClass.bind(this)
    this.handleNewPost = this.handleNewPost.bind(this)
  }

  state = {
    posts: [],
    postListClass: "card",
  }
  loadPosts(){
    let endpoint = '/api/posts/'
    let thisComp = this
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
    .then(function(response){
      return response.json()
    }).then(function(responseData){
      console.log(responseData)
      thisComp.setState({
        posts:responseData
      })
    }).catch(function(error){
      console.log("error", error)
    })
  }

  handleNewPost(postItemData){
    console.log(postItemData)
    let currentPosts = this.state.posts
    currentPosts.push(postItemData)
    this.setState({
      posts: currentPosts
    })
  }

  togglePostListClass(event){
    event.preventDefault()
    let currentListClass = this.state.postListClass

    if (currentListClass === ""){
      this.setState({
        postListClass:"card",
      })
    } else{
      this.setState({
        postListClass:"",
      })
    }

  }


  componentDidMount(){
    this.setState({
      post:[],
      postListClass: "card",
    })
    this.loadPosts()
  }
 
  render() {
    const {posts} = this.state
    const {postListClass} = this.state
    const csrfToken = cookie.load("csrftoken")

    return (
      <div>
       <h1>Hello World</h1>
       <button onClick={this.togglePostListClass}>Toggle Class</button>
       {posts.length > 0 ? posts.map((postItem, index)=>{
          return (
            <PostInline post={postItem} elClass={postListClass}/>
          )
       }): <p>No posts found</p>}

       {( csrfToken !== undefined && csrfToken !== null) ? 
        <div className='my-5'>
          <PostCreate newPostItemCreated={this.handleNewPost}/>
        </div>
       : ""}

  
      </div>
    );
  }
}

export default Posts;
