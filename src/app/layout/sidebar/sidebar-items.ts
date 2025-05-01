import { RouteInfo } from './sidebar.metadata';
import { 
  Home, 
  Tag, 
  Box, 
  ShoppingCart, 
  User, 
  Shield 
} from 'angular-feather/icons'; // Import Feather icons

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard/main',
    title: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'Home', // Feather icon
    class: '',
    groupTitle: false,
    submenu: [],
  },
  {
    path: '/pages/category',
    title: 'MENUITEMS.CATEGORY.TEXT',
    icon: 'Tag', // Feather icon
    class: '',
    groupTitle: false,
    submenu: [],
  },
  // {
  //   path: '/pages/product',
  //   title: 'MENUITEMS.PRODUCT.TEXT',
  //   icon: 'Box', // Feather icon
  //   class: '',
  //   groupTitle: false,
  //   submenu: [],
  // },
  {
    path: '',
    title: 'Products',
    icon: 'Box', 
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/pages/product',
        title: 'Product',
        icon: 'Box',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: '/pages/favorite',
        title: 'Favorite',
        icon: 'Heart',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      }
    ],
  },
  {
    path: '/pages/order',
    title: 'Carts',
    icon: 'Box',
    class: '',
    groupTitle: false,
    submenu: [],
  },
  {
    path: '/pages/order',
    title: 'MENUITEMS.PAYMENT.TEXT',
    icon: 'Box',
    class: '',
    groupTitle: false,
    submenu: [],
  },
  
  {
    path: '',
    title: 'User & Role',
    icon: 'User', 
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/pages/user',
        title: 'User',
        icon: 'User',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: '/pages/role',
        title: 'Role',
        icon: 'Shield',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      }
    ],
  },

  // {
  //   path: '',
  //   title: 'User & Role',
  //   icon: 'User', 
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/pages/user',
  //       title: 'User',
  //       icon: 'User',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: [],
  //     },
  //     {
  //       path: '/pages/role',
  //       title: 'Role',
  //       icon: 'Shield',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: [],
  //     }
  //   ],
  // },

];
