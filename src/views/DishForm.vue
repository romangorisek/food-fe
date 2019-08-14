<template>
  <div>

     <form>
      <v-text-field
        label="Title"
        v-model="dish.title"
        :error-messages="errors.title"
        :counter="200"
        required
        @input="$v.dish.title.$touch()"
        @blur="$v.dish.title.$touch()"
      ></v-text-field>

      <v-textarea
        label="Description"
        v-model="dish.description"
        :error-messages="errors.description"
        :counter="4000"
        @input="$v.dish.description.$touch()"
        @blur="$v.dish.description.$touch()"
        :rows=15
        class="mt-4"
      ></v-textarea>

      <v-text-field
        label="Url"
        v-model="dish.url"
      ></v-text-field>

      <v-layout row wrap justify-space-between fill-height align-center text-xs-center class="mt-4 ingredient-row">
        <v-flex xs7>
          <v-autocomplete
            v-model="dish.ingredients"
            :items="ingredients"
            label="Ingredients"
            item-text="title"
            item-value="id"
            multiple
            chips
          >
          </v-autocomplete>
        </v-flex>
        <v-flex xs1>
          or
        </v-flex>
        <v-flex xs3>
          <add-new-ingredient />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-spacer></v-spacer>
        <router-link to="/dish-list"><v-btn>Cancel</v-btn></router-link>
        <v-btn 
          :loading="saving"
          :disabled="saving"
          @click="save"
        >
          Save
        </v-btn>
      </v-layout>
    </form>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import AddNewIngredient from '@/components/AddNewIngredient'
import store from '@/store/Index'
import EventBus from '@/EventBus'

export default {
  name: 'Dish',
  components: {
    AddNewIngredient
  },
  mixins: [validationMixin],
  validations: {
    dish: {
      title: {required, maxLength: maxLength(200)},
      description: {maxLength: maxLength(4000)}
    },
    newIngredient: {maxLength: maxLength(20)}
  },
  data () {
    return {
      newDish: {
        title: "",
        description: "",
        url: "",
        ingredients: []
      },
      saving: false
    }
  },
  computed: {
    isNewItem() {
      return this.$route.params.id ? false : true
    },
    ingredients() {
      return store.getters['Ingredients/filtered']('')
    },
    dish: {
      get() {
        return this.isNewItem ? this.newDish : this.storeDish
      },
      set(dish) {}
    },
    storeDish: {
      get() {
        return store.getters['Dishes/byId'](this.$route.params.id)
      },
      set(dish) {}
    },
    errors() {
        let errors = {}
        errors.title = []
        errors.description = []
        errors.newIngredient = []
        if (!this.$v.dish.title.$dirty) return errors
        !this.$v.dish.title.maxLength && errors.title.push('Title must be at most 200 characters long')
        !this.$v.dish.title.required && errors.title.push('Title is required.')
        !this.$v.newIngredient.maxLength && errors.newIngredient.push('Ingredient name must be at most 20 characters long')
        !this.$v.dish.description.maxLength && errors.description.push('Description must be at most 4000 characters long')
        return errors
      }
  },
  methods: {
    save() {
      this.$v.$touch()
      this.saving = true
      if (this.isNewItem) {
        this.$store.dispatch('Dishes/create', this.dish)
      } else {
        this.$store.dispatch('Dishes/update', this.dish)
      }
    }
  },
  created() {
    this.$store.dispatch('Dishes/getAll')
    this.$store.dispatch('Ingredients/getAll')
    

    EventBus.$on('dish-updated', () => {
      this.$router.push('/dish-list')
    })
    EventBus.$on('dish-created', () => {
      this.$router.push('/dish-list')
    })
    EventBus.$on('ingredient-created', (ingredient) => {
      console.log('ingredient-created event detected')
      if (this.isNewItem) {
        this.newDish.ingredients.push(ingredient.id)
      } else {
        this.storeDish.ingredients.push(ingredient.id)
      }
    })
  }
}
</script>
