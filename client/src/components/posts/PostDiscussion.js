import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Post from './Post'
import DisussionForm from './DiscussionForm'
import Spinner from '../UIElements/Spinner'
import { loadPost } from '../../store/actions'

const PostDiscussion = ({ loadPost, posts: { post, loading, error }, userId, match, history }) => {

    useEffect(() => {
        loadPost(match.params.id)
    }, [])

    !loading && post && console.log(post.comments)

    const displayComments = (
        <Fragment>
            <div class="comments">
                <div class="post bg-white p-1 my-1">
                    <div>
                        <a href="profile.html">
                            <img
                                class="round-img"
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                alt=""
                            />
                            <h4>John Doe</h4>
                        </a>
                    </div>
                    <div>
                        <p class="my-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                            possimus corporis sunt necessitatibus! Minus nesciunt soluta
                            suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                            dolor? Illo perferendis eveniet cum cupiditate aliquam?
                        </p>
                        <p class="post-date">
                            Posted on 04/16/2019
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )

    return loading ? <Spinner /> : (!post ? <h2 className='container'>{error}</h2> : <Fragment>
        <div className='container'>
            <button className='btn btn-large' onClick={() => history.goBack()}>Back to Posts</button>
            <Post post={post} userId={userId} showActions={false} />

            <DisussionForm postId={post._id} />

            {displayComments}
        </div>
    </Fragment>)
}

const mapStateToProps = state => ({
    posts: state.post,
    userId: state.auth.user._id
})

export default connect(mapStateToProps, { loadPost })(withRouter(PostDiscussion))