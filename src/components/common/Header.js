import React, { Component } from 'react';
import logo from '../../logo.svg';

class Header extends Component {
    render() {
        return (
			<header className="App-header">
                <div className="logo-and-title">
                    <a href="/">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h5>Bulletin</h5>
                    </a>
                </div>
            </header>
        );
    }
}

export default Header;

