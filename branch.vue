<template lang="pug">
  ul
    li
      transition(name="modal")
        .modal-mask(v-show="creating", @click.self="cancel")
          .modal-container
            .modal-content
              h1 Create New Node
              form(@keyup.enter="save")
                input(type="text", v-model="newNode.text", placeholder="Text: Google")
                input(type="text", v-model="newNode.link.type", placeholder="Type: link")
                template(v-show="newNode.link.type === 'router-link'")
                  input(type="text", v-model="newNode.link.key", placeholder="Key: path or name")
                input(type="text", v-model="newNode.link.value", placeholder="Value: https://www.google.com")
                .btn-group
                  button(type="button", @click="cancel").cancel Cancel
                  button(type="button", @click="save").save Save
      transition(name="modal")
        .modal-mask(v-show="editing", @click.self="cancel")
          .modal-container
            .modal-content
              h1 Edit Node
              form(@keyup.enter="save")
                input(type="text", v-model="text", placeholder="Text: Google")
                input(type="text", v-model="link.type", placeholder="Type: link")
                template(v-show="link.type === 'router-link'")
                  input(type="text", v-model="link.key", placeholder="Key: path or name")
                input(type="text", v-model="link.value", placeholder="Value: https://www.google.com")
                .btn-group
                  button(type="button", @click="cancel").cancel Cancel
                  button(type="button", @click="edit").save Edit
      .branch(:class="{ link: (nodes.length > 0) }")
        template(v-if="nodes.length > 0")
          template(v-if="open")
            fa(:icon="opened", @click="createNewNode").minus-square
          template(v-else)
            fa(:icon="closed", @click="createNewNode").plus-square
        
        template(v-if="link && link.value")
          router-link(:to="{ [link.key]: link.value, query: link.query || {}, params: link.params || {} }", v-if="link.type === 'router-link'").value
            fa(:icon="defaultIcon")
            | {{ text }}

          a(:href="link.value", target="_blank", v-else-if="link.type === 'link'").value
            fa(:icon="defaultIcon")
            | {{ text }}

          span(@click="editing = true", v-show="editable").edit Edit
        template(v-else)
          span(v-if="nodes.length > 0")
            fa(:icon="defaultIcon", v-show="showParentIcon.parentShow")
            | {{ text }}

          span(@click="createNewNode", v-else)
            fa(:icon="defaultIcon", v-show="showParentIcon.emptyParentShow")
            | {{ text }}

      draggable(:list="nodes", :group="{ name: 'g1' }", v-if="draggable")
        branch(
          v-for="(t, i) in nodes",
          :nodes.sync="t.nodes",
          :text="t.text",
          :type="t.type",
          :link="t.link",
          :class="{ open: open, first: i === 0 && !checkLast(i), last: checkLast(i) }",
          v-if="nodes",
          :closed="closed",
          :opened="opened",
          :defaultIcon="t.icon || defaultIcon",
          :editable="editable",
          :expanded.sync="expanded",
          :draggable.sync="draggable",
          :show-parent-icon="showParentIcon"
          :key="i"
        ).node
      template(v-else)
        branch(
          v-for="(t, i) in nodes",
          :nodes.sync="t.nodes",
          :text="t.text",
          :type="t.type",
          :link="t.link",
          :class="{ open: open, first: i === 0 && !checkLast(i), last: checkLast(i) }",
          v-if="nodes",
          :closed="closed",
          :opened="opened",
          :defaultIcon="t.icon || defaultIcon",
          :editable="editable",
          :expanded.sync="expanded",
          :draggable.sync="draggable",
          :show-parent-icon="showParentIcon"
          :key="i"
        ).node
</template>

<script>
  import draggable from 'vuedraggable'
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
      link: {
        type: Object,
        default: () => ({})
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
      },
      expanded: {
        type: Boolean,
        default: () => false
      },
      draggable: {
        type: Boolean,
        default: () => true
      },
      showParentIcon: {
        type: Object,
        default: () => ({
          parentShow: false,
          emptyParentShow: false,
        })
      }
    },
    data: () => ({
      open: false,
      clicks: 0,
      timer: null,
      newNode: {
        text: 'Google',
        link: {
          type: 'link',
          key: '',
          value: 'https://www.google.com'
        }
      },
      creating: false,
      editing: false,
      urlRegex: new RegExp(/^(https?:\/\/)?(www\.|[a-z\d]+\.)?[a-z]+(\.[a-z]{2,3}|:\d{2,5})(\.[a-z]{2,3})?(\/([\w\d]+)?)*((\?|&)[\w\d]+=[\w\d]+)*/)
    }),
    watch: {
      expanded: {
        handler: function (val) {
          this.open = val
        },
        immediate: true
      }
    },
    methods: {
      createNewNode () {
        if (this.editable) {
          this.clicks++
          if (this.clicks === 1) {
            const app = this
            this.timer = setTimeout(() => {
              app.toggle()
              app.clicks = 0
            }, 250);
          } else {
            clearTimeout(this.timer)
            this.clicks = 0
            this.creating = true
          }
        } else {
          this.toggle()
        }
      },
      cancel () {
        this.creating = false
        this.editing = false
        this.newNode = {
          text: 'Google',
          link: {
            type: 'link',
            key: '',
            value: 'https://www.google.com'
          }
        }
      },
      edit () {
        this.editing = false
        this.$emit('nodes', this.nodes)
      },
      save () {
        if (this.newNode.link.type === 'link')
          delete this.newNode.link.key
        this.nodes.push(this.newNode)
        this.creating = false
        this.newNode = {
          text: 'Google',
          type: 'link',
          value: 'https://www.google.com'
        }
        this.$emit('nodes', this.nodes)
      },
      toggle () {
        this.open = !this.open
      },
      checkLast (i) {
        return (i + 1) === this.nodes.length
      }
    },
    components: {
      draggable
    }
  }
</script>
