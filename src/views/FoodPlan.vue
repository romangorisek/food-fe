<template>
  <div class="food-plan">
    <v-layout row align-center>
      <div>
        <v-btn icon small @click="goWeekDown()">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <span class="week">
          {{ weekToString }}
        </span>
        <v-btn icon small @click="goWeekUp()">
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </div>
      
      <div class="spacer"></div>
      
      <v-btn v-if="currentWeekIsCached" @click="removeCurrentWeekFromCache()">Remove from cache</v-btn>
      <v-btn v-else @click="saveCurrentWeek()">Save</v-btn>
    </v-layout>
      
    <v-layout row wrap class="mt-4">
      <v-flex xs12 v-for="(dish, i) of dishes" :key="i">
        <v-card class="mb-2" :class="{'elevation-8 mb-3 mt-2': i == today, 'active': expandedSearchInput == i}">
          <v-card-title class="title">
            <div class="day-of-the-week">
              {{ indexToDay(i) }}:
            </div>
            <div class="spacer"></div>
            <div class="controls">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon x-small v-on="on" @click="replacePosition(i)" class="get-new">
                    <v-icon>autorenew</v-icon>
                  </v-btn>
                </template>
                <span>Suggest something else</span>
              </v-tooltip>

              <div class="search-meal-backdrop"
                v-show="expandedSearchInput != null"
                @click="hideSearchInput()"
              >
              </div>
              
              <v-tooltip top v-if="expandedSearchInput != i">
                <template v-slot:activator="{ on }">
                  <v-btn icon x-small v-on="on" class="get-new"
                    @click="expandSearchInput(i)"
                  >
                    <v-icon>search</v-icon>
                  </v-btn>
                </template>
                <span>Find a dish</span>
              </v-tooltip>


              <v-menu
                style="z-index: 15"
                :nudge-bottom="40"
                :nudge-left="100"
                v-if="expandedSearchInput == i"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="search"
                    ref="dishinput"
                    class="search-meal"
                    append-icon="search"
                    type="text"
                    label="Find a dish"
                    @keydown.esc="hideSearchInput()"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-list
                  style="max-height: 200px; width: 350px; overflow: auto;"
                >
                  <v-list-tile v-if="isLoading" 
                      style="display: flex; justify-content: center;">
                    <v-list-tile-title>
                      <looping-rhombuses-spinner
                        style="padding: 5px;"
                        :animation-duration="2500"
                        :rhombus-size="15"
                        color="#bababa"
                      />
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile v-for="(item, index) in items" :key="index" @click="pickItem(item, i)" v-if="!isLoading">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
          <v-card-text>
            <router-link :to="`/edit-dish/${dish.id}`">{{dish.title}}</router-link>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import store from '@/store/Index'
import DishesApi from '@/api/Dishes'
import { LoopingRhombusesSpinner } from 'epic-spinners'

