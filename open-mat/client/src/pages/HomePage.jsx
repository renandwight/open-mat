import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to Open Mat</h1>
        <p>Find gyms and open mats for jiu jitsu near you</p>
        <div className="features-section">
          <Button as={Link} to="/gyms" variant="outline-primary">
            Search for Gyms
          </Button>
        </div>
      </div>

      <div className="features-section">
        <h2>What You Can Do</h2>
        <div className="features">
          <div className="feature">
            <h3>Browse Gyms</h3>
            <p>Find gyms near you by zip code or search by name</p>
          </div>
          <div className="feature">
            <h3>Find Open Mats</h3>
            <p>Discover open mat events at gyms in your area</p>
          </div>
          <div className="feature">
            <h3>Learn Techniques</h3>
            <p>Visit the Dojo to learn jiu jitsu techniques</p>
          </div>
        </div>
      </div>

      <div className="register-section">
        <h2>Create An Account</h2>
        <p>Register to save your favorite gyms and events</p>
        <Button as={Link} to="/loginsignup" variant="outline-primary">
          Login / Sign-up
        </Button>
      </div>
    </div>
  );
}