import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';

export default class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Header direction="row" justify="between" large={true}
          pad={{horizontal: 'medium'}}>
          <Title>
            <FormattedMessage id='Todo App' defaultMessage='Todo App' />
          </Title>
        </Header>
        {this.props.children}
        <Footer primary={true} appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>
            <FormattedMessage id='Build your ideas with'
              defaultMessage='Build your ideas with' /> <a href="http://grommet.io" target="_blank">Grommet</a>!
          </p>
        </Footer>
      </App>
    );
  }
};
