import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './store';
import {BrowserRouter as Router} from 'react-router-dom';

const UserPage = (props) => {
  const {handleClick} = props
  const {user} = props;

  if (Object.keys(user).length > 0){
    return (
      <div className='h100 w100 flex column align-items-center justify-center'>
        <div className='flex'>
          <img className='rounded mr1' src={user.imageUrl}/>
          <h1>Welcome back {user.email}!</h1>
        </div>
        <div>
          <button className='btn bg-red white p1 rounded' onClick={handleClick}>Logout</button>
        </div>
      </div>
    )
  } else {
    return (<Redirect to="/" />);
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick () {
      dispatch(logout())
      .then(() => {Router.push('/')})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
