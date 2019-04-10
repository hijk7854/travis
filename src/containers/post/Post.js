import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import * as postActions from 'store/modules/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import shouldCancel from 'lib/shouldCancel';
import { Helmet } from 'react-helmet';

class Post extends Component {
  initialize = async () => {
    if(shouldCancel()) return;
    const { PostActions, id } = this.props;
    try {
      await PostActions.getPost(id);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { loading, post } = this.props;

    if(loading) return null; // 로딩 중일 때는 아무것도 보여 주지 않음

    const { title, content, publishedDate, tags } = post.toJS();
    return (
      <div>
        { content && (
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={(content).slice(0, 200)}/>
          </Helmet>)
        }
        <PostInfo title={title} publishedDate={publishedDate} tags={tags}/>
        <PostBody content={content}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    post: state.post.get('post'),
    loading: state.pender.pending['post/GET_POST'] // 로딩 상태
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(Post);