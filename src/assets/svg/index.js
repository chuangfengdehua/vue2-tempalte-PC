import Vue from 'vue'
import Svg from '@components/Svg.vue'
Vue.component('svg-icon', Svg)
const req = require.context('../svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
