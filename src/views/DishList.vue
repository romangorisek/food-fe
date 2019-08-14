<template>
  <div>
    <v-layout row wrap>
      <div class="search-bar">
        <v-text-field
          placeholder="Search..."
          append-icon="search"
          v-model="filter"
          @keydown.esc="filter=''"
        ></v-text-field>
      </div>
      <v-spacer></v-spacer>
      <router-link to="/new-dish">
        <v-btn
          color="primary"
          class="white--text"
        >
          Add dish
          <v-icon right dark>add</v-icon>
        </v-btn>
      </router-link>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 v-for="dish of dishes" :key="dish.id">
        <v-card class="dish-card mb-2">
          <v-card-text>
            <router-link :to="`/dish/${dish.id}`">
              <v-layout>
                <span>
                  {{dish.title}}
                </span>
                <v-spacer></v-spacer>
                <v-btn icon small :to="`/edit-dish/${dish.id}`" class="edit-btn">
                  <v-icon small color="blue lighten-1">
                    edit
                  </v-icon>
                </v-btn>
                <v-btn icon small @click.stop.prevent="deleteDish(dish)" class="delete-btn">
                  <v-icon small color="red lighten-1">
                    delete
                  </v-icon>
                </v-btn>
              </v-layout>
            </router-link>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import store from '@/store/Index'

export default {
  name: "DishList",
  data() {
    return {
      filter: ""
    }
  },
  computed: {
    dishes() {
      return store.getters['Dishes/filtered'](this.filter)
    }
  },
  methods: {
    deleteDish(dish) {
      this.$store.dispatch('Dishes/delete', dish)
    }
  },
  created() {
    this.$store.dispatch('Dishes/getAll')
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 250px;
}
.dish-card {
  line-height: 30px;
  .edit-btn,
  .delete-btn {
    padding: 0;
    margin: 0;
    display: none;
  }
}
.dish-card:hover {
  cursor: pointer;
  .edit-btn,
  .delete-btn {
    display: inline-flex;
  }
}
a {
  text-decoration: none;
  color: #616161;
}
</style>
