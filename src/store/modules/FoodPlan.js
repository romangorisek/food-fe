import api from '@/api/FoodPlan'
import Vue from 'vue';

const state = {
  all: [],
  cached: false
}

const getters = {
    filtered: (state) => (filter) => {
        return state.all.filter(ingredient => ingredient.title.toLowerCase().includes(filter.toLowerCase()))
    },
    byId: (state) => (id) => {
      for (let ingredient of state.all) {
        if (ingredient.id === id) return ingredient
      }
    },
    cached: (state) => () => {
      return state.cached
    }
}

const actions = {
  getAll({commit}, week) {
    api.index(week).then(res => {
      commit('setAll', res.data.dishes)
      commit('setCached', res.data.cached)
    })
  },
  replacePosition({commit, state}, index) {
    api.random(state.all).then(res => {
      commit('setOne', {dish: res.data, index: index})
      commit('setCached', false)
    })
  },
  setItemToPosition({commit}, data) {
      commit('setOne', {dish: data.item, index: data.index})
      commit('setCached', false)
  },
  saveToCache({state}, week) {
    let data = {
      week: week,
      dish_ids: state.all.map(dish => dish.id),
      meal_id: 'a6e9d279-0ff1-4a28-8b03-563967f00c6e'
    }
    api.create(data).then(res => {
      if (res.status == 200 && res.data.success) {
        state.cached = true
      }
    })
  },
  deleteFromCache({state}, week) {
    let data = {
      week: week,
      meal_id: 'a6e9d279-0ff1-4a28-8b03-563967f00c6e'
    }
    api.delete(data).then(res => {
      if (res.status == 200 && res.data.success) {
        state.cached = false
      }
    })
  }
}

const mutations = {
  setAll(state, dishes) {
    state.all = dishes
  },
  setOne(state, data) {
    Vue.set(state.all, data.index, data.dish)
  },
  setCached(state, cached) {
    state.cached = cached
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}