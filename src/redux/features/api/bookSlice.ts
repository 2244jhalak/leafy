import type { BookApiResponse, SingleBookApiResponse } from '@/type/BookType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api/` }),
  tagTypes: ['Books'],

  endpoints: (builder) => ({
    getBooks: builder.query<BookApiResponse, { page?: number; limit?: number; filter?: string; sortBy?: string; sort?: 'asc' | 'desc' } | void>({
      query: (params) => {
        const { page = 1, limit = 6, filter = '', sortBy = 'createdAt', sort = 'desc' } = params || {};
        let url = `books?page=${page}&limit=${limit}&sortBy=${sortBy}&sort=${sort}`;
        if (filter) url += `&filter=${encodeURIComponent(filter)}`;
        return url;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.data.map(({ _id }) => ({ type: 'Books' as const, id: _id })),
              { type: 'Books', id: 'LIST' },
            ]
          : [{ type: 'Books', id: 'LIST' }],
    }),

    getBookById: builder.query<SingleBookApiResponse, string>({
      query: (id) => `books/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    addBook: builder.mutation({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: [{ type: 'Books', id: 'LIST' }],
    }),

    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Books', id }, { type: 'Books', id: 'LIST' }],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Books', id }, { type: 'Books', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = apiSlice;
