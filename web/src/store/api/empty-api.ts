import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const emptySplitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_DOTNET_API_URL }),
  tagTypes: ['JobApplication', 'Job', 'JobList', 'JobStats'],
  endpoints: () => ({}),
})

export const { reducer, reducerPath } = emptySplitApi;
