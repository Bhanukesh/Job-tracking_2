import { jobsApi } from "../generated/jobs";

export const enhancedJobsApi = jobsApi.enhanceEndpoints({
    addTagTypes: [
        'JOB', 
    ],
    endpoints: {
        getJobs: {
            providesTags: ['JOB'],
        },
        getJob: {
            providesTags: (_result, _error, arg) => [{ type: 'JOB', id: arg.id }],
        },
        createJob: {
            invalidatesTags: ['JOB'],
        },
        updateJob: {
            invalidatesTags: (_result, _error, arg) => ['JOB', { type: 'JOB', id: arg.id }],
        },
        deleteJob: {
            invalidatesTags: (_result, _error, arg) => ['JOB', { type: 'JOB', id: arg.id }],
        },
    }
});

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = enhancedJobsApi;