import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'j9b3d8nb',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
  },
  typegen: {
    enabled: true,
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
    overloadClientMethods: true,
  },
})
