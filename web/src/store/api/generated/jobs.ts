/* eslint-disable -- Auto Generated File */
import { emptySplitApi as api } from "../empty-api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getJobs: build.query<GetJobsApiResponse, GetJobsApiArg>({
      query: () => ({ url: `/api/Jobs` }),
    }),
    createJob: build.mutation<CreateJobApiResponse, CreateJobApiArg>({
      query: (queryArg) => ({
        url: `/api/Jobs`,
        method: "POST",
        body: queryArg.createJobCommand,
      }),
    }),
    getJob: build.query<GetJobApiResponse, GetJobApiArg>({
      query: (queryArg) => ({ url: `/api/Jobs/${queryArg.id}` }),
    }),
    updateJob: build.mutation<UpdateJobApiResponse, UpdateJobApiArg>({
      query: (queryArg) => ({
        url: `/api/Jobs/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateJobCommandDto,
      }),
    }),
    deleteJob: build.mutation<DeleteJobApiResponse, DeleteJobApiArg>({
      query: (queryArg) => ({
        url: `/api/Jobs/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as jobsApi };
export type GetJobsApiResponse = /** status 200  */ JobItem[];
export type GetJobsApiArg = void;
export type CreateJobApiResponse = /** status 200  */ number;
export type CreateJobApiArg = {
  createJobCommand: CreateJobCommand;
};
export type GetJobApiResponse = /** status 200  */ JobItem;
export type GetJobApiArg = {
  id: number;
};
export type UpdateJobApiResponse = unknown;
export type UpdateJobApiArg = {
  id: number;
  updateJobCommandDto: UpdateJobCommandDto;
};
export type DeleteJobApiResponse = unknown;
export type DeleteJobApiArg = {
  id: number;
};
export type JobStatus =
  | "Interested"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Accepted"
  | "Declined";
export type JobItem = {
  id?: number;
  title?: string | null;
  company?: string | null;
  dateApplied?: string;
  status?: JobStatus;
  description?: string | null;
  url?: string | null;
  location?: string | null;
  salary?: number | null;
};
export type CreateJobCommand = {
  title?: string;
  company?: string | null;
  dateApplied?: string;
  status?: JobStatus;
  description?: string | null;
  url?: string | null;
  location?: string | null;
  salary?: number | null;
};
export type UpdateJobCommandDto = {
  title?: string;
  company?: string | null;
  dateApplied?: string;
  status?: JobStatus;
  description?: string | null;
  url?: string | null;
  location?: string | null;
  salary?: number | null;
};
export const {
  useGetJobsQuery,
  useCreateJobMutation,
  useGetJobQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = injectedRtkApi;
