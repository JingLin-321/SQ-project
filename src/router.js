import Vue from 'vue'
import Router from 'vue-router'
import Data2 from "@/components/Data2";
import Run1 from "@/components/Run1";
import device3 from "@/components/device3";
import Error4 from "@/components/Error4";
import TableList5 from "@/components/TableList5";
import Test6 from "@/components/Test6";
import rain7 from "@/components/rain7";
import Change8 from "@/components/Change8";
import Home from "@/components/Home";
import Manager from "@/components/Manager";
import login from "@/components/login";
import Total from "@/components/Total";
import Configuration from "@/components/Configuration";

import sqTotal from "@/components/sqTotal";

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    
    {
      path: "/Home",
      name: "Home",
      component: Home
    },
    {
      path: "/",
      name: "login",
      component: login
    },
    {
      path: "/Manager",
      name: "Manager",
      component: Manager,
      children:[
        {
          path: "/Total",
          name: "Total",
          component: Total
        },
        {
          path: "/sqTotal",
          name: "sqTotal",
          component: sqTotal
        },
        {
          path: "/Data2",
          name: "Data2",
          component: Data2
        },
        {
          path: "/Run1",
          name: "Run1",
          component: Run1
        },
        {
          path: "/device3",
          name: "device3",
          component: device3
        },
        {
          path: "/Error4",
          name: "Error4",
          component: Error4
        },
        {
          path: "/TableList5",
          name: "TableList5",
          component: TableList5
        },
        {
          path: "/Test6",
          name: "Test6",
          component: Test6
        },
        {
          path: "/rain7",
          name: "rain7",
          component: rain7
        },
        {
          path: "/Change8",
          name: "Change8",
          component: Change8
        },
        {
          path: "/Configuration",
          name: "Configuration",
          component: Configuration
        }
      ]
    }
    
  ]
})
