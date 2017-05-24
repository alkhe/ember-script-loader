# ember-script-loader

Dynamic script loader for Ember applications.

## Install

```sh
$ ember install ember-script-loader
```

## Usage

**spinjs-spinner.hbs**
```hbs
<div class='spinner'></div>
{{yield}}
```

**spinjs-spinner.js**
```hbs
import Ember from 'ember'

export default Ember.Component.extend({
	didInsertElement() {
		const target = this.$('.spinner')[0]
		new window.Spinner().spin(target)
	}
})
```

**application.hbs**
```hbs
{{#script-loader script='http://spin.js.org/spin.min.js'}}
  {{spinjs-spinner}}
{{/script-loader}}
```

## API

### script : string | [string]

Asynchronously load any number of scripts and render block content when all scripts have been sourced. Scripts that have previously been requested will return fast and no network request will be performed for that particular script.

**react-app.hbs**
```hbs
<div class='root'></div>
{{yield}}
```

**react-app.js**
```js
import Ember from 'ember'

export default Ember.Component.extend({
	didInsertElement() {
		const { React, ReactDOM } = window
		ReactDOM.render(<div>Hello!</div>, this.$('.root')[0])
	}
})
```

**application.hbs**
```hbs
{{#script-loader script=(list 'https://unpkg.com/react@15/dist/react.min.js' 'https://unpkg.com/react-dom@15/dist/react-dom.min.js')}}
  {{react-app}}
{{/script-loader}}
```
