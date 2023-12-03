import { cssBundleHref } from "@remix-run/css-bundle";
import { DataFunctionArgs, json, type LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  useFetcher,
  useFetchers,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";

import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { z } from "zod";
import styles from "~/styles/tailwind.css";
import { ErrorList } from "./components/forms";
import { ClientHintCheck, getHints, useHints } from "./lib/client-hints";
import { useRequestInfo } from "./lib/request-info";
import { getTheme, setTheme, Theme } from "./lib/theme.server";
import { getDomainUrl } from "./lib/utils";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export async function loader({ request }: DataFunctionArgs) {
  return json({
    requestInfo: {
      hints: getHints(request),
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
      userPrefs: {
        theme: getTheme(request),
      },
    },
  });
}

const ThemeFormSchema = z.object({
  theme: z.enum(["system", "light", "dark"]),
});

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, {
    schema: ThemeFormSchema,
  });
  if (submission.intent !== "submit") {
    return json({ status: "idle", submission } as const);
  }
  if (!submission.value) {
    return json({ status: "error", submission } as const, { status: 400 });
  }
  const { theme } = submission.value;

  const responseInit = {
    headers: { "set-cookie": setTheme(theme) },
  };
  return json({ success: true, submission }, responseInit);
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const theme = useTheme();

  return (
    <html lang="en" className={`overflow-x-hidden ${theme}`}>
      <head>
        <ClientHintCheck />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <Outlet
        context={{
          themeSwitch: (
            <ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />
          ),
        }}
      />
    </html>
  );
}
type ContextType = { themeSwitch: JSX.Element };

export function useThemeSwitch() {
  return useOutletContext<ContextType>();
}

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  const optimisticMode = useOptimisticThemeMode();
  if (optimisticMode) {
    return optimisticMode === "system" ? hints.theme : optimisticMode;
  }
  return requestInfo.userPrefs.theme ?? hints.theme;
}

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticThemeMode() {
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find((f) => f.formAction === "/");

  if (themeFetcher && themeFetcher.formData) {
    const submission = parse(themeFetcher.formData, {
      schema: ThemeFormSchema,
    });
    return submission.value?.theme;
  }
}

export function ThemeSwitch({
  userPreference,
}: {
  userPreference?: Theme | null;
}) {
  const fetcher = useFetcher<typeof action>();

  const [form] = useForm({
    id: "theme-switch",
    lastSubmission: fetcher.data?.submission,
  });

  const optimisticMode = useOptimisticThemeMode();
  const mode = optimisticMode ?? userPreference ?? "system";
  const nextMode =
    mode === "system" ? "light" : mode === "light" ? "dark" : "system";
  const modeLabel = {
    light: (
      <>
        <SunIcon className="text-foreground h-5 w-5" />
        <span className="sr-only">Light</span>
      </>
    ),
    dark: (
      <>
        <MoonIcon className="text-foreground h-5 w-5" />
        <span className="sr-only">Dark</span>
      </>
    ),
    system: (
      <>
        <LaptopIcon className="text-foreground h-5 w-5" name="laptop" />
        <span className="sr-only">System</span>
      </>
    ),
  };

  return (
    <fetcher.Form action="/" method="POST" {...form.props}>
      <input type="hidden" name="theme" value={nextMode} />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex h-8 w-8 cursor-pointer items-center justify-center"
        >
          {modeLabel[mode]}
        </button>
      </div>
      <ErrorList errors={form.errors} id={form.errorId} />
    </fetcher.Form>
  );
}
