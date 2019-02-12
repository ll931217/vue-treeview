# TreeView for Vue.js

![TreeView Site](https://github.com/ll931217/vue-treeview/raw/master/assets/img-2019-02-12-085645.png)

## Usage

Install the package into your project:

    npm install --save @ll931217/vue-treeview

or

    yarn add @ll931217/vue-treeview

Add this to your `main.js` file:

```
import Vue from 'vue'
import TreeView from '@ll931217/vue-treeview'

Vue.use(TreeView)
```

Then add this to where you want to use the treeview:

```
tree-view(:tree="tree")
```

The treeview takes in the prop `tree`, which is in the following structure:

```
[{
  "text": "First Level",
  "nodes": [{
    "text": "Second Level",
    "nodes": [{
      "text": "Third Level",
      "nodes": [{
        "text": "Final Level",
        "value": "The Value"
      }]
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level",
      "nodes": [{
        "text": "Final Level",
        "value": "The Value"
      }, {
        "text": "Final Level",
        "value": "The Value"
      }]
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level",
      "nodes": [{
        "text": "Final Level",
        "value": "The Value"
      }]
    }]
  }, {
    "text": "Second Level",
    "nodes": [{
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }]
  }]
}, {
  "text": "First Level",
  "nodes": [{
    "text": "Second Level",
    "nodes": [{
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }]
  }, {
    "text": "Second Level",
    "nodes": [{
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level",
      "nodes": [{
        "text": "Final Level",
        "value": "The Value"
      }]
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }, {
      "text": "Third Level"
    }]
  }]
}]

```

## Upcoming Features

[-] Add `router-link` function to layer with `value` key
[-] Increase further customization with `style` prop
