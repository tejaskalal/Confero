import "../App.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="landingPageContainer">
        <nav>
          <div className="navHeader">
            <h2>Confero</h2>
          </div>
          <div className="navList">
            <p>Join as guest</p>
            <p>Register</p>
            <div role="button">
              <p>Login</p>
            </div>
          </div>
        </nav>
        <div className="landingMainContainer">
          <div>
            <h1 style={{ color: "#FF9839" }}>Be there, from anywhere.</h1>
            <p>Cover all your meetings in one place</p>
            <div role="button">
              <Link to="/auth">Get Started</Link>
            </div>
          </div>
          <div>
            <img src="public/mobile.png" alt="mobile_img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
