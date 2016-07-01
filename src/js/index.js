import es6Promise from 'es6-promise';
es6Promise.polyfill();
import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pt from 'react-intl/locale-data/pt';
addLocaleData(en);
addLocaleData(pt);

import { getCurrentLocale, getLocaleData } from 'grommet/utils/Locale';

import routes from './routes';

const locale = getCurrentLocale();
let messages;
try {
  messages = require(`../messages/${locale}`);
} catch (e) {
  messages = require('../messages/en-US');
}

const localeData = getLocaleData(messages, locale);
const todoAppBody = (
  <IntlProvider locale={localeData.locale} messages={localeData.messages}>
    <Router onUpdate={() => document.getElementById('content').focus()}
      history={browserHistory} routes={routes} />
  </IntlProvider>
);

let element = document.getElementById('content');
ReactDOM.render(todoAppBody, element);

document.body.classList.remove('loading');
