<template lang="pug">
  ul
    li
      .modal-container(v-show="creating", @click.self="cancel")
        .modal-content
          h1 Create New Node
          form
            input(type="text", v-model="newNode.text", placeholder="Text: Google")
            input(type="text", v-model="newNode.type", placeholder="Type: link")
            input(type="text", v-model="newNode.value", placeholder="Value: https://www.google.com")
            .btn-group
              button(type="button", @click="cancel").cancel Cancel
              button(type="button", @click="save").save Save
      .branch(@click="createNewNode", :class="{ link: (nodes.length > 0) }")
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
          a(:href="value", target="_blank" v-else).value
            fa(:icon="defaultIcon")
            | {{ text }}
        template(v-else)
          span {{ text }}
      branch(v-for="(t, i) in nodes", :nodes.sync="t.nodes", :text="t.text", :type="t.type", :value="t.value", :class="{ open, first: i === 0 && !checkLast(i), last: checkLast(i) }", v-if="nodes", :closed="closed", :opened="opened", :defaultIcon="defaultIcon", :key="i").node
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
      },
      editable: {
        type: Boolean,
        default: () => true
      }
    },
    data () {
      return {
        open: false,
        clicks: 0,
        timer: null,
        newNode: {
          text: "Google",
          type: "link",
          value: "https://www.google.com"
        },
        creating: false,
        urlRegex: new RegExp(/^(https?:\/\/)?(www\.|[a-z\d]+\.)?[a-z]+(\.[a-z]{2,3}|:\d{2,5})(\.[a-z]{2,3})?(\/([\w\d]+)?)*((\?|&)[\w\d]+=[\w\d]+)*/)
      }
    },
    methods: {
      toggle () {
        this.open = !this.open
      },
      checkLast (i) {
        return (i + 1) === this.nodes.length
      },
      createNewNode() {
        if (this.editable) {
          this.clicks++
          if (this.clicks === 1) {
            const app = this
            this.timer = setTimeout(() => app.toggle(), 280);
          } else {
            clearTimeout(this.timer)
            this.clicks = 0
            this.creating = true
          }
        } else {
          this.toggle
        }
      },
      cancel () {
        this.creating = false
        this.newNode = {
          text: "Google",
          type: "link",
          value: "https://www.google.com"
        }
      },
      save() {
        this.nodes.push(this.newNode)
        this.$emit("nodes", this.nodes)
        this.creating = false
        this.newNode = {
          text: "Google",
          type: "link",
          value: "https://www.google.com"
        }
        console.log("NEW NODE CREATED FOR " + this.text + " !")
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

.modal-container
  align-items: center
  background-color: rgba(0, 0, 0, .7)
  cursor: pointer
  display: flex
  height: 100%
  width: 100%
  justify-content: center
  position: absolute
  top: 0
  left: 0
  z-index: 999

  .modal-content
    background-color: white
    border-radius: 10px
    color: black
    cursor: default
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
</style>
