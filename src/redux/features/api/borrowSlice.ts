
import type { Borrow, BorrowRequest, BorrowSummary } from '@/type/BorrowType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api/borrow`,
  }),
  tagTypes: ['Borrow', 'Books'], // ✅ 'Books' tag included
  endpoints: (builder) => ({
    // GET borrowed books summary
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/',
      transformResponse: (response: any) => response.data ?? [], 
      providesTags: ['Borrow'],
    }),

    // POST borrow a book
    borrowBook: builder.mutation<Borrow, BorrowRequest>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Books', id: 'LIST' }, 'Borrow']

    }),
  }),
});

export const { useGetBorrowSummaryQuery, useBorrowBookMutation } = borrowApi;
