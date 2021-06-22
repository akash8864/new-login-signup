import React from 'react';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated }) => {
  const logedinNow = (
    <>
      <h3>You enter in our app</h3>
    </>
  );

  const notLogedin = (
    <>
      <h3>thank you for visiting</h3>
    </>
  );

  return (
    <div>
      <h2>Welcome to Our Login-Signup App</h2>
      <br />
      <br />
      <hr />
      <div>
        <span>Account Status:</span>
        <>{isAuthenticated ? logedinNow : notLogedin}</>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Home);
