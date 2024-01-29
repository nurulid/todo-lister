import { TodoCard } from "@/components/TodoCard";
import { TodoInput } from "@/components/TodoInput";

async function getTodos() {
  const res = await fetch("https://v1.appbackend.io/v1/rows/frvryJAmRnM1", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const { data } = await getTodos();
  // console.log(data);

  return (
    <div className="max-w-[500px] mx-auto my-[40px]">
      <h1 className="text-white text-4xl text-center">Simplify With ToDoLister</h1>
      <TodoInput />
      <div className="flex flex-col gap-4">
        {data.map(({ _id, content, ispriority, isdone }) => {
          return (
            <TodoCard
              key={_id}
              _id={_id}
              content={content}
              ispriority={ispriority}
              isdone={isdone}
            />
          );
        })}
      </div>
    </div>
  );
}
