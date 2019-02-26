import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'

class PostDetail extends Component{

	constructor(props){
		// Debo iniciar siempre el estado de un componente para que 
		// No me de error al momemento de llamar las variables de estado
		super(props)

		this.state = {
			slug: null,
			post: null,
			doneLoading: false,
		}
	}

	loadPost(slug){
	  let endpoint = `/api/posts/${slug}/`
	  let thisComp = this
	  let lookupOptions = {
	    method: "GET",
	    headers: {
	      'Content-Type': 'application/json'
	    }
	  }

	  const csrfToken = cookie.load("csrftoken")

	  if (csrfToken !== undefined){
	  		lookupOptions['credentials'] = 'include'
	  		lookupOptions['headers']['X-CSRFToken'] = csrfToken
	    }

	  fetch(endpoint, lookupOptions)
	  .then(function(response){
	  	// Aqui es donde se manejan los errores de status http

	  	if (response.status == 404){
	  		console.log("Page not Found")
	  	}

	    return response.json()
	  }).then(function(responseData){
	  	if (responseData.detail){
			thisComp.setState({
			  doneLoading: true,
			  post:null

			});
	  	} else {
	  		thisComp.setState({
		      doneLoading: true,
		      post:responseData

	    	})
	  	}
	    
	  }).catch(function(error){
	    console.log("error", error)
	  })
	}
	componentDidMount(){
		this.setState({
			slug: null,
			post: null
		})

		if (this.props.match){
			
			// Match esta asociado con el parametro del router, si encuentra algo
			// entonces extrae el slug del articulo
			const {slug} = this.props.match.params

			this.setState({
				slug: slug,
				doneLoading: false
			})
			this.loadPost(slug)
		}
	}
	render(){

		const {doneLoading} = this.state
		const {post} = this.state

		return (
			<p>{(doneLoading === true) ? <div>

				{post === null ? "Not found":
				<div>

					<h1>{post.title}</h1>
					{post.slug}

					<p className='lead'><Link maintainScrollPosition={false} to={{
						pathname: `/posts`,
						state: {fromDashboard:false}
					}}>Posts</Link></p>

					{post.owner === true ? <div>Update Post</div> : ""}
				</div>
				}
				</div> : "Loading..."} </p>
				
		)
	}
}

export default PostDetail