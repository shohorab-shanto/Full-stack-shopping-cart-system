import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../cart/cartSlice";

interface ProductResponse {
  success: boolean;
  data: {
    data: Product[];
    total: number;
    current_page: number;
    last_page: number;
  };
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8070/api",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, number | void>({
      query: (page = 1) => `/products?page=${page}`,
    }),
    getProduct: builder.query<{ success: boolean; data: Product }, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
