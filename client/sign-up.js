import React from 'react';
import {connect} from 'react-redux';
import {signup} from './store';

const SignUp = (props) => {
  const {handleSubmit} = props;
  return (
    <div className='h100 w100 flex column align-items-center justify-center'>
    <h1>Let's Sign Up!</h1>
    <div className='flex w50'>
      <img src='/loggin.png' />
      <form className='grow1' onSubmit={handleSubmit}>
        <div className='flex column'>
          <div className='flex column m1'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' className='input' />
          </div>
          <div className='flex column m1'>
            <label htmlFor='email'>Password</label>
            <input type='password' name='password' className='input' />
          </div>
          <div className='flex column m1'>
            <label htmlFor='imageUrl'>Link to Image</label>
            <input type='text' name='imageUrl' className='input' />
          </div>
          <div className='m1'>
            <button type='submit' className='btn bg-blue white p1 rounded'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    handleSubmit: (event ) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      const imageUrl = event.target.imageUrl.value;
      const formData = { email, password, imageUrl };
      dispatch(signup(formData)).then(() => history.push('/home'));
    }
  }
}

export default connect(null, mapDispatchToProps)(SignUp);
