// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Language from '@material-ui/icons/Language';
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.jsx';
import ProfileDetailContainer from './containers/Profile/index';
import CustomerListContainer from './containers/Customers/CustomerList.jsx';
import Typography from 'views/Typography/Typography.jsx';
import Icons from 'views/Icons/Icons.jsx';
import Maps from 'views/Maps/Maps.jsx';
import NotificationsPage from 'views/Notifications/Notifications.jsx';
import Quotation from './containers/quotation/index.jsx';
// core components/views for RTL layout
import RTLPage from 'views/RTLPage/RTLPage.jsx';
import ProductList from './views/Products/productList';
import AddProduct from './views/Products/addProduct';
import UpdateProduct from './views/Products/updateProduct';
import Invoice from './containers/invoice/index';
import InvoiceList from './containers/invoice/invoices';
const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
    isSideBarLink: true,
  },
  {
    path: '/user',
    name: 'Create Profile',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: ProfileDetailContainer,
    layout: '/admin',
    isSideBarLink: true,
  },
  {
    path: '/qoutation',
    name: 'Qoutation',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Quotation,
    layout: '/admin',
    isSideBarLink: true,
  },
  {
    path: '/products',
    name: 'Products',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: ProductList,
    layout: '/admin',
    isSideBarLink: true,
  },
  {
    path: '/add-products',
    name: 'Add Products',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: AddProduct,
    layout: '/admin',
    isSideBarLink: false,
  },
  {
    path: '/update-product/:product_id',
    name: 'Update Product',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: UpdateProduct,
    layout: '/admin',
    isSideBarLink: false,
  },

  {
    path: '/customers',
    name: 'Customers',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: CustomerListContainer,
    layout: '/admin',
    isSideBarLink: true,
  },
  {
    path: '/invoice',
    name: 'Invoice',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Invoice,
    layout: '/admin',
    isSideBarLink: true,
  },
  {
    path: '/all-invoices',
    name: 'All Invoices',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: InvoiceList,
    layout: '/admin',
    isSideBarLink: true,
  },
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   rtlName: 'طباعة',
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: '/admin',
  //   isSideBarLink: true,
  // },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   rtlName: 'الرموز',
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: '/admin',
  //   isSideBarLink: false,
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   rtlName: 'خرائط',
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: '/admin',
  //   isSideBarLink: true,
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   rtlName: 'إخطارات',
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: '/admin',
  //   isSideBarLink: true,
  // },
  // {
  //   path: '/rtl-page',
  //   name: 'RTL Support',
  //   rtlName: 'پشتیبانی از راست به چپ',
  //   icon: Language,
  //   component: RTLPage,
  //   layout: '/rtl',
  //   isSideBarLink: true,
  // },
];

export default dashboardRoutes;
