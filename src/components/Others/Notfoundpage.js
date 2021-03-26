import React from "react";
import { Link } from "react-router-dom";
export default function Notfoundpage() {
  return (
    <div>
      <h1> ERROR 404 : Page Not Found</h1>
      <p>Sorry, there is nothing to see here.</p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
}
