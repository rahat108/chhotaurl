import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import Redirect from './components/Redirect';
import './sty.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class App extends Component {

    state = {
        url: '',
        link: '',
        copied: false,
    };

    handleChange = (e) => {
      this.setState({
          url: e.target.value
      })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const validURL = validator.isURL(this.state.url, {
            require_protocol: true
        });
        if (!validURL) {
            alert('Please ensure the url is correct and includes the http(s) protocol.');
        } else{
            console.log('URL is: ', this.state.url);
            // Post values
            axios.post('http://localhost:5000/api/shorten', {
                url: this.state.url
            })
                .then(res => {
                    this.setState({
                        link: `https://localhost:5000/${res.data.hash}`
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

  render() {
    return (
        <Router>
          <div className="container">
              <Route path="/" exact render={() => (
                  <div className="body-wrap">
                      <header>
                          <h1>Chhota<span className="highlight">URL</span></h1>
                   
                      </header>
                      <main>
                          <form onSubmit={this.handleSubmit}>
                              <fieldset>
                                  <input type="text" name="url" placeholder="Enter URL including the http(s) protocol" onChange={this.handleChange}/>
                                  <input type="submit" value="shorten"/>
                              </fieldset>
                              <br />
                              <fieldset className={this.state.link !== '' ? 'display-result' : 'hide-result'}>
                                  <span id="result">{ this.state.link }</span>
                                  <CopyToClipboard text={this.state.link}
          onCopy={() => this.setState({copied: true})}>
          <button id="copy"></button>
        </CopyToClipboard>
                              </fieldset>
                          </form>
                      </main>
                  </div>
              )} />
              <Route path="/:hash" component={Redirect} exact />
          </div>
        </Router>
    );
  }
}

export default App;

