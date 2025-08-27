import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: '../ApiService/Jobs.Api.json',
  apiFile: './src/store/api/empty-api.ts',
  apiImport: 'emptySplitApi',
  outputFiles: {
    './src/store/api/generated/jobs.ts': {
      filterEndpoints: [/Job/]
    },
  },
  exportName: 'jobsApi',
  hooks: true,
}

export default config