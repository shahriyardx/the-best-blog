import { Category } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Categories = (Category & { posts: { id: string }[] })[] | undefined;
export type CategoryState = {
  value: Categories;
  isLoading: boolean;
};

const initialState: CategoryState = {
  value: [],
  isLoading: true,
};

export const categorySlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCategories: (
      state: CategoryState,
      action: PayloadAction<Categories>
    ) => {
      state.value = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
