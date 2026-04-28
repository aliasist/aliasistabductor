import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import * as Sentry from "@sentry/react";
import App from "./App";
import "./index.css";

Sentry.init({
  dsn: "https://f58609f03ea0f38b853896ae35547d20@o4511142133760000.ingest.us.sentry.io/4511142153093120",
  environment: import.meta.env.MODE,
  release: "aliasist@1.0.0",
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 0.5,   // 50% of transactions for performance monitoring
  replaysOnErrorSampleRate: 1.0, // full replay on every error
  replaysSessionSampleRate: 0.05, // 5% of sessions for general replay
  sendDefaultPii: false,
});


// Use dev Clerk key on localhost, prod key otherwise
const DEV_CLERK_KEY = import.meta.env.VITE_CLERK_DEV_PUBLISHABLE_KEY as string;
const PROD_CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string ?? "pk_live_Y2xlcmsuYWxpYXNpc3QuY29tJA";
const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
const PUBLISHABLE_KEY = isLocalhost && DEV_CLERK_KEY ? DEV_CLERK_KEY : PROD_CLERK_KEY;

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY ?? ""} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
);
