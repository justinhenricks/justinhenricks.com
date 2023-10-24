import {
  json,
  type DataFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();
  const question = body.get("question");

  if (!question || typeof question !== "string") {
    return json(
      { error: "Please provide a question", question: null, answer: null },
      { status: 400 }
    );
  }

  const answerRes = await fetch(
    "http://localhost:4000/public/answer-question",
    {
      method: "POST",
      body: JSON.stringify({ question }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { answer } = await answerRes.json();

  return json({ question, answer });
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  console.log(actionData);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const placeholders = [
    "When is justins next gig?",
    "Tell me a bit about justin?",
    "What's your favorite song?",
    "How do you write music?",
    "Who are your musical inspirations?",
    "Where can I get your album?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prevIdx) => (prevIdx + 1) % placeholders.length);
    }, 2500); // Change every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <div className="container h-full w-full flex flex-col justify-center items-center">
      <div className="md:w-3/4 lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl text-center">ask (my ai) anything</h1>
        <Form method="POST" className="w-full  flex flex-col gap-3">
          <Input
            type="text"
            name="question"
            autoFocus
            placeholder={placeholders[placeholderIdx]}
          />
          <Button type="submit">ask</Button>
        </Form>
        {actionData ? <div className="">{actionData.answer}</div> : null}
      </div>
    </div>
  );
}
