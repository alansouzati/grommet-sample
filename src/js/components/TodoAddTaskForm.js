import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Intl from 'grommet/utils/Intl';

import { browserHistory } from 'react-router';
import { addTask } from '../store';
import { setDocumentTitle } from '../utils';

export default class TodoAddTaskForm extends Component {
  constructor () {
    super();

    this._onSubmit = this._onSubmit.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onLabelChange = this._onLabelChange.bind(this);
    this._onStatusChange = this._onStatusChange.bind(this);

    this.state = {
      label: undefined,
      status: undefined
    };
  }

  componentDidMount () {
    setDocumentTitle(Intl.getMessage(this.context.intl, 'Add Task'));
  }

  _onCancel (event) {
    event.preventDefault();
    browserHistory.push('/');
  }

  _onSubmit (event) {
    event.preventDefault();
    if (this.state.label) {
      addTask({
        label: this.state.label,
        status: this.state.status || 'ok'
      }).then(() => browserHistory.push('/'));
    }
  }

  _onLabelChange (event) {
    this.setState({ label: event.target.value });
  }

  _onStatusChange (event) {
    this.setState({ status: event.target.value });
  }

  render () {
    return (
      <Box pad={{horizontal: 'medium'}}>
        <Header pad={{vertical: 'medium'}}>
          <Heading>Add Task</Heading>
        </Header>
        <Form onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label="Task" htmlFor="labelId">
                <input type="text" name="label" id="labelId"
                  onChange={this._onLabelChange} />
              </FormField>
              <FormField label="Status" htmlFor="statusId">
                <select name="status" id="statusId"
                  onChange={this._onStatusChange}>
                  <option value="ok">Done</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Past Due</option>
                </select>
              </FormField>
            </fieldset>
          </FormFields>
        </Form>
        <Footer pad={{vertical: 'large'}}>
          <Box>
            <Button primary={true} type="submit"
              label="Add" onClick={this._onSubmit} />
          </Box>
          <Box pad={{horizontal: 'small'}}>
            <Button href='/' label="Cancel" onClick={this._onCancel} />
          </Box>
        </Footer>
      </Box>
    );
  }
}

TodoAddTaskForm.contextTypes = {
  intl: PropTypes.object.isRequired
};
