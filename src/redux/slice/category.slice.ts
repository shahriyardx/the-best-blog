import { createSlice } from '@reduxjs/toolkit'
import { Category, Post } from '@prisma/client'
import type { PayloadAction } from '@reduxjs/toolkit'

type CategoriesValue = Category & { posts: Pick<Post, "id">[] }

export interface InitialState {
  value: CategoriesValue[],
  isLoading: boolean
}

const initialState: InitialState = {
  value: [],
  isLoading: true
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoriesValue[]>) => {
      state.value = action.payload
      state.isLoading = false
    }
  },
})

export const { setCategories } = categorySlice.actions
export default categorySlice.reducer