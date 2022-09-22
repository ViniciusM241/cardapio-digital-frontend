import loginRoutes from '~/views/Login/routes';
import homeRoutes from '~/views/Home/routes';
import orderRoutes from '~/views/Order/routes';
import adminRoutes from '~/views/Admin/routes';

const routes = [
  ...loginRoutes,
  ...homeRoutes,
  ...orderRoutes,
  ...adminRoutes,
];

export default routes;
