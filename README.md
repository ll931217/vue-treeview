# TreeView for Vue.js

<p align="center"><img align="center" style="width:250px" src="https://media.giphy.com/media/fnGUkAxr8wLNNzIKtd/source.mp4" /></p>

## Usage

Install the package into your project:

    npm install --save @ll931217/vue-treeview

or

    yarn add @ll931217/vue-treeview

Add this to your `main.js` file:

```javascript
import Vue from 'vue'
import TreeView from '@ll931217/vue-treeview'

Vue.use(TreeView)
```

Then add this to where you want to use the treeview:

```javascript
tree-view(:tree="tree")
```

The treeview takes in the prop `tree`, which is in the following structure:

```json
[{
  "text": "Dogs",
  "nodes": [{
    "text": "Germany",
    "nodes": [{
      "text": "American Eskimo Dog",
      "nodes": [{
        "text": "Fluffy",
        "type": "link",
        "value": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/American_Eskimo_Dog_1.jpg/1920px-American_Eskimo_Dog_1.jpg"
      }]
    }, {
      "text": "Bavarian Mountain Hound"
    }, {
      "text": "Boxer",
      "nodes": [{
        "text": "Rip (Router-link)",
        "type": "router-link",
        "value": "d-ger-boxer-rip" // This is the name of the route
      }, {
        "text": "Mackenzie (Router-link)",
        "type": "router-link",
        "value": "d-ger-boxer-machenzie" // This is the name of the route
      }]
    }, {
      "text": "Bullenbeisser"
    }, {
      "text": "Dachshund"
    }, {
      "text": "Deutsche Bracke",
      "nodes": [{
        "text": "Mini",
        "type": "link",
        "value": "https://animalsbreeds.com/wp-content/uploads/2015/07/Deutsche-Bracke.jpg"
      }]
    }]
  }, {
    "text": "France",
    "nodes": [{
      "text": "Ariegeois"
    }, {
      "text": "Artois Hound"
    }, {
      "text": "Barbet"
    }, {
      "text": "Beagle-Harrier"
    }, {
      "text": "Beauceron"
    }, {
      "text": "Berger Picard"
    }, {
      "text": "Bloodhound"
    }]
  }]
}, {
  "text": "Cats",
  "nodes": [{
    "text": "Russia",
    "nodes": [{
      "text": "Donskoy"
    }, {
      "text": "Kurilian Bobtail"
    }, {
      "text": "Mekong Bobtail"
    }, {
      "text": "Siberian"
    }]
  }, {
    "text": "Thailand",
    "nodes": [{
      "text": "Khao Manee"
    }, {
      "text": "Korat"
    }, {
      "text": "Korn Ja"
    }, {
      "text": "Suphalak",
      "nodes": [{
        "text": "Moon",
        "type": "link",
        "value": "https://www.pets4homes.co.uk/images/articles/4198/what-is-a-suphalak-cat-5947aefcd4845.jpg"
      }]
    }]
  }]
}]
```

## Custom Icons

If you want to use custom icons, you can select them from [FontAwesome 5](https://fontawesome.com/icons?d=gallery), add them like this:

First download their packages (Solid icons are already available):

| Prop      | Type                 |
| --------- | -------------------- |
| tree      | `Array`              |
| icons     | `String` \| `Object` |

```vue
<template>
  <div id="app">
    <treeview :tree="tree" :icons="icons" />
  </div>
</template>

<script>
import { faChessQueen } from '@fortawesome/free-solid-svg-icons'

import Tree from './tree.json

export default {
  name: 'App',
  data () {
    return {
      tree: Tree,
      icons: {
        closed: 'angle-up',
        opened: 'angle-down',
        default: {
          prefix: 'fab',
          iconName: 'accessible-icon'
        }
      }
    }
  }
}
</script>
```

## Upcoming Features

- [x] Add `router-link` function to layer with `value` key
- [ ] Increase further customization with `style` prop
- [x] Change icons
