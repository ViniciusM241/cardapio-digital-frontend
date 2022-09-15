import loginRoutes from '~/views/Login/routes';
import homeRoutes from '~/views/Home/routes';
import orderRoutes from '~/views/Order/routes';

const routes = [
  ...loginRoutes,
  ...homeRoutes,
  ...orderRoutes,
];

export default routes;