export default {
  name: 'FoodPlan',
  components: {
    LoopingRhombusesSpinner
  },
  data () {
    return {
      start_of_week: '',
      end_of_week: '',
      today: null,
      items: [],
      isLoading: false,
      search: null,
      expandedSearchInput: null,
      searchPending: null,
      showMenu: null
    }
  },
  computed: {
    dishes() {
      return store.getters['FoodPlan/filtered']('')
    },
    currentWeekIsCached() {
      return store.getters['FoodPlan/cached']()
    },
    week() {
      return `${this.start_of_week.format('DDMMYYYY')}-${this.end_of_week.format('DDMMYYYY')}`
    },
    weekToString() {
      if (this.currentWeekIsSelected()) {
        return "This week"
      }
      if (this.nextWeekIsSelected()) {
        return "Next week"
      }
      if (this.lastWeekIsSelected()) {
        return "Last week"
      }
      return `${this.start_of_week.format('DD.MM.YYYY')}-${this.end_of_week.format('DD.MM.YYYY')}`
    }
  },
  methods: {
    setCurrentWeek() {
      this.start_of_week = this.$moment().startOf('week')
      this.end_of_week = this.$moment().endOf('week')
      this.today = this.$moment().isoWeekday()-1
    },
    getFoodPlan() {
      this.$store.dispatch('FoodPlan/getAll', this.week)
    },
    indexToDay(i) {
      switch (i) {
        case 0:
          return 'Monday'
        case 1:
          return 'Tuesday'
        case 2:
          return 'Wednesday'
        case 3:
          return 'Thursday'
        case 4:
          return 'Friday'
        case 5:
          return 'Saturday'
        case 6:
          return 'Sunday'
        default:
          break
      }
    },
    replacePosition(i) {
      this.$store.dispatch('FoodPlan/replacePosition', i)
    },
    goWeekDown() {
      this.start_of_week = this.$moment(this.start_of_week).add(-1, 'weeks').startOf('week')
      this.end_of_week = this.$moment(this.end_of_week).add(-1, 'weeks').endOf('week')
      this.today = this.currentWeekIsSelected() ? this.$moment().isoWeekday()-1 : null
      this.getFoodPlan()
    },
    goWeekUp() {
      this.start_of_week = this.$moment(this.start_of_week).add(1, 'weeks').startOf('week')
      this.end_of_week = this.$moment(this.end_of_week).add(1, 'weeks').endOf('week')
      this.today = this.currentWeekIsSelected() ? this.$moment().isoWeekday()-1 : null
      this.getFoodPlan()
    },
    saveCurrentWeek() {
      this.$store.dispatch('FoodPlan/saveToCache', this.week)
    },
    removeCurrentWeekFromCache() {
      this.$store.dispatch('FoodPlan/deleteFromCache', this.week)
    },
    currentWeekIsSelected() {
      let todayDate = this.$moment()
      return this.start_of_week <= todayDate && todayDate <= this.end_of_week
    },
    nextWeekIsSelected() {
      let nextWeek = this.$moment().add(1, 'week')
      return this.start_of_week <= nextWeek && nextWeek <= this.end_of_week
    },
    lastWeekIsSelected() {
      let lastWeek = this.$moment().add(-1, 'week')
      return this.start_of_week <= lastWeek && lastWeek <= this.end_of_week
    },
    expandSearchInput(i) {
      this.expandedSearchInput = i
      // this.$nextTick(() => {
      //   console.log(this.$refs.dishinput[0])
      //   this.$refs.dishinput[0].$el.focus()
      // })
    },
    hideSearchInput() {
      this.expandedSearchInput = null
      this.search = null
      this.model = null
      this.showMenu = null
    },
    pickItem(item, i) {
      this.$store.dispatch('FoodPlan/setItemToPosition', {item, index: i})
      this.hideSearchInput()
    }
  },
  created() {
    this.setCurrentWeek()
    this.getFoodPlan()
  },
  watch: {
      search (val) {
        this.showMenu = this.expandedSearchInput

        if (this.searchPending) {
          clearTimeout(this.searchPending)
          this.searchPending = null
        }
        
        this.searchPending = setTimeout(() => {
          if (this.isLoading) return
          this.isLoading = true
          this.items = []
  
          DishesApi.index(val)
          .then(res => {
            if (res.status == 200) {
              this.items = res.data
            }
          })
          .finally(() => (this.isLoading = false))
        }, 500)

      },
    },
}
</script>

<style lang="scss">
  .food-plan {
    .title {
      height: 50px;
      .day-of-the-week {
        height: 50px;
      }
    }
    a {
      text-decoration: none;
      color: #616161;
    }
    .week {
      display: inline-block;
      text-align: center;
      width: 150px;
    }
    .search-meal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      z-index: 9;
    }
    .search-meal {
      padding: 0;
      z-index: 10;
    }
    .controls {
      display: none;
      .get-new {
        margin: 0;
        margin-top: 2px;
        color: grey;
      }
    }
    .v-card:hover,
    .v-card.active {
      .controls {
        display: flex;
      }
    }
  }
</style>
