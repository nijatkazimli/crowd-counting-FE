import React from "react";
import { NavLink } from "react-router-dom";

const styles = {
  container: {
    padding: "50px",
  },
  heading: {
    fontSize: "72px",
    fontFamily: "Montserrat",
    margin: "0",
  },
  message: {
    fontSize: "24px",
    fontFamily: "Montserrat",
    color: "#555",
  },
  link: {
    fontSize: "18px",
    color: "#007BFF",
    fontFamily: "Montserrat",
  },
};

function ErrorPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>
        Oops! The page you&#39;re looking for doesn&#39;t exist.
      </p>
      <NavLink to="/" style={styles.link}>
        Go back to Count
      </NavLink>
    </div>
  );
}

export default ErrorPage;
