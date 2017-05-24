import Ember from 'ember'
import layout from '../templates/components/script-loader'

const NOT_STARTED = {}
const DONE = {}

function deferredDependency(getDependency) {
	let state = NOT_STARTED

	function register(fn) {
		if (state === NOT_STARTED) {
			state = [fn]
			getDependency(done)
		} else if (state === DONE) {
			fn()
		} else {
			state.push(fn)
		}
	}

	function done() {
		const listeners = state
		state = DONE
		for (let i = 0; i < listeners.length; i++) {
			listeners[i]()
		}
	}

	return register
}

function scriptLoader(script) {
	return function loadScript(done) {
		Ember.$.getScript(script, done)
	}
}

let loaders = {}

function ensureArray(x) {
	return x.constructor === Array ? x : [x]
}

export default Ember.Component.extend({
	layout,
	init() {
		this.set('loaded', false)

		const done = () => {
			this.set('loaded', true)
		}

		const scripts = ensureArray(this.get('script'))
		const len = scripts.length
		let count = 0

		if (len === 0) {
			done()
		} else {
			for (let i = 0; i < len; i++) {
				const script = scripts[i]

				if (!loaders.hasOwnProperty(script)) {
					loaders[script] = deferredDependency(scriptLoader(script))
				}

				const loader = loaders[script]

				loader(() => {
					count++
					if (count === len) done()
				})
			}
		}

		this._super(...arguments)
	}
})
