// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

//* ,
//*  {
//*  title: 'blog',
//* path: '/dashboard/blog',
//* icon: icon('ic_blog'),
//* },
//* {
//* title: 'login',
//* path: '/login',
//*  icon: icon('ic_lock'),
//*  },
//* {
//* title: 'Not found',
//*  path: '/404',
//*  icon: icon('ic_disabled'),
//* },
const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'barang keluar',
    path: '/dashboard/barang-keluar',
    icon: icon('ic_cart'),
  },
  {
    title: 'barang masuk',
    path: '/dashboard/barang-masuk',
    icon: icon('ic_cart'),
  }
];

export default navConfig;
