import Home from './pages/home';
import Login from './pages/login';
import { fetchPopularRepos } from './utils/api';

const routes = [
    {
        path: '/Homea',
        exact: true,
        component: Home,
    },
    {
        path: '/Home/:id',
        component: Home,
        fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
    },
    {
        path: '/',
        exact: true,
        component: Login,
    }
]

export default routes;