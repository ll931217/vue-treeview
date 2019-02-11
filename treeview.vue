<template lang="pug">
  ul
    li
      div(@click="toggle", :class="{ link: (nodes.length > 0) }").branch
        template(v-if="nodes.length > 0")
          template(v-if="open")
            fa(icon="minus-square").minus-square
          template(v-else)
            fa(icon="plus-square").plus-square
          span {{ text }}
        template(v-else-if="value")
          span(@click="").value
            fa(icon="truck-loading")
            | {{ text }}
        template(v-else)
          span {{ text }}
      treeview(v-for="(t, i) in nodes", :nodes="t.nodes", :text="t.text", :value="t.value", :class="{ open }", v-if="nodes", :key="i").node
</template>

<script>
  export default {
    name: 'TreeView',
    props: {
      text: {
        type: String,
        default: () => ''
      },
      nodes: {
        type: Array,
        default: () => []
      },
      value: {
        type: String,
        default: () => ''
      }
    },
    data () {
      return {
        open: false
      }
    },
    methods: {
      toggle () {
        this.open = !this.open
      }
    }
  }
</script>

<style lang="sass" scoped>
*
  user-select: none

svg
  margin-right: .5em

ul
  font-weight: bold
  list-style: none
  margin-bottom: 0
  padding-left: 20px
  white-space: nowrap

.branch
  // background-color: #36404a
  color: white
  cursor: pointer
  display: inline-flex
  align-items: center

.minus-square
  color: orange

.plus-square
  color: lightgreen

.value
  color: lightblue

.node
  height: 0
  opacity: 0
  visibility: hidden
  transition: all .5s ease-in-out
  text-transform: capitalize

  &.open
    height: 100%
    opacity: 1
    visibility: visible
</style>
