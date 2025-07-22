import axiosInstance from '../api/axiosInstance';
import type { PostPayload, Post } from './postsTypes';

const postsAPI = {
  getPosts: async (): Promise<Post[]> => {
    const response = await axiosInstance.get('/posts');
    return response.data;
  },

  createPost: async (data: PostPayload): Promise<Post> => {
    const response = await axiosInstance.post('/posts', data);
    return response.data;
  },

  updatePost: async (id: number, data: PostPayload): Promise<Post> => {
    const response = await axiosInstance.put(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: number): Promise<number> => {
    await axiosInstance.delete(`/posts/${id}`);
    return id; 
  },
};

export default postsAPI;
