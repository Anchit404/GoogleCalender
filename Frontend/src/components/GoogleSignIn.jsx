import React from 'react';
import axios from 'axios';

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/google/login');
      window.location.href = response.data.url; // Redirect to Google OAuth2
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className="google-signin-container">
      <h1>Google Calendar Integration</h1>
      <button className="google-signin-button" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
