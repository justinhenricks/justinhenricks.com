import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="container h-full w-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl">ask (my ai) anything</h1>
      <Form>
        <input
          type="text"
          name="name"
          autoFocus
          placeholder="When is your next gig?"
          className="shadow-md min-w-[300px] p-2 bg-zinc-900 border ring-offset-zinc-900"
        />
      </Form>
    </div>
  );
}
