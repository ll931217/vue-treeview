<template lang="pug">
  #ll931217-vue-treeview
    treeview(
      v-for="(t, i) in tree",
      :text.sync="t.text",
      :nodes.sync="t.nodes",
      :type.sync="t.type",
      :link.sync="t.link",
      :closed="icons.closed",
      :opened="icons.opened",
      :defaultIcon="t.icon || icons.default",
      :editable="editable",
      :expanded="expanded",
      :draggable="draggable",
      :show-parent-icon="showParentIcon"
      :key="i"
    ).ll931217-vue-treeview
    if editable
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
    expanded: {
      type: Boolean,
      default: () => false
    },
    draggable: {
      type: Boolean,
      default: () => false
    },
    showParentIcon: {
      type: Object,
      default: () => ({
        parentShow: false,
        emptyParentShow: false,
      })
    }
  },
  components: {
    treeview: branch
  }
}
</script>

<style lang="sass">
$border: 2px dashed #607d8b

#ll931217-vue-treeview
  background-color: #36404a
  padding: 20px
  border: none
  border-radius: 10px
  box-shadow: 2px 2px 7px 3px #36404a

  svg
    margin-right: .5em

  ul
    font-family: "Roboto Mono"
    font-weight: Bold

    &.ll931217-vue-treeview > li:before, &.ll931217-vue-treeview > li:after
      display: none

    font-weight: bold
    list-style: none
    margin: 0
    padding-left: 20px
    white-space: nowrap

    &.last
      li:after
        display: none
    li
      position: relative

      .modal-mask
        background-color: rgba(0, 0, 0, .7)
        cursor: pointer
        display: flex
        justify-content: center
        align-items: center
        position: fixed
        z-index: 9998
        top: 0
        left: 0
        height: 100%
        width: 100%
        transition: opacity .3s ease

        .modal-container
          background-color: white
          border-radius: 2px
          box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
          cursor: default
          font-family: Helvetica, Arial, sans-serif
          margin: 40px auto 0
          padding: 20px 30px
          transition: all .3s ease

          .modal-content
            border-radius: 10px
            color: black
            margin: 1em
            padding: 1em
            width: 800px

            h1
              margin: 0

            form
              display: flex
              flex-wrap: wrap
              justify-content: flex-end
              width: 100%
              input
                border: 1px solid rgba(0, 0, 0, .5)
                border-radius: 5px
                font-size: 16px
                font-weight: bold
                margin: 1em 0
                padding: .2em .5em
                height: 30px
                width: 100%
              button
                background: none
                border-radius: 5px
                cursor: pointer
                font-size: 16px
                font-weight: bold
                height: 30px
                width: 80px
                transition: all .3s ease-in-out

                &.save
                  border: 3px solid #3498db
                  color: #3498db
                  margin-left: 1em

                  &:hover
                    background-color: #3498db

                &.cancel
                  border: 3px solid #f39c12
                  color: #f39c12
                  &:hover
                    background-color: #f39c12

                &:hover
                  color: white

      .branch
        color: white
        cursor: default
        display: inline-flex
        align-items: center
        width: 100%

        .minus-square, .plus-square
          cursor: pointer

        .minus-square
          color: orange

        .plus-square
          color: lightgreen

        .value
          color: lightblue

          &:hover
            color: orange

        .edit
          color: orange
          cursor: pointer
          margin-left: auto
          margin-right: 1em

          &:hover
            text-decoration: underline

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
        top: -5px
        left: -15px
        border-left: $border
        border-bottom: $border
        border-radius: 0 0 0 5px
        width: 13px
        height: 15px

  p
    font-size: 12px
    font-style: italic

.modal-enter, .modal-leave-active
  opacity: 0

.modal-enter .modal-container, .modal-leave-active .modal-container
  transform: scale(1.1)

@font-face
  font-family: "Roboto Mono"
  font-weight: bold
  src: url("./assets/fonts/RobotoMono-Bold.ttf")
</style>
