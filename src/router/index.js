import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Rot from '@/components/Rot'
import Rot7 from '@/components/Rot7'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/rot',
            name: 'Rot',
            component: Rot
        },
        {
            path: '/rot7',
            name: 'Rot7',
            component: Rot7
        }
    ]
})
