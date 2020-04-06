import React, { Component } from 'react';
import Router from './Router';
import './App.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

class App extends Component {
    render() {
        return (
			<div className="App">
				<Header />

				<Router />

				<Footer />
			</div>
        );
    }
}

export default App;

