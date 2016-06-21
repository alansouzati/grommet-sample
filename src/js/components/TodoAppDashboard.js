import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Meter from 'grommet/components/Meter';
import Table from 'grommet/components/Table';
import Section from 'grommet/components/Section';
import Status from 'grommet/components/icons/Status';

import { browserHistory } from 'react-router';
import { getTasks } from '../store';

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
    this.state = {
      tasks: []
    };
  }

  componentDidMount () {
    getTasks().then((tasks) => this.setState({ tasks: tasks }));
  }

  _onRequestForAddTask (event) {
    event.preventDefault();
    browserHistory.push('/add');
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
          <td><Status value={task.status} small={true} /></td>
          <td>{task.label}</td>
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
            ]} type="circle" units="Tasks" />
          </Tile>
          <Tile align='start'>
            <Header><h3>My Tasks:</h3></Header>
            <Table>
              <tbody>
                {items}
              </tbody>
            </Table>
            <Footer pad={{horizontal: 'small'}}>
              <Button href='/add' primary={true} label="Add Task"
                onClick={this._onRequestForAddTask} />
            </Footer>
          </Tile>
        </Tiles>
      </Section>
    );
  }
};
