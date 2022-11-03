import React from "react";
import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModal";

const Home = () => {

    const [showModal, setShowModal] = useState(false);
    
    const [isSignUp, setIsSignUp] = useState(true);
    
    const authToken = false;

    const handleClick = () => {
        console.log("clicked");
        setShowModal(true);
        setIsSignUp(true)
    }

    return (
        <>
            <div className="overlay">
                <Nav  minimal={false} setIsSignUp={setIsSignUp} authToken={authToken} setShowModal={setShowModal}/>
                <div className="home">
                    <h1>Swipe Right@</h1>
                    <button className={"primary-button"} onClick={handleClick}>
                        {authToken ? 'Signin' : 'Create Account'}
                    </button>

                    {
                        showModal && (<AuthModal isSignUp={isSignUp} setShowModal={setShowModal}/>)
                    }
                </div>
            </div>
        </>
    );
}

export default Home;