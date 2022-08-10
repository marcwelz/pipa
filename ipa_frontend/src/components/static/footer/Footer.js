import './style.css';
import React from "react";
import '@axa-ch/text';
import '@axa-ch/footer-small';

function Footer() {
    return (
        <footer>
            <axa-footer-small>
                <a
                    slot="language-item"
                    href="https://axa.ch/de/privatkunden.html"
                >
                    DE
                </a>
                <a slot="language-item" href="https://axa.ch/fr/particuliers.html">
                    FR
                </a>
                <a slot="language-item" href="https://axa.ch/it/clienti-privati.html">
                    IT
                </a>
                <a slot="language-item" href="https://axa.ch/en/private-customers.html" className="m-footer-small__link--active">
                    EN
                </a>
                <a
                    slot="disclaimer-item"
                    href="https://axa.ch/en/information/terms-of-use.html"
                >
                    Terms of use
                </a>
                <a
                    slot="disclaimer-item"
                    href="https://axa.ch/en/information/data-protection.html"
                >
                    Data protection
                </a>
                <span slot="copyright">&copy; 2022 AXA Insurance Ltd.</span>
            </axa-footer-small>
        </footer>
    );
}

export default Footer;