"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CheckCircle2, Plus } from "lucide-react";
import { TodoCard } from "../todo-card";
import { TodoForm } from "../todo-form";
import { ConfirmationModal } from "../confirmation-modal";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from "../../features/postsThunks";
import type { RootState, AppDispatch } from "../../app/store";
import { Button } from "../button";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

export default function TodoApp() {
  const dispatch = useDispatch<AppDispatch>();

  const postsState = useSelector((state: RootState) => state.posts);
  const { posts, loading, error } = postsState;

  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    todoId: number | null;
  }>({
    show: false,
    todoId: null,
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const addTodo = (title: string, body: string) => {
    const newTodo: PostPayload = {
      title,
      body,
      userId: 1,
    };
    dispatch(createPost(newTodo));
    setShowForm(false);
  };

  const updateTodo = (id: number, title: string, body: string) => {
    dispatch(updatePost({ id, data: { title, body, userId: 1 } }));
    setEditingTodo(null);
    setShowForm(false);
  };

  const deleteTodo = (id: number) => {
    dispatch(deletePost(id));
    setDeleteModal({ show: false, todoId: null });
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setDeleteModal({ show: true, todoId: id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-4 sm:p-6 lg:p-8">
      {/* Background  */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Todo
            <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Flow
            </span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Organize your thoughts, accomplish your goals, and flow through your
            day with elegance.
          </p>
        </div>

        {/* add Todo*/}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <Button
            variant="primary"
            onClick={() => {
              setEditingTodo(null);
              setShowForm(true);
            }}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Todo</span>
          </Button>
        </div>

        {/* Todo List */}
        {loading && <p className="text-center text-white">Loading todos...</p>}
        {error && <p className="text-center text-red-400">Error: {error}</p>}
        <div className="space-y-4 mt-8 mb-8">
          {posts.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 max-w-md mx-auto">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white/60" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">
                  No todos yet
                </h3>
                <p className="text-white/60">
                  Create your first todo to get started!
                </p>
              </div>
            </div>
          ) : (
            posts.map((todo, index) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={() => handleEdit(todo)}
                onDelete={() => handleDelete(todo.id)}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fade-in-up"
              />
            ))
          )}
        </div>

        {/* Form Modal */}
        {showForm && (
          <TodoForm
            todo={editingTodo}
            onSubmit={
              editingTodo
                ? (title, body) => updateTodo(editingTodo.id, title, body)
                : addTodo
            }
            onCancel={() => {
              setShowForm(false);
              setEditingTodo(null);
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteModal.show}
          title="Delete Todo"
          message="Are you sure you want to delete this todo? This action cannot be undone."
          onConfirm={() =>
            deleteModal.todoId !== null && deleteTodo(deleteModal.todoId)
          }
          onCancel={() => setDeleteModal({ show: false, todoId: null })}
        />
      </div>
    </div>
  );
}
