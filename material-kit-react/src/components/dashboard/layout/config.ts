import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'products', title: 'Products', href: paths.dashboard.products.products, icon: 'toolbox', matcher: {type: 'startsWith', href: paths.dashboard.products.products} },
  { key: 'categories', title: 'Categories', href: paths.dashboard.categories, icon: 'list-checks'},
  { key: 'orders', title: 'Orders', href: paths.dashboard.orders, icon: 'cart' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'admins', title: 'Admins', href: paths.dashboard.admins, icon: 'admin' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
