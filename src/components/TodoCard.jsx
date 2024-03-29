"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, CheckCheck, Trash2, Save } from "lucide-react";

export const TodoCard = ({ _id, content, ispriority, isdone }) => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const [isPriority, setIsPriority] = useState(ispriority);
  const [isDone, setIsDone] = useState(isdone);

  async function handleDelete() {
    await fetch(`https://v1.appbackend.io/v1/rows/frvryJAmRnM1`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([_id]),
    });
    router.refresh();
  }

  async function handleUpdate() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/frvryJAmRnM1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        content: currentContent,
        ispriority: isPriority,
      }),
    });
    const data = await res.json();
    setOnEdit(false);
    router.refresh();
  }

  async function handleDone() {
    if (isDone === true) {
      setIsDone(false);
    } else {
      setIsDone(true);
    }

    const res = await fetch("https://v1.appbackend.io/v1/rows/frvryJAmRnM1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        isdone: !isDone,
      }),
    });
    const data = await res.json();
    router.refresh();
  }

  return (
    <div
      className={ispriority ? "card card--priority" : "card"}
      data-done={isDone ? "done" : ""}
    >
      <div className="flex justify-between items-start mb-3">
        {onEdit ? (
          <div className="mb-4 py-1 px-4 text-xs border border-white rounded-full inline-block hover:opacity-70">
            <label htmlFor={`priority-${_id}`} className="mr-2 cursor-pointer">
              High priority
            </label>
            <input
              id={`priority-${_id}`}
              type="checkbox"
              checked={isPriority}
              //   value={isPriority}
              onChange={(e) => setIsPriority(e.currentTarget.checked)}
              className="default:ring-2 cursor-pointer"
            />
          </div>
        ) : (
          <>
            {isPriority ? (
              <div className="pill-label">High</div>
            ) : (
              <div className="pill-label">Medium</div>
            )}
          </>
        )}

        <div>
          {onEdit ? (
            <button
              className="p-1 text-green-600 hover:text-green-500"
              title="Update"
              onClick={handleUpdate}
            >
              <Save />
            </button>
          ) : (
            <>
              <button
                className="p-1 hover:opacity-70"
                title="Edit content"
                onClick={() => setOnEdit(true)}
              >
                <Pencil />
              </button>

              <button
                className="p-1 ml-2 text-red-700 hover:text-red-500"
                title="Delete"
                onClick={handleDelete}
              >
                <Trash2 />
              </button>
            </>
          )}
        </div>
      </div>
      {onEdit ? (
        <textarea
          className="border-b border-gray-800 w-full bg-[#EEEED0] mb-3 outline-none"
          rows={4}
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
        />
      ) : (
        <div className="mb-6">{content}</div>
      )}

      <div className="card-actions flex justify-between items-end">
        <div className="avatar text-sm w-[40px] h-[40px] rounded-full bg-gray-400">
          <img
            src="/neva-masquerade-royalty-free-image-1674509896.jpg"
            className="rounded-full"
            alt=""
          />
        </div>
        <div
          onClick={handleDone}
          className="todo-mark flex items-center gap-2 text-xs cursor-pointer text-green-700 hover:text-green-600"
        >
          {isDone ? (
            <span className="text-base text-black" title="Undo?">
              Finished
            </span>
          ) : (
            <span>Mark as Finish</span>
          )}
          <CheckCheck size={20} color={isDone ? "black": "green"}/>
        </div>
      </div>
    </div>
  );
};
