<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mb-2">
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs11>
                <router-link to="/dish/12">
                  ribe, pire, zelenjava, solata
                </router-link>
              </v-flex>
              <v-flex xs1>
                <v-btn icon small to="/dish/12 ">
                  <v-icon>
                    edit
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
  name: "DishList",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #616161;
}
</style>
