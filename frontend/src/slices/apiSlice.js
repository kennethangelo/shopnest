import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

//Keep it empty because we use proxy
 const baseQuery = fetchBaseQuery({baseUrl: ''})

 export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], //for caching, bcs you dont want to fetch it all the time
    endpoints: (builder) => ({}) 
})