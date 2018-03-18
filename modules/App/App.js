import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { FormattedMessage } from 'react-intl';

import { switchLanguage } from '../Intl/IntlActions'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export class App extends Component {
  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    const rtl = this.props.intl && this.props.intl.locale === 'he' ? styles.rtl : '';
    return (
      <div>
        {/* {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />} */}
        <div className={rtl}>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
          // toggleAddPost={toggleAddPostSection}
          />
          {console.log(this.props)}
          <div className="container">
            {this.props.children}
          </div>
          <Footer />
          <script rel="text/javascript" src="/_next/-/manifest.js" ></script>
          <script rel="text/javascript" src="/_next/commons.js" ></script>
          <script rel="text/javascript" src="/_next/main.js" ></script>
          <script rel="text/javascript" src="/_next/-/index.js" ></script>
        </div>
      </div >
    );
  }
}

App.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App)