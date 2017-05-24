import Ember from 'ember'

export default Ember.Component.extend({
	didInsertElement() {
		const el = window.React.createElement
		window.ReactDOM.render(el('div', null, ['Hello!']), this.$('.root')[0])
	}
})
