const path = require('path')
const VirtualModulesPlugin = require('webpack-virtual-modules')

const SCENE_INIT_CONTENT = `
import scene from './.expanse.json'

delete scene.history
delete scene.historyVersion

window.ecs.application.init(scene)

if (module.hot) {
  const isInline = window.location.href.includes('liveSyncMode=inline')

  const handler = isInline
    ? () => { }
    : async () => {
      const updatedScene = (await import('./.expanse.json')).default

      delete updatedScene.history
      delete updatedScene.historyVersion

      window.ecs.application.getScene().updateBaseObjects(updatedScene.objects)
      window.ecs.application.getScene().updateDebug(updatedScene)
    }

  module.hot.accept('./.expanse.json', handler)
}`

// Only app.ts starts the application. Helpers and tests are never auto-executed.
module.exports = ({srcDir}) => new VirtualModulesPlugin({
  [path.join(srcDir, 'entry.js')]: `import './app'\n${SCENE_INIT_CONTENT}`,
})
