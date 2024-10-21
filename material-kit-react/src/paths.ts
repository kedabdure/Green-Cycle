export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    products: {
      products: '/dashboard/products',
      edit: '/dashboard/products/edit',
      new: '/dashboard/products/new',
    },
    categories: '/dashboard/categories',
    orders: '/dashboard/orders',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    admins: {
      admins: '/dashboard/admins',
      new: '/dashboard/admins/new',
    },
    settings: '/dashboard/settings',
  },
} as const;
