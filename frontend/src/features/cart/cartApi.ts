import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { CartItem } from "./cartSlice";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8070/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => "/cart",
      transformResponse: (response: { success: boolean; data: CartItem[] }) =>
        response.data,
      providesTags: ["Cart"],
    }),
    batchUpdateCart: builder.mutation<
      { success: boolean; message: string; data: CartItem[] },
      { items: { product_id: number; quantity: number }[] }
    >({
      query: (body) => ({
        url: "/cart/batch-update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useBatchUpdateCartMutation } = cartApi;
