import { defaultConfig } from '@formkit/vue'
import { rootClasses } from '../formkit.theme.mjs'

export default defaultConfig({
  config: {
    rootClasses: (sectionName, node) => {
      const classes = rootClasses(sectionName, node)
      // Remove max-width constraint from outer wrapper for all input types
      if (sectionName === 'outer' && (node.props.type === 'text' || node.props.type === 'email' || node.props.type === 'password')) {
        return {
          ...classes,
          'max-w-[20em]': false,
          'w-full': true
        }
      }
      return classes
    }
  },
})