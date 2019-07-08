<template>
    <v-text-field
        placeholder="New ingredient"
        v-model="newItem"
        clearable
        :append-outer-icon="newItem && newItem.length ? 'check' : ''"
        @click:append-outer="addNewItem"
        @keydown.enter="addNewItem"
        @keydown.esc="newItem=''"
    ></v-text-field>
</template>

<script>
    export default {
        data() {
            return {
                newItem: ""
            }
        },
        methods: {
            addNewItem() {
                let last = this.$parent.ingredients.pop()
                let ingredient = {
                    id: last.id + 1,
                    title: this.newItem
                }
                this.$emit('ingredient-added', ingredient)
                this.$parent.ingredients.push(last)
                this.$parent.ingredients.push(ingredient)
                this.newItem = ""
            }
        }
    }
</script>
