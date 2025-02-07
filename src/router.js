import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue"
import Login from "./pages/Login.vue"
import Register from "./pages/Register.vue"
import Otp from "./pages/Otp.vue"
import SetPassword from "./pages/SetPassword.vue"
import SetPin from "./pages/SetPin.vue"
import Fund from "./pages/Fund.vue"
import Auth from "./Auth";
import Transactions from "./pages/Transactions.vue";
import Transaction from "./pages/Transaction.vue";
import Data from "./pages/Data.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import Airtime from "./pages/Airtime.vue";
import Cable from "./pages/Cable.vue";
import Exam from "./pages/Exam.vue";
import Notifications from "./pages/Notifications.vue";
import Electricity from "./pages/Electricity.vue";
import Cash from "./pages/Cash.vue";
import Wallet from "./pages/Wallet.vue";
import DepositTransactions from "./pages/DepositTransactions.vue";
import Profile from "./pages/Profile.vue";
import Settings from "./pages/Settings.vue";


const routes = [
    {
        path: "/",
        alias: "/home",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: false,
            home: true
        },
    }, 
    {
        path: "/setpin",
        alias: "/setpin",
        name: "setpin",
        component: SetPin,
        meta: {
            requiresAuth: true,
            home: false
        },
    }, 
    {
        path: "/fund/:bank/:account",
        name: "fund",
        component: Fund,
        meta: {
            requiresAuth: true,
            home: false
        },
    }, 
    {
        path: "/deposits",
        alias: "/deposits",
        name: "deposits",
        component: DepositTransactions,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/transactions",
        alias: "/transactions",
        name: "transactions",
        component: Transactions,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/notifications",
        alias: "/notifications",
        name: "notifications",
        component: Notifications,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/transaction",
        alias: "/transaction",
        name: "transaction",
        component: Transaction,
        meta: {
            requiresAuth: true,
            home: true
        }, 
    },
    {
        path: "/profile",
        alias: "/profile",
        name: "profile",
        component: Profile,
        meta: {
            requiresAuth: true,
            home: true
        }, 
    },
    {
        path: "/buydata",
        name: "buydata",
        component: Data,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/buyairtime",
        name: "buyairtime",
        component: Airtime,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/buycable",
        name: "buycable",
        component: Cable,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/buyexam",
        name: "buyexam",
        component: Exam,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/buyelectricity",
        name: "buyelectricity",
        component: Electricity,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/buycash",
        name: "buycash",
        component: Cash,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/wallet",
        name: "wallet",
        component: Wallet,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
        path: "/settings",
        name: "settings",
        component: Settings,
        meta: {
            requiresAuth: true,
            home: true
        },
    },
    {
      path: "/login",
      name: "login",
      component: Login,    
      beforeEnter: (to, from) => {
          if (!Auth.check()) {
              return true;
          } else {
              router.push('/home');
          }
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,    
      beforeEnter: (to, from) => {
          if (!Auth.check()) {
              return true;
          } else {
              router.push('/home');
          }
      },
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,    
      beforeEnter: (to, from) => {
          if (!Auth.check()) {
              return true;
          } else {
              router.push('/home');
          }
      },
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: ResetPassword,    
      beforeEnter: (to, from) => {
          if (!Auth.check()) {
              return true;
          } else {
              router.push('/home');
          }
      },
    },
    {
      path: "/otp/:phone",
      name: "otp",
      component: Otp,    
      beforeEnter: (to, from) => {
          if (!Auth.check()) {
              return true;
          } else {
              router.push('/home');
          }
      },
    },
    {
      path: "/set-password",
      name: "setpassword",
      component: SetPassword,
      beforeEnter: (to, from) => {
          if (!Auth.check()) {
              return true;
          } else {
              router.push('/home');
          }
      },
    },
    {
        path: '/:dummy(.*)*',
        component: {
          setup() {
            return () => '404 - Page not found'
          }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (Auth.check()) {
            next();
            return;
        } else {
            router.push('/login');
        }
    } else {
        next();
    }
});
export default router;
