// routes
// config
// components
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Products',
    path: paths.productsList,
  },
  {
    title: 'Brands',
    path: paths.brands.root,
  },
  {
    title: 'Reels',
    path: paths.influencer.root,
  },
];
