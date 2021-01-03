import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { loadPosts, addPost } from '../../store/actions/post'

const Posts = ({ loadPosts, addPost, posts: { posts, loading } }) => {

  const [inputText, setInputText] = useState('')

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const changeHandler = event => {
    setInputText(event.target.value)
  }

  const submitPostHandler = (event) => {
    event.preventDefault();
    addPost(inputText)
  }

  let displayPosts
  if (!loading) displayPosts = posts
  !loading && console.log(displayPosts)

  return <div className='container'>
    <h1 className='x-large primary-color'>Posts</h1>
    <p className='medium'><i className="fas fa-user"></i>Welcome to the community !</p>

    {/* Form for making post */}
    <p className='alert alert-primary my-bottom-1'><strong>Say Something</strong></p>
    <textarea style={{width: '100%'}} rows='6' placeholder='Create A Post' onChange={changeHandler.bind(this)} />
    <button className='btn btn-primary' onClick={submitPostHandler.bind(this)}>Submit</button>

  </div>
}

const mapStateToProps = state => ({
  posts: state.post
})

export default connect(mapStateToProps, { loadPosts, addPost })(Posts)