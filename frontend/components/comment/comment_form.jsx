import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '', story_id: this.props.match.params.id, parent_id: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      });
    };
  }

  componentWillUnmount() {
    if (this.props.errors) {
      this.props.clearErrors(this.props.errors);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.props.currentUser) {
      return <Redirect to='/login' />;
    }
    const comment = this.state;
    this.props.createComment(comment);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li
            className='error'
            key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <label>Responses
        <div className='c-form-div'>
          <div>
            {this.renderErrors()}
            <form onSubmit={this.handleSubmit}>
              <textarea
                value={this.state.body}
                onChange={this.update('body')}
                />
              <br/>
              <input
                type='submit'
                value='Publish'
                />
            </form>
          </div>
        </div>
      </label>
    );
  }
}

export default withRouter(CommentForm);
