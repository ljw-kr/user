import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
// import about from '@/components/about'
import description from '../components/description'
import results from '../components/results'
import person from '../components/person.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '大厨到家'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: r => require.ensure([], () => r(require('../components/about')), '关于我们'),
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/des',
      name: 'des',
      component: r => require.ensure([], () => r(description, '找到你的厨师')),
      meta: {
        title: '找到你的厨师'
      }
    },
    {
      path: '/results',
      name: 'results',
      component: r => require.ensure([], () => r(results, '搜索厨师结果')),
      meta: {
        title: '搜索厨师结果'
      }
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: r => require.ensure([], () => r(person, '用户个人中心')),
      meta: {
        title: '用户个人中心'
      }
    }
  ]
})
//  路由钩子函数可以全局享有，也可以单独放在单独的路由使用
router.beforeEach((to, from, next) => {
  // 路由变化修改title
  // to: 即将要进入的目标对象
  // from: 当前导航将要离开的路由对象
  // next： function，进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed （确认的）；否则为false，终止导航
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
