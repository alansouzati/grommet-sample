import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Meter from 'grommet/components/Meter';
import Table from 'grommet/components/Table';
import Section from 'grommet/components/Section';
import StatusIcon from 'grommet/components/icons/Status';
import CloseIcon from 'grommet/components/icons/base/Close';
import Intl from 'grommet/utils/Intl';

import { browserHistory } from 'react-router';
import { getTasks, deleteTask } from '../store';
import { setDocumentTitle } from '../utils';

function getLabel(label, count, colorIndex) {
  return {
    "label": label,
    "value": count,
    "colorIndex": colorIndex
  };
}

export default class TodoAppDashboard extends Component {

  constructor () {
    super();
    this._onRequestForAddTask = this._onRequestForAddTask.bind(this);
    this._onRequestForDeleteTask = this._onRequestForDeleteTask.bind(this);
    this.state = {
      tasks: []
    };
  }

  componentDidMount () {
    getTasks().then((tasks) => this.setState({ tasks: tasks }));
    setDocumentTitle();
  }

  _onRequestForAddTask (event) {
    event.preventDefault();
    browserHistory.push('/add');
  }

  _onRequestForDeleteTask (index) {
    let tasks = this.state.tasks;
    tasks.splice(index, 1);
    deleteTask(this.state.tasks[index]).then(() => this.setState({ tasks }));
  }

  render () {
    const tasksMap = {
      critical: 0,
      ok: 0,
      warning: 0
    };

    const items = this.state.tasks.map((task, index) => {

      tasksMap[task.status] += 1;

      return (
        <tr key={index}>
          <td width="10%" style={{'minWidth': '60px'}}>
            <StatusIcon value={task.status} small={true} />
          </td>
          <td>{task.label}</td>
          <td width="10%" style={{'minWidth': '100px'}}>
            <Button onClick={this._onRequestForDeleteTask.bind(this, index)}
              icon={<CloseIcon />} />
          </td>
        </tr>
      );
    });

    return (
      <Section primary={true}>
        <Tiles fill={true} flush={false}>
          <Tile align="center">
            <Meter series={[
              getLabel('Past Due', tasksMap.critical, "critical"),
              getLabel('Due Soon', tasksMap.warning, "warning"),
              getLabel('Done', tasksMap.ok, "ok")
            ]} type="circle" units={
              Intl.getMessage(this.context.intl, 'Tasks')
            } />
          </Tile>
          <Tile align='start'>
            <Header><h3><FormattedMessage id="My Tasks" defaultMessage="My Tasks" />:</h3></Header>
            <Table>
              <tbody>
                {items}
              </tbody>
            </Table>
            <Footer pad={{horizontal: 'small'}}>
              <Button href='/add' primary={true} label={
                <FormattedMessage id="Add Task" defaultMessage="Add Task" />
              } onClick={this._onRequestForAddTask} />
            </Footer>
          </Tile>
        </Tiles>
      </Section>
    );
  }
};

TodoAppDashboard.contextTypes = {
  intl: PropTypes.object.isRequired
};
