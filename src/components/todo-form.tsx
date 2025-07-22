import type React from "react";

import { useState, useEffect } from "react";
import type { Todo } from "./ui/to-do-page";
import { Button } from "./button";
import { X, Save, Plus } from "lucide-react";

interface TodoFormProps {
  todo?: Todo | null;
  onSubmit: (title: string, body: string) => void;
  onCancel: () => void;
}

export function TodoForm({ todo, onSubmit, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setBody(todo.body);
    } else {
      setTitle("");
      setBody("");
    }
    setIsVisible(true);
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit(title.trim(), body.trim());
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 w-full max-w-2xl shadow-2xl transition-all duration-500 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            {todo ? (
              <>
                <Save className="w-6 h-6 text-blue-400" />
                Edit Todo
              </>
            ) : (
              <>
                <Plus className="w-6 h-6 text-green-400" />
                Create Todo
              </>
            )}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 text-white/60 hover:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-white/80 text-sm font-medium mb-3"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm"
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-white/80 text-sm font-medium mb-3"
            >
              Description
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Add more details about this todo..."
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm resize-none"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 flex items-center justify-center gap-2 py-3"
              disabled={!title.trim() || !body.trim()}
            >
              {todo ? (
                <>
                  <Save className="w-4 h-4" />
                  Update Todo
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Todo
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="flex-1 sm:flex-none px-6 py-3"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
