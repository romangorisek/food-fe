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
                let ingredient = {
                    title: this.newItem
                }
                this.$store.dispatch('Ingredients/create', ingredient)
                this.newItem = ""
            }
        }
    }
</script>
