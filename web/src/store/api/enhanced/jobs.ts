import { jobsApi as generatedJobsApi } from '../generated/jobs'

export const jobsApi = generatedJobsApi.enhanceEndpoints({
  addTagTypes: ['Job', 'JobList', 'JobStats'],
  endpoints: {
    getJobs: {
      providesTags: ['JobList', 'JobStats'],
    },
    getJob: {
      providesTags: (result, error, arg) => [{ type: 'Job', id: arg }],
    },
    createJob: {
      invalidatesTags: ['JobList', 'JobStats'],
    },
    updateJob: {
      invalidatesTags: (result, error, arg) => [
        { type: 'Job', id: arg.id },
        'JobList',
        'JobStats',
      ],
    },
    deleteJob: {
      invalidatesTags: (result, error, arg) => [
        { type: 'Job', id: arg },
        'JobList', 
        'JobStats',
      ],
    },
  },
})

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi

export type { JobItem } from '../generated/jobs'