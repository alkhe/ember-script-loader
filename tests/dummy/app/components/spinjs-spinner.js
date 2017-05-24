import Ember from 'ember'

export default Ember.Component.extend({
	didInsertElement() {
		const props = this.getProperties([
			'lines',
			'length',
			'width',
			'radius',
			'scale',
			'corners',
			'color',
			'opacity',
			'rotate',
			'direction',
			'speed',
			'trail',
			'fps',
			'zIndex',
			'className',
			'top',
			'left',
			'shadow',
			'hwaccel',
			'position'
		])
		const target = this.$('.spinner')[0]
		new window.Spinner(props).spin(target)
	}
})
