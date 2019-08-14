import Vue from "vue";
import Vuex from "vuex";
import Dishes from './modules/Dishes'
import FoodPlan from './modules/FoodPlan'
import Ingredients from './modules/Ingredients'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Dishes,
    FoodPlan,
    Ingredients
  }
});
