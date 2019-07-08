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

      <v-layout row wrap justify-space-between fill-height align-center text-xs-center class="mt-4 ingredient-row">
        <v-flex xs7>
          <v-autocomplete
            v-model="selectedIngredients"
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

      <v-btn @click="save">Save</v-btn>
    </form>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import AddNewIngredient from '@/components/AddNewIngredient'

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
      dish: {
        title: "ribe, pire, zelenjava, solata",
        description: "Odtalit, odcedit, popivnat ribji file, preden gre v olje ga posolis in pomokas s koruzno moko."
      },
      ingredients: [],
      selectedIngredients: [],
      newIngredient: "",
      ingredients: [
        {
          id: "1",
          title: "Cesn"
        },
        {
          id: "2",
          title: "Cebula"
        },
        {
          id: "3",
          title: "Poper"
        },
        {
          id: "4",
          title: "Sol"
        }
      ]
    }
  },
  computed: {
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
      alert("yeeeey, its saved!")
    }
  }
}
</script>
