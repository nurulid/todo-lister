"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const TodoInput = () => {
  const router = useRouter();
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
    if (e.target.value.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  async function createTodo() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/frvryJAmRnM1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          content: todo,
          isdone: "",
          ispriority: priority,
        },
      ]),
    });
    const data = await res.json();
    router.refresh();
    setTodo("");
    setPriority(false);
    setIsButtonDisabled(true);
  }

  return (
    <div className="mb-5 todo-input">
      <textarea
        className="border-b border-[#162B5A] w-full bg-[#EEEED0] mb-3 outline-none"
        rows={5}
        value={todo}
        onChange={handleInputChange}
        placeholder="Type new todo here..."
      />
      <div
        className={`${ priority ? "bg-[#162B5A] text-white" : ""
        } mb-4 py-1 px-4 text-sm border border-[#162B5A] rounded-full inline-block`}
      >
        <label htmlFor="priority" className={`mr-2 cursor-pointer`}>
          High priority
        </label>
        <input
          id="priority"
          type="checkbox"
          value={priority}
          onChange={(e) => setPriority(e.currentTarget.checked)}
          className="default:ring-2 cursor-pointer"
          checked={priority}
        />
      </div>
      <button
        className="bg-[#162B5A] hover:bg-[#1d3c7e] text-[#dbe3f5] w-full p-3 rounded-full"
        onClick={createTodo}
        disabled={isButtonDisabled}
      >
        Add Todo
      </button>
    </div>
  );
};
