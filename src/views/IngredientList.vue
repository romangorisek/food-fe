<template>
  <div>
    <v-layout row wrap justify-space-between>
        <v-flex xs12 md4 lg3 class="mx-2">
          <v-text-field
            placeholder="Search..."
            append-icon="search"
            v-model="filter"
            @keydown.esc="filter=''"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md4 lg3 class="mx-2">
          <add-new-ingredient />
        </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="ingredient of ingredients" :key="ingredient.id">
        <v-card class="ingredient-card mt-2 ml-2">
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs11>
                  {{ingredient.title}}
              </v-flex>
              <v-flex xs1>
                <v-btn icon small @click="remove(ingredient)" class="delete-btn">
                  <v-icon small color="red lighten-1">
                    delete
                  </v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
    import AddNewIngredient from '@/components/AddNewIngredient'
    import store from '@/store/Index'

    export default {
        components: {
            AddNewIngredient
        },
        data() {
            return {
                filter: ""
            }
        },
        computed: {
            ingredients() {
                return store.getters['Ingredients/filtered'](this.filter)
            }
        },
        methods: {
            remove(ingredient) {
                this.$store.dispatch('Ingredients/delete', ingredient)
            }
        },
        created() {
            this.$store.dispatch('Ingredients/getAll')
        }
    }
</script>

<style lang="scss" scoped>
.ingredient-card {
    line-height: 30px;
    .delete-btn{
        display: none;
        padding: 0;
        margin: 0;
    }
}
.ingredient-card:hover {
    .delete-btn {
        display: inline;
    }
}
</style>

