import React, { useState, useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NewLogo from '../assets/images/exercise_pedia.png'


const New_navbar = () => {

  const [isToken, setToken] = useState(true);
  useEffect(() => {
    allLocalValues();
  }, [])

  const allLocalValues = () => {

    const token = JSON.parse(localStorage.getItem('jwtoken'));
    if (token) {
      setToken(true);
    }
    if (!token) {
      setToken(false);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fitness-bar">
      {/* <a className="navbar-brand" href="#">Navbar</a> */}
      <div className="navbar-brand flip-box">
        <div className="flip-box-inner">
          <div className="flip-box-front">
            <img src={NewLogo} alt="Paris" style={{ width: '150px', height: '66px' }} />
          </div>
          <div className="flip-box-back">
            <img src={NewLogo} alt="logo" style={{
              width: '150px', height: '66px'
            }} />
          </div>
        </div>
      </div>
      <button className="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home </a>
          </li>
          {isToken ? <li className="nav-item active">
            <a className="nav-link" href="/exercisespage">Exercises </a>
          </li> : null}
          {isToken ? <li className="nav-item active">
            <a className="nav-link" href="/calculator/:name">Calculator </a>
          </li> : null}
        </ul>
        <ul className="end-container my-2 my-lg-0 navbar-nav mr-auto">
          {!isToken ? <li className="nav-item active">
            <a className="nav-link" href="/login">Login </a>
          </li> : null}
          {isToken ? <li className="nav-item active">
            <a className="nav-link" href="/logout">Logout </a>
          </li> : null}
          {!isToken ? <li className="nav-item active">
            <a className="nav-link" href="/signup">SignUp </a>
          </li> : null}
          {isToken ? <li className="nav-item active">
            <a className="nav-link" href="/userProfile">Profile</a>
          </li> : null}
        </ul>
      </div>
    </nav>
  )
}

export default New_navbar