/* eslint-disable -- Auto Generated File */
import { emptySplitApi as api } from "../empty-api";
export const addTagTypes = ["JobApplications"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getJobApplications: build.query<
        GetJobApplicationsApiResponse,
        GetJobApplicationsApiArg
      >({
        query: () => ({ url: `/api/JobApplications` }),
        providesTags: ["JobApplications"],
      }),
      createJobApplication: build.mutation<
        CreateJobApplicationApiResponse,
        CreateJobApplicationApiArg
      >({
        query: (queryArg) => ({
          url: `/api/JobApplications`,
          method: "POST",
          body: queryArg.createJobApplicationRequest,
        }),
        invalidatesTags: ["JobApplications"],
      }),
      getJobApplication: build.query<
        GetJobApplicationApiResponse,
        GetJobApplicationApiArg
      >({
        query: (queryArg) => ({ url: `/api/JobApplications/${queryArg.id}` }),
        providesTags: ["JobApplications"],
      }),
      updateJobApplication: build.mutation<
        UpdateJobApplicationApiResponse,
        UpdateJobApplicationApiArg
      >({
        query: (queryArg) => ({
          url: `/api/JobApplications/${queryArg.id}`,
          method: "PUT",
          body: queryArg.updateJobApplicationRequest,
        }),
        invalidatesTags: ["JobApplications"],
      }),
      deleteJobApplication: build.mutation<
        DeleteJobApplicationApiResponse,
        DeleteJobApplicationApiArg
      >({
        query: (queryArg) => ({
          url: `/api/JobApplications/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["JobApplications"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as jobApplicationsApi };
export type GetJobApplicationsApiResponse =
  /** status 200  */ JobApplicationDto[];
export type GetJobApplicationsApiArg = void;
export type CreateJobApplicationApiResponse = /** status 200  */ number;
export type CreateJobApplicationApiArg = {
  createJobApplicationRequest: CreateJobApplicationRequest;
};
export type GetJobApplicationApiResponse = /** status 200  */ JobApplicationDto;
export type GetJobApplicationApiArg = {
  id: number;
};
export type UpdateJobApplicationApiResponse = unknown;
export type UpdateJobApplicationApiArg = {
  id: number;
  updateJobApplicationRequest: UpdateJobApplicationRequest;
};
export type DeleteJobApplicationApiResponse = unknown;
export type DeleteJobApplicationApiArg = {
  id: number;
};
export type JobApplicationDto = {
  id?: number;
  jobTitle?: string;
  company?: string;
  dateApplied?: string;
  status?: string;
  description?: string | null;
  jobUrl?: string | null;
  salary?: string | null;
  location?: string | null;
};
export type CreateJobApplicationRequest = {
  jobTitle: string;
  company: string;
  dateApplied: string;
  status: string;
  description?: string | null;
  jobUrl?: string | null;
  salary?: string | null;
  location?: string | null;
};
export type UpdateJobApplicationRequest = {
  jobTitle: string;
  company: string;
  dateApplied: string;
  status: string;
  description?: string | null;
  jobUrl?: string | null;
  salary?: string | null;
  location?: string | null;
};
export const {
  useGetJobApplicationsQuery,
  useCreateJobApplicationMutation,
  useGetJobApplicationQuery,
  useUpdateJobApplicationMutation,
  useDeleteJobApplicationMutation,
} = injectedRtkApi;
