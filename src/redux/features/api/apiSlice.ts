import type { BookApiResponse, SingleBookApiResponse } from '@/type/BookType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://b5-a3-rosy.vercel.app/api/' }),
  tagTypes: ['Books'],

  endpoints: (builder) => ({

    // ✅ All Books with Pagination, Filter, and Sort
    getBooks: builder.query<
      BookApiResponse,
      {
        page?: number;
        limit?: number;
        filter?: string;
        sortBy?: string;
        sort?: 'asc' | 'desc';
      } | void
    >({
      query: (params) => {
        // default params
        const {
          page = 1,
          limit = 6,
          filter = '',
          sortBy = 'createdAt',
          sort = 'desc',
        } = params || {};

        let url = `books?page=${page}&limit=${limit}&sortBy=${sortBy}&sort=${sort}`;
        if (filter) url += `&filter=${encodeURIComponent(filter)}`;
        return url;
      },
      providesTags: ['Books'],
    }),

    // ✅ Single Book by ID
    getBookById: builder.query<SingleBookApiResponse, string>({
      query: (id) => `books/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    // ✅ Update Book
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: 'PUT', // ⚡ তোমার preference অনুযায়ী PATCH করলাম
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Books'],
    }),

    // ✅ Delete Book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),

    // ✅ Add Book
    addBook: builder.mutation({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useAddBookMutation,
} = apiSlice;
