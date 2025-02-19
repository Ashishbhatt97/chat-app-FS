import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseUrl = import.meta.env.VITE_API_URL;

export const groupApi = createApi({
  reducerPath: "groupApi",
  tagTypes: ["Group"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGroups: builder.query<ApiResponse<Group[]>, void>({
      query: () => `/group`,
      providesTags: ["Group"],
    }),
    createGroup: builder.mutation<
      ApiResponse<Group>,
      Omit<Group, "_id" | "active" | "admins" | "members">
    >({
      query: (body) => {
        return { url: `/group/`, method: "POST", body };
      },
      invalidatesTags: ["Group"],
    }),
    join: builder.mutation<
      ApiResponse<Group>,
      { groupId: string; userId: string }
    >({
      query: ({ groupId, userId }) => {
        console.log("Joining group with ID:", groupId, userId);
        return {
          url: `/group/${groupId}/join`,
          method: "POST",
          body: { userId: userId },
        };
      },
      invalidatesTags: ["Group"],
    }),
    getJoinedGroups: builder.query<ApiResponse<Group[]>, void>({
      query: () => `/group/joined`,
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useJoinMutation,
  useCreateGroupMutation,
  useGetJoinedGroupsQuery,
} = groupApi;
