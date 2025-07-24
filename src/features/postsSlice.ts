import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../components/ui/to-do-page';

interface TodoState {
  selectedTodo: Todo | null;
}

const initialState: TodoState = {
  selectedTodo: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setSelectedTodo: (state, action: PayloadAction<Todo | null>) => {
      state.selectedTodo = action.payload;
    },
  },
});

export const { setSelectedTodo } = todoSlice.actions;
export default todoSlice.reducer;
