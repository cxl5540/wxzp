import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router);
Router.prototype.go = function (a) {
   sessionStorage.isBack = true
  if(a){
    window.history.go(a)
  }else{
    window.history.go(-1)
  }
}
window.addEventListener("popstate", function(e) {
  sessionStorage.isBack = true
}, false);
export default new Router({
    linkActiveClass: 'active', 

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ShcoolList',
      name: 'ShcoolList',
   /*   component: () => import( './views/ShcoolList.vue')*/
      component: (resolve) => require(['./views/ShcoolList.vue'],resolve)
    },
    {
        path: '/SociologyIntro',
        name: 'SociologyIntro',
       /* component: () => import('./views/SociologyIntro.vue')*/
     component: (resolve) => require(['./views/SociologyIntro.vue'],resolve)
    },{
      path: '/shcoolListDetail',
      name: 'shcoolListDetail',
     /* component: () => import('./components/schoollist/schoolListDetail.vue')*/
       component: (resolve) => require(['./components/schoollist/schoolListDetail.vue'],resolve)
    },
    {
        path: '/baseInformation',
        name: 'baseInformation',
       /* component: () => import('./components/curriculum/baseInformation.vue')*/
        component: (resolve) => require(['./components/curriculum/baseInformation.vue'],resolve)
    },
    {
        path: '/Curriculum/:type',
        name: 'Curriculum',
      /*  component: () => import( './components/curriculum/Curriculum.vue')*/
         component: (resolve) => require(['./components/curriculum/Curriculum.vue'],resolve)
    },
    {
        path: '/Resume',
        name: 'Resume',
      /*  component: () => import('./components/curriculum/Resume.vue')*/
       component: (resolve) => require(['./components/curriculum/Resume.vue'],resolve)
    },
    {
        path: '/ReumenShowExp',
        name: 'ReumenShowExp',
       /* component: () => import('./components/curriculum/ReumenShowExp.vue')*/
        component: (resolve) => require(['./components/curriculum/ReumenShowExp.vue'],resolve)
    },
    {
        path: '/Editjob',
        name: 'Editjob',
      /*  component: () => import( './components/editexprience/Editjob.vue')*/
       component: (resolve) => require(['./components/editexprience/Editjob.vue'],resolve)
    },
    {
        path: '/Editpro',
        name: 'Editpro',
      /*  component: () => import('./components/editexprience/Editpro.vue')*/
         component: (resolve) => require(['./components/editexprience/Editpro.vue'],resolve)
    },
    {
        path: '/Editaward',
        name: 'Editaward',
       /* component: () => import('./components/editexprience/Editaward.vue')*/
        component: (resolve) => require(['./components/editexprience/Editaward.vue'],resolve)
    },
    {
        path: '/Editcert',
        name: 'Editcert',
       /* component: () => import('./components/editexprience/Editcert.vue')*/
        component: (resolve) => require(['./components/editexprience/Editcert.vue'],resolve)
    },
    {
        path: '/Editedu',
        name: 'Editedu',
       /* component: () => import('./components/editexprience/Editedu.vue')*/
        component: (resolve) => require(['./components/editexprience/Editedu.vue'],resolve)
    },
    {
        path: '/Editlagu',
        name: 'Editlagu',
        /*component: () => import('./components/editexprience/Editlagu.vue')*/
        component: (resolve) => require(['./components/editexprience/Editlagu.vue'],resolve)
    },
    {
        path: '/Editskill',
        name: 'Editskill',
      /*  component: () => import('./components/editexprience/Editskill.vue')*/
        component: (resolve) => require(['./components/editexprience/Editskill.vue'],resolve)
    },
    {
        path: '/Edittrian',
        name: 'Edittrian',
       /* component: () => import('./components/editexprience/Edittrian.vue')*/
        component: (resolve) => require(['./components/editexprience/Edittrian.vue'],resolve)
    },
    {
        path: '/Joblist',
        name: 'Joblist',
       /* component: () => import('./components/explist/Joblist.vue')*/
       component: (resolve) => require(['./components/explist/Joblist.vue'],resolve)
    },
    {
        path: '/Prolist',
        name: 'Prolist',
        /*component: () => import( './components/explist/Prolist.vue')*/
        component: (resolve) => require(['./components/explist/Prolist.vue'],resolve)
    },
    {
        path: '/Tarinlist',
        name: 'Tarinlist',
        /*component: () => import('./components/explist/Tarinlist.vue')*/
        component: (resolve) => require(['./components/explist/Tarinlist.vue'],resolve)
    },
    {
        path: '/Edulist',
        name: 'Edulist',
        /*component: () => import( './components/explist/Edulist.vue')*/
          component: (resolve) => require(['./components/explist/Edulist.vue'],resolve)
    },
    {
        path: '/Certlist',
        name: 'Certlist',
      /*  component: () => import('./components/explist/Certlist.vue')*/
         component: (resolve) => require(['./components/explist/Certlist.vue'],resolve)
    },
    {
        path: '/Lagulist',
        name: 'Lagulist',
       /* component: () => import('./components/explist/Lagulist.vue')*/
         component: (resolve) => require(['./components/explist/Lagulist.vue'],resolve)
    },
    {
        path: '/Skilllist',
        name: 'Skilllist',
       /* component: () => import('./components/explist/Skilllist.vue')*/
         component: (resolve) => require(['./components/explist/Skilllist.vue'],resolve)
    },
    {
        path: '/Awardlist',
        name: 'Awardlist',
        /*component: () => import('./components/explist/Awardlist.vue')*/
         component: (resolve) => require(['./components/explist/Awardlist.vue'],resolve)
    },
    {
        path: '/Dialog',
        name: 'Dialog',
        component: () => import(/* webpackChunkName: "about" */ './components/curriculum/Dialog.vue')
    },
    {
        path: '/Sendrecord',
        name: 'Sendrecord',
        component: () => import(/* webpackChunkName: "about" */ './components/sendrecord/Sendrecord.vue')
    },
    {
        path: '/Resumedetail',
        name: 'Resumedetail',
        component: () => import(/* webpackChunkName: "about" */ './components/sendrecord/Resumedetail.vue')
    },
    {
        path: '/Baseinfo',
        name: 'Baseinfo',
        component: () => import(/* webpackChunkName: "about" */ './components/sendrecord/Baseinfo.vue')
    },
    {
        path: '/Joblistsend',
        name: 'Joblistsend',
        component: () => import(/* webpackChunkName: "about" */ './components/explistsend/Joblistsend.vue')
    },
    {
        path: '/Prolistsend',
        name: 'Prolistsend',
        component: () => import(/* webpackChunkName: "about" */ './components/explistsend/Prolistsend.vue')
    },
    {
        path: '/Tarinlistsend',
        name: 'Tarinlistsend',
        component: () => import(/* webpackChunkName: "about" */ './components/explistsend/Tarinlistsend.vue')
    },
    {
        path: '/Edulistsend',
        name: 'Edulistsend',
        component: () => import(/* webpackChunkName: "about" */ './components/explistsend/Edulistsend.vue')
    },
    {
        path: '/Certlistsend',
        name: 'Certlistsend',
        component: () => import(/* webpackChunkName: "about" */ './components/explistsend/Certlistsend.vue')
    },
    {
        path: '/Lagulistsend',
        name: 'Lagulistsend',
        component: () => import(/* webpackChunkName: "about" */ './components/explistsend/Lagulistsend.vue')
    },
    {
        path: '/Skilllistsend',
        name: 'Skilllistsend',
        component: () => import(/* webpackChunkName: "about" */ './components/explistsend/Skilllistsend.vue')
    },
    {
        path: '/Awardlistsend',
        name: 'Awardlistsend',
        component: () => import(/* webpackChunkName: "about" */ './components/explistsend/Awardlistsend.vue')
    },
    {
        path: '/Editjobsend',
        name: 'Editjobsend',
        component: () => import(/* webpackChunkName: "about" */ './components/editexpsend/Editjobsend.vue')
    },
    {
        path: '/Editprosend',
        name: 'Editprosend',
        component: () => import(/* webpackChunkName: "about" */ './components/editexpsend/Editprosend.vue')
    },
    {
        path: '/Editawardsend',
        name: 'Editawardsend',
        component: () => import(/* webpackChunkName: "about" */ './components/editexpsend/Editawardsend.vue')
    },
    {
        path: '/Editcertsend',
        name: 'Editcertsend',
        component: () => import(/* webpackChunkName: "about" */ './components/editexpsend/Editcertsend.vue')
    },
    {
        path: '/Editedusend',
        name: 'Editedusend',
        component: () => import(/* webpackChunkName: "about" */ './components/editexpsend/Editedusend.vue')
    },
    {
        path: '/Editlagusend',
        name: 'Editlagusend',
        component: () => import(/* webpackChunkName: "about" */ './components/editexpsend/Editlagusend.vue')
    },
    {
        path: '/Editskillsend',
        name: 'Editskillsend',
        component: () => import(/* webpackChunkName: "about" */ './components/editexpsend/Editskillsend.vue')
    },
    {
        path: '/Edittriansend',
        name: 'Edittriansend',
        component: () => import(/* webpackChunkName: "about" */ './components/editexpsend/Edittriansend.vue')
    }

  ]
})
