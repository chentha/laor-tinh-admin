import { RouteInfo } from './sidebar.metadata';

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
    path: '/pages/banner',
    title: 'Banner',
    icon: 'Image',
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

  {
    path: '',
    title: 'Products',
    icon: 'Clipboard', 
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/pages/product',
        title: 'Product',
        icon: 'Clipboard',
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
    title: 'MENUITEMS.PAYMENT.TEXT',
    icon: 'Package',
    class: '',
    groupTitle: false,
    submenu: [],
  },
  
  {
    path: '',
    title: 'User & Role',
    icon: 'Shield', 
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
  {
    path: '/pages/shipping',
    title: 'Shipping',
    icon: 'Truck',
    class: '',
    groupTitle: false,
    submenu: [],
  },
  {
    path: '/pages/tracking',
    title: 'Tracking',
    icon: 'Monitor',
    class: '',
    groupTitle: false,
    submenu: [],
  },
  

];
