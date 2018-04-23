/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './UserHome'
export {default as AccountInfo} from './AccountInfo'
export {default as AdminDashboard} from './AdminDashboard'
export {default as Cart} from './Cart'
export {default as Homepage} from './Homepage'
export {default as OrderHistory} from './OrderHistory'
export {default as SingleOrder} from './SingleOrder'
export {default as SingleProduct} from './SingleProduct'
export {default as SingleUser} from './SingleUser'
export {default as AddProduct} from './AddProduct'
export {default as EditProduct} from './EditProduct'
export {default as EditUser} from './EditUser'
export {default as EditOrder} from './EditOrder'
export {default as Review} from './EditOrder'
export {default as Checkout} from './Checkout'
export {default as Confirmation} from './Confirmation'
export {default as CategoryProducts} from './CategoryProducts'

export {Login, Signup} from './AuthForm'
