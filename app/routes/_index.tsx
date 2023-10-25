import {
  json,
  type DataFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Form,
  LiveReload,
  Scripts,
  ScrollRestoration,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
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
      { error: "please provide a question", question: null, answer: null },
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

  return json({ question, answer, error: null });
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const error = actionData?.error;
  const [curQuestion, setCurQuestion] = useState("");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigation = useNavigation();
  // const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const placeholders = [
    "when is your next gig?",
    "tell me a bit about justin?",
    "what are some recent projects you've worked on?",
    "what are your favorite bands?",
    "what is some of your work experience?",
    "what albums have you worked on?",
  ];

  function getRandomPlaceholder(arr: string[]) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  return (
    <body className="bg-background text-foreground">
      <div className="flex h-full flex-col relative">
        <header className="container sticky top-0 flex w-full items-center justify-center text-teal-400 py-6">
          <div className="text-2xl">justin henricks</div>
          {/* <div>
              <nav>
                <ul className="flex gap-4 text-zinc-50">
                  <li>
                    <a href="/">home</a>
                  </li>
                  <li>
                    <a href="/about">about</a>
                  </li>
                </ul>
              </nav>
            </div> */}
        </header>

        <main className="relative w-full">
          <div className="container flex flex-col gap-4 mt-4">
            <div className="italic self-center text-xl font-bold">
              {curQuestion}
            </div>

            {/* This section will start in the bottom half of the screen */}
            <div className="md:w-3/4 lg:w-3/4 flex flex-col gap-2 md:container">
              {/* <div className="typewriter">{actionData?.answer}</div> */}

              {navigation.state === "submitting" ||
              navigation.state === "loading" ? (
                "..."
              ) : (
                <Typewriter text={actionData?.answer || ""} delay={50} />
              )}
            </div>
          </div>

          <div className="fixed bottom-0 gap-4 md:container w-full flex flex-col p-4 mb-2">
            <div className="md:w-3/4 lg:w-1/2 md:mx-auto flex flex-col gap-3">
              <h1 className="text-xl text-center">
                ask <span className="text-teal-400">(justy-bot&trade;)</span>{" "}
                anything
              </h1>
              <Form
                method="POST"
                className="w-full flex flex-col gap-3"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  const question = e.currentTarget.elements.namedItem(
                    "question"
                  ) as HTMLInputElement;

                  setCurQuestion(question.value);
                  setInputValue("");
                  inputRef.current?.focus();
                }}
              >
                <Input
                  type="text"
                  name="question"
                  // autoFocus
                  ref={inputRef}
                  placeholder={getRandomPlaceholder(placeholders)}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error || undefined}
                />
                {actionData?.error && (
                  <span className="text-destructive text-xs">
                    {actionData.error}
                  </span>
                )}
                <Button type="submit">ask</Button>
              </Form>
              <span className="text-xs text-primary/30 text-center">
                this is an experimental project using ai.
              </span>
            </div>
          </div>
        </main>
      </div>

      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  );
}

const Typewriter = ({ text, delay }: { text: string; delay: number }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <p>{currentText}</p>;
};
