import React from 'react';
import "../styles/loadingScreen.css"
import Spinner from 'react-bootstrap/Spinner'

const LoadingScreen = () => {
    return (
        <div className="overlay">
            <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default LoadingScreen;