import React from "react";
import whiteLogo from '../images/tinder_logo_white.png'
import colorLogo from '../images/color-logo-tinder.png'

const Nav = ({minimal , authToken, setShowModal, setIsSignUp}) => {

    const handleClick = () => {
        setIsSignUp(false);
        setShowModal(true);
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={ minimal ? colorLogo : whiteLogo} alt="" />
            </div>

            {!authToken && <button onClick={handleClick} className="nav-button">Log in</button>}
        </nav>
    );
}

export default Nav;