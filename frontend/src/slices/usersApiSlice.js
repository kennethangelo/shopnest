import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST', //default is GET
                body: data
            })
        })
    })
})

//if use query = ......Query
export const { useLoginMutation } = usersApiSlice;