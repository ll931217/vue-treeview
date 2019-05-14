<template lang="pug">
  #tree
    treeview(
      v-for="(t, i) in tree",
      :text.sync="t.text",
      :nodes.sync="t.nodes",
      :type.sync="t.type",
      :link.sync="t.link",
      :closed="icons.closed",
      :opened="icons.opened",
      :defaultIcon="icons.default",
      :editable="editable",
      :draggable="draggable",
      :key="i"
    ).treeview
    p Double click to create new node
</template>

<script>
import branch from './branch'

export default {
  name: 'TreeView',
  props: {
    tree: {
      type: Array,
      required: true,
      default: () => []
    },
    icons: {
      type: Object,
      default: () => ({
        closed: "plus-square",
        opened: "minus-square",
        default: "truck-loading"
      })
    },
    editable: {
      type: Boolean,
      default: () => true
    },
    draggable: {
      type: Boolean,
      default: () => true
    }
  },
  components: {
    treeview: branch
  }
}
</script>

<style lang="sass" scoped>
$border: 2px dashed #607d8b

#tree
  background-color: #36404a
  padding: 20px
  border: none
  border-radius: 10px
  box-shadow: 2px 2px 7px 3px #36404a

  .treeview
    font-family: "Roboto Mono"
    font-weight: Bold

    & /deep/ > li > ul.first
      li
        &:before
          display: block

    /deep/ ul
      &.last
        li:after
          display: none
      li
        position: relative
        &:after
          position: absolute
          content: ""
          top: 9px
          left: -15px
          border-left: $border
          border-top: $border
          border-radius: 5px 0 0 0
          width: 13px
          height: 89%

        &:before
          content: ""
          position: absolute
          top: -6px
          left: -15px
          border-left: $border
          border-bottom: $border
          border-radius: 0 0 0 5px
          width: 13px
          height: 15px
  
  p
    font-size: 12px
    font-style: italic

@font-face
  font-family: "Roboto Mono"
  font-weight: bold
  src: url("./assets/fonts/RobotoMono-Bold.ttf")
</style>
