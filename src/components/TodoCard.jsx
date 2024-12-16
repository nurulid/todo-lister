"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, CheckCheck, Trash2, Save, X } from "lucide-react";

export const TodoCard = ({ _id, content, ispriority, isdone }) => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const [isPriority, setIsPriority] = useState(ispriority);
  const [isDone, setIsDone] = useState(isdone);
  const [text, setText] = useState("Finished");

  const handleMouseEnter = () => {
    setText("Unfinish?");
  };

  const handleMouseLeave = () => {
    setText("Finished");
  };

  async function handleDelete() {
    await fetch(`https://v1.appbackend.io/v1/rows/frvryJAmRnM1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        isdeleted: true,
        deletedat: new Date(),
      }),
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
          <div
            className={`${
              isPriority
                ? "bg-[#162B5A] text-white border-white"
                : "bg-[#EEEED0] text-[#162B5A]"
            } mb-4 py-1 px-4 text-sm border border-[#162B5A] rounded-full inline-block`}
          >
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
            <>
              <button className="p-1 hover:text-red-700">
                <X onClick={() => setOnEdit(false)} />
              </button>
              <button
                className="p-1 text-green-600 hover:text-green-500"
                title="Update"
                onClick={handleUpdate}
              >
                <Save />
              </button>
            </>
          ) : !isDone ? (
            <>
              <button
                className="p-1 hover:opacity-70"
                title="Edit content"
                onClick={() => setOnEdit(true)}
              >
                <Pencil />
              </button>

              <button
                className="p-1 ml-2 text-red-700 hover:text-red-500   disabled:hover:text-red-700"
                title="Delete"
                onClick={handleDelete}
              >
                <Trash2 />
              </button>
            </>
          ) : null}
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
            <span
              className="text-base text-black"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {text}
            </span>
          ) : (
            <span>Mark as Finish</span>
          )}
          <CheckCheck size={20} color={isDone ? "black" : "green"} />
        </div>
      </div>
    </div>
  );
};
