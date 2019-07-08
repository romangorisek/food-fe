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
      <v-flex xs12 sm6 md4 lg3 v-for="ingredient of filteredIngredients" :key="ingredient.id">
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

    export default {
        components: {
            AddNewIngredient
        },
        data() {
            return {
                filter: "",
                ingredients: [
                    {
                        id: 1,
                        title: "Cebula"
                    },
                    {
                        id: 2,
                        title: "Cesn"
                    },
                    {
                        id: 3,
                        title: "Paprika"
                    },
                    {
                        id: 4,
                        title: "Paradajz"
                    },
                ]
            }
        },
        computed: {
            filteredIngredients() {
                return this.ingredients.filter(ingredient => ingredient.title.toLowerCase().includes(this.filter.toLowerCase()))
            }
        },
        methods: {
            remove(ingredient) {
                alert("deleted " + ingredient.title)
            }
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

