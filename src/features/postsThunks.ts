import { createAsyncThunk } from '@reduxjs/toolkit';
import postsAPI from './postsAPI';
import type { PostPayload } from './postsTypes';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return await postsAPI.getPosts();
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (data: PostPayload) => {
    return await postsAPI.createPost(data);
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, data }: { id: number; data: PostPayload }) => {
    return await postsAPI.updatePost(id, data);
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number) => {
    return await postsAPI.deletePost(id);
  }
);
