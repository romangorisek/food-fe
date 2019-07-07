<template>
  <div>
    <v-layout row wrap justify-space-between>
        <v-flex xs6 md3>
          <v-text-field
            placeholder="Search..."
            append-icon="search"
            v-model="filter"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md3>
          <v-text-field
            placeholder="Add new"
            v-model="newItem"
            clearable
            :append-outer-icon="newItem && newItem.length ? 'check' : ''"
            @click:append-outer="addNewItem"
            @keypress.esc="addNewItem"
            @keypress.enter="addNewItem"
          ></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mb-2" v-for="ingredient of filteredIngredients" :key="ingredient.id">
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs11>
                  {{ingredient.title}}
              </v-flex>
              <v-flex xs1>
                <v-btn icon small @click="remove(ingredient)">
                  <v-icon>
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
    export default {
        data() {
            return {
                filter: "",
                newItem: "",
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
            },
            addNewItem() {
                let last = this.ingredients.pop()
                this.ingredients.push(last)
                this.ingredients.push({
                    id: last.id + 1,
                    title: this.newItem
                })
                this.newItem = ""
            }
        }
    }
</script>
