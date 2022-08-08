import './style.css';
import React from "react";
import logo_axa from '../images/logo_axa.png';
import '@axa-ch/heading';

function Header() {
    return (
        <header className="pipa-header">
            <img src={logo_axa} width={56}></img>
            <div className='pipa-header__title'>
                <axa-heading rank="4">Translation Dictionary</axa-heading>
            </div>
        </header>
    );
}

export default Header;