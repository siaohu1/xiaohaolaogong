
import Vue from 'vue';
import Router from 'vue-router';
//
const _import = require('./_import_' + process.env.NODE_ENV);
//
import Full from '../containers/Full'
//
import Full2 from '../containers/Full2'

import Buttons from '../views/components/Buttons'

// Views - Pages
import Page404 from '../views/errorPages/Page404'
import Page500 from '../views/errorPages/Page500'


/* login */
const Login = _import('login/index');
Vue.use(Router);


//动态路由表
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  {path: '/pages',redirect: '/pages/p404', name: 'Pages',
    component: {
      render (c) { return c('router-view') }
      // Full,
    },
    children: [{path: '404',  name: 'Page404', component: _import('errorPages/Page404') },
      {path: '500',name: 'Page500',component: _import('errorPages/Page404')},
    ]
  }


]

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

//异步路由表
export const asyncRouterMap = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'm.Home1',
    component: Full,
    hidden:false,
    children: [
      {path: '/dashboard',name: 'm.Home',icon:'home',component: _import('Dashboard')},
      {path: '/asset',name: 'm.Assets',icon:'social-bitcoin',
        component: {render (c) { return c('router-view') }},
        children: [ {path: 'assetsList',name: 'm.AssetsList',icon:'ios-list',component: _import('AssetsList'), hidden:false, },
          {path: 'assetdetail',name: 'm.AssetsDetail',icon:'cash',component: _import('AssetDetail')},
        ]
      },
      {path: '/order',name: 'm.Order',icon:'social-bitcoin-outline',
        component: {render (c) { return c('router-view') }},
        children: [ {path: 'OrderEntrustment',name: 'm.OrderEntrustment',icon:'stats-bars',component: _import('OrderEntrustment'), hidden:false, },
          {path: 'OrderDetails',name: 'm.OrderDetails',icon:'arrow-graph-up-right',component: _import('OrderDetails')},
        ]
      },
      {path: '/count',name: 'm.Count',icon:'pie-graph',
        component: {render (c) { return c('router-view') }},
        children: [ {path: 'countlist',name: 'm.CountList',icon:'stats-bars',component: _import('charts/CountList'), hidden:false, },
          // {path: 'radarchart',name: '雷达图',icon:'arrow-graph-up-right',component: _import('charts/RadarChart')},
          // {path: 'cakechart',name: '蛋糕销量图表',icon:'ios-analytics',component: _import('charts/CakeChart')}
        ]
      },
      {path: '/key',name: '公私钥管理',icon:'thumbsup',component: _import('Key'), hidden:true},
      {path: '/resetpassword',name: '修改密码',icon:'thumbsup',component: _import('ResetPassword'),hidden:true},
    ]
  },

  {
    path: '/home1',
    redirect: '/home1/introduction',
    name: '首页2',
    component: Full2,
    hidden:false,
    children: [
      {path: '/home1/dashboard',name: 'Dashboard2',icon:'speedometer',component: _import('Dashboard2')},
      // {path: '/home1/introduction',name: '介绍2',icon:'thumbsup',component: _import('Introduction')},

    ]
  },
  { path: '*', redirect: '/pages/404', hidden: true }

];
