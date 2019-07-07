<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        fixed
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>restaurant</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Food plan</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/dish-list">
            <v-list-tile-action>
              <v-icon>fastfood</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dish list</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/ingredient-list">
            <v-list-tile-action>
              <ingredients-icon></ingredients-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Ingredient list</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Food plan</v-toolbar-title>
      </v-toolbar>
        
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
      
    </v-app>
  </div>
</template>

<script>
import IngredientsIcon from '@/components/IngredientsIcon'

export default {
  name: 'App',
  components: {
    IngredientsIcon
  },
  data: () => ({
    drawer: true
  })
}
</script>
