import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div>
      <h1>Error!</h1>
      <Link to="/">
        <button>Return to Home</button>
      </Link>
    </div>
  );
}