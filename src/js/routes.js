import Main from './Main';
import TodoAppDashboard from './components/TodoAppDashboard';
import TodoAddTaskForm from './components/TodoAddTaskForm';
import NotFound from './components/NotFound';

export default {
  path: '/',
  component: Main,
  indexRoute: { component: TodoAppDashboard },
  childRoutes: [
    { path: 'add', component: TodoAddTaskForm },
    { path: '*', component: NotFound }
  ]
};
