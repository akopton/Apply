import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Layout } from "@/components/Layout/Layout";
import { ApplicationFormProvider } from "@/context/FormContext";
import { ApplicationsProvider } from "@/context/ApplicationsContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <ApplicationFormProvider>
          <ApplicationsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApplicationsProvider>
        </ApplicationFormProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
