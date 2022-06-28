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

    vue-draggable(:list="nodes", :group="{ name: 'g1' }", v-if="draggable", item-key="text")
      template(#item="{node, i}")
        branch(
          v-if="nodes",
          :nodes.sync="node.nodes",
          :text="node.text",
          :type="node.type",
          :link="node.link",
          :class="{ open: open, first: i === 0 && !checkLast(i), last: checkLast(i) }",
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

<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'
import VueDraggable from 'vuedraggable'

const props = defineProps({
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
    type: [String, Object, Array]
  },
  opened: {
    type: [String, Object, Array]
  },
  defaultIcon: {
    type: [String, Object, Array]
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
    type: [Boolean, Object],
    default: false
  },
  showParentIcon: {
    type: Object,
    default: () => ({
      parentShow: false,
      emptyParentShow: false,
    })
  }
})

const emit = defineEmits(['nodes', 'update:expanded'])

const open = ref(false)
const clicks = ref(0)
const timer = ref(null)
const newNode = ref({
  text: 'Google',
  link: {
    type: 'link',
    key: '',
    value: 'https://www.google.com'
  }
})
const creating = ref(false)
const editing = ref(false)
const urlRegex = new RegExp(/^(https?:\/\/)?(www\.|[a-z\d]+\.)?[a-z]+(\.[a-z]{2,3}|:\d{2,5})(\.[a-z]{2,3})?(\/([\w\d]+)?)*((\?|&)[\w\d]+=[\w\d]+)*/)

watch(() => props.expanded, async (val) => {
  open.value = val
  emit('update:expanded', val)
}, { immediate: true })

const createNewNode = () => {
  if (props.editable) {
    clicks.value++
    if (clicks.value === 1) {
      timer.value = setTimeout(() => {
        toggle()
        clicks.value = 0
      }, 250);
    } else {
      clearTimeout(timer.value)
      clicks.value = 0
      creating.value = true
    }
  } else {
    toggle()
  }
}

const cancel = () => {
  creating.value = false
  editing.value = false
  newNode.value = {
    text: 'Google',
    link: {
      type: 'link',
      key: '',
      value: 'https://www.google.com'
    }
  }
}

const edit = () => {
  editing.value = false
  emit('nodes', props.nodes)
}

const save = () => {
  if (newNode.value.link.type === 'link')
    delete newNode.value.link.key
  props.nodes.push(newNode.value)
  creating.value = false
  newNode.value = {
    text: 'Google',
    type: 'link',
    value: 'https://www.google.com'
  }
  emit('nodes', props.nodes)
}

const toggle = () => {
  open.value = !open.value
}

const checkLast = (i) => (i + 1) === props.nodes.length
</script>
