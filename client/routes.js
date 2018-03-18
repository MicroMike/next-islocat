import AppRoot from '../modules/App/App';
import Home from '../modules/home';

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/home',
        component: Home
      }
    ]
  }
];

export default routes;