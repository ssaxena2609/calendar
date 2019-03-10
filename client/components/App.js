import React from 'react';
import './App.css';

import PropTypes from 'prop-types'
//import style from '../../public/css/style.css';
import { connect } from 'react-redux';


class App extends React.Component {




  render() {

    return (
      <div >

        {React.cloneElement(this.props.children, { dispatch: this.props.dispatch })}
      </div>
    );
  }
}


App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null)(App);
