import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NewLogo from '../assets/images/exercise_pedia.png'


const New_navbar = () => {
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
          <li className="nav-item active">
            <a className="nav-link" href="/exercisespage">Exercises </a>
          </li>
        </ul>
        <ul className="end-container my-2 my-lg-0 navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/login">Login </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/signup">SignUp </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default New_navbar