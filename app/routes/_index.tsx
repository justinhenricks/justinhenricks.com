import { json, type DataFunctionArgs } from "@remix-run/node";
import {
  LiveReload,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import React, { Ref, RefObject, useEffect, useRef, useState } from "react";
import { Header } from "~/components/header";
import { SpinningLoader } from "~/components/spinning-loader";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useIsMobile } from "~/hooks/useIsMobile";

export async function loader({ params }: DataFunctionArgs) {
  const placeHolder = getRandomPlaceholder();

  return json({ placeHolder });
}

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();
  const question = body.get("question");

  if (!question || typeof question !== "string") {
    return json(
      {
        formError: "please provide a question",
        question: null,
        answer: null,
        newPlaceholder: null,
      },
      { status: 400 }
    );
  }

  const answerRes = await fetch(process.env.AI_API_URL!, {
    method: "POST",
    body: JSON.stringify({ question }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!answerRes.ok) {
    const errorData = await answerRes.json();

    throw new Response(errorData.message, {
      status: errorData.status,
    });
  }

  const { answer } = await answerRes.json();

  const newPlaceholder = getRandomPlaceholder();

  return json({ question, answer, formError: null, newPlaceholder });
}

function Chat({
  error,
  placeHolder,
  headerRef,
}: {
  error?: string;
  placeHolder: string;
  headerRef?: RefObject<HTMLElement>;
}) {
  const [curQuestion, setCurQuestion] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [containerMaxHeight, setContainerMaxHeight] = useState("45vh");
  const extraPadding = 48;
  const chatFormFetcher = useFetcher<typeof action>();
  const isMobile = useIsMobile();
  const chatInputBoxRef = useRef<HTMLDivElement>(null);
  const curQuestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formError = chatFormFetcher.data?.formError;

  const currentPlaceholder =
    chatFormFetcher.data?.newPlaceholder || placeHolder;

  if (!isMobile) {
    inputRef.current?.focus();
  }

  const updateContainerHeight = () => {
    let totalExternalHeight = 0;

    // Include header's height
    if (headerRef?.current) {
      totalExternalHeight += headerRef.current.offsetHeight;
    }

    if (curQuestionRef.current) {
      totalExternalHeight += curQuestionRef.current.offsetHeight;
    }

    if (chatInputBoxRef.current) {
      totalExternalHeight += chatInputBoxRef.current.offsetHeight;
    }

    const newMaxHeight = `calc(100vh - ${
      totalExternalHeight - extraPadding
    }px)`;
    setContainerMaxHeight(newMaxHeight);
  };

  useEffect(() => {
    // Initial and resize-based container height update
    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, [curQuestion]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const question = e.currentTarget.elements.namedItem(
      "question"
    ) as HTMLInputElement;
    setCurQuestion(question.value);
    setInputValue("");

    if (isMobile) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <div
        className="container flex flex-col gap-4 overflow-y-scroll"
        style={{ maxHeight: containerMaxHeight }}
      >
        <div
          className="italic self-center text-xl font-bold"
          ref={curQuestionRef}
        >
          {curQuestion}
        </div>

        <div className="md:w-3/4 lg:w-3/4 flex flex-col gap-2 md:container">
          {chatFormFetcher.state === "loading" ||
          chatFormFetcher.state === "submitting" ? (
            <span>
              <SpinningLoader />
            </span>
          ) : error ? (
            <>
              <span className="text-destructive">{error}</span>
            </>
          ) : (
            <Typewriter text={chatFormFetcher.data?.answer || ""} delay={50} />
          )}
        </div>
      </div>

      <div
        className="fixed bottom-0 gap-4 w-full flex flex-col p-4 mb-2"
        ref={chatInputBoxRef}
      >
        <div className="md:w-3/4 lg:w-1/2 md:mx-auto flex flex-col gap-3">
          <h1 className="text-xl text-center">
            ask <span className="text-teal-400">(my ai)</span> anything
          </h1>

          <chatFormFetcher.Form
            action="?index"
            id="chat-form"
            method="POST"
            className="w-full flex flex-col gap-3"
            onSubmit={handleFormSubmit}
          >
            <Input
              type="text"
              name="question"
              ref={inputRef}
              autoFocus={!isMobile}
              placeholder={currentPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-invalid={formError ? true : undefined}
              aria-describedby={formError || undefined}
            />
            {formError && (
              <span className="text-destructive text-xs">{formError}</span>
            )}
            <Button type="submit">ask</Button>
          </chatFormFetcher.Form>

          <span className="text-xs text-primary/30 text-center">
            this is an experimental project using gpt-4.
          </span>
        </div>
      </div>
    </>
  );
}

function Layout({
  children,
  headerRef,
}: {
  children: React.ReactNode;
  headerRef?: Ref<HTMLHeadingElement> | undefined;
}) {
  return (
    <body className="bg-background text-foreground">
      <div className="flex h-full flex-col relative">
        <Header ref={headerRef} />

        <main className="relative w-full">{children}</main>
      </div>

      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  );
}

export default function Index() {
  const { placeHolder } = useLoaderData<typeof loader>();
  const headerRef = useRef(null);

  return (
    <Layout headerRef={headerRef}>
      <Chat placeHolder={placeHolder} headerRef={headerRef} />
    </Layout>
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

export function ErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.data
    : "Sorry, something went wrong please try again!";

  return (
    <Layout>
      <Chat error={message} placeHolder="Tell me a bit about justin?" />
    </Layout>
  );
}

const placeholders = [
  "when is your next gig?",
  "tell me a bit about justin?",
  "what are some recent projects you've worked on?",
  "what are your favorite bands?",
  "explain your work experience?",
  "what albums have you worked on?",
  "What are some of your favorite albums?",
];

function getRandomPlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholders.length);
  return placeholders[randomIndex];
}
