import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Person from '../components/Person.vue'
import Classification from '../components/Classification.vue'
import ShoppingCar from '../components/ShoppingCar.vue'
import AddressList from '../components/AddressList.vue'
import AddAddress from '../components/AddAddress.vue'
import EditAddress from '../components/EditAddress.vue'
import GoodList from '../components/GoodList.vue'
import GoodsDetail from '../components/GoodsDetail.vue'
import Buy from '../components/Buy.vue'
import CartBuy from '../components/CartBuy.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/person',
    name: 'person',
    component: Person
  },
  {
    path: '/classification',
    name: 'classification',
    component: Classification
  },
  {
    path: '/shoppingcar',
    name: 'shoppingcar',
    component: ShoppingCar
  },
  {
    path: '/addresslist',
    name: 'addresslist',
    component: AddressList
  },
  {
    path: '/addaddress',
    name: 'addaddress',
    component: AddAddress
  },
  {
    path: '/editaddress',
    name: 'editaddress',
    component: EditAddress
  },
  {
    path: '/goodlist',
    name: 'goodlist',
    component: GoodList
  },
  {
    path: '/goodsdetail',
    name: 'goodsdetail',
    component: GoodsDetail
  },
  {
    path: '/buy',
    name: 'buy',
    component: Buy
  },
  {
    path: '/cartbuy',
    name: 'cartbuy',
    component: CartBuy
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next)=>{

//   if(to.path=='/login') return next();
//   const tokenStr =window.sessionStorage.getItem('token')

//   if(!tokenStr){
//     return next('/login')
//   }

//   next()
  
// })

export default router
