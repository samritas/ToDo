import type React from "react";

import type { Todo } from "./ui/to-do-page";

import { Edit3, Trash2} from "lucide-react";
import { Button } from "./button";

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function TodoCard({
  todo,
  onEdit,
  onDelete,
  className = "",
  style,
}: TodoCardProps) {
  
  return (
    <div
      className={`group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 ${className}`}
      style={style}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-white transition-all duration-300 mb-3">
            {todo.title}
          </h3>

          <p className="text-sm sm:text-base leading-relaxed mb-4 text-white/80 group-hover:text-white/90 transition-all duration-300">
            {todo.body}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(todo)}
            className="flex items-center gap-1 text-xs hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-400/30"
          >
            <Edit3 className="w-3 h-3" />
            <span className="hidden sm:inline">Edit</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onDelete(String(todo.id))}
            className="flex items-center gap-1 text-xs hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/30"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
