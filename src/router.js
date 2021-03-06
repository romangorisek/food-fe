import Vue from "vue";
import Router from "vue-router";
import FoodPlan from '@/views/FoodPlan'
import DishList from '@/views/DishList'
import IngredientList from '@/views/IngredientList'
import DishForm from '@/views/DishForm'
import Dish from '@/views/Dish'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'FoodPlan',
      component: FoodPlan
    },
    {
      path: '/dish-list',
      name: 'DishList',
      component: DishList
    },
    {
      path: '/dish/:id',
      name: 'Dish',
      component: Dish
    },
    {
      path: '/edit-dish/:id',
      name: 'DishForm',
      component: DishForm
    },
    {
      path: '/new-dish',
      name: 'DishForm',
      component: DishForm
    },
    {
      path: '/ingredient-list',
      name: 'IngredientList',
      component: IngredientList
    },
  ]
});
