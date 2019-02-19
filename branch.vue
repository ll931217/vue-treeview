<template lang="pug">
  ul
    li
      div(@click="toggle", :class="{ link: (nodes.length > 0) }").branch
        template(v-if="nodes.length > 0")
          template(v-if="open")
            fa(:icon="opened").minus-square
          template(v-else)
            fa(:icon="closed").plus-square
          span {{ text }}
        template(v-else-if="value")
          router-link(:to="{ name: value }", v-if="type === 'router-link'").value
            fa(:icon="defaultIcon")
            | {{ text }}
          nuxt-link(:to="{ name: value }", v-else-if="type === 'nuxt-link'").value
            fa(:icon="defaultIcon")
            | {{ text }}
          a(:href="value", target="_blank" v-else).value
            fa(:icon="defaultIcon")
            | {{ text }}
        template(v-else)
          span {{ text }}
      branch(v-for="(t, i) in nodes", :nodes="t.nodes", :text="t.text", :type="t.type", :value="t.value", :class="{ open, first: i === 0 && !checkLast(i), last: checkLast(i) }", v-if="nodes", :closed="closed", :opened="opened", :defaultIcon="defaultIcon", :key="i").node
</template>

<script>
  export default {
    name: 'Branch',
    props: {
      text: {
        type: String,
        required: true,
        default: () => ''
      },
      nodes: {
        type: Array,
        default: () => []
      },
      type: {
        type: String,
        default: () => ''
      },
      value: {
        type: String,
        default: () => ''
      },
      closed: {
        type: String | Object | Array
      },
      opened: {
        type: String | Object | Array
      },
      defaultIcon: {
        type: String | Object | Array
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
      },
      checkLast (i) {
        return (i + 1) === this.nodes.length
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
  margin: 0
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
