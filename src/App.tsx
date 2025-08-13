import Logo from "@/assets/images/logo.png";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { MotionLazy } from "./components/animate/motion-lazy";
import { RouteLoadingProgress } from "./components/loading";
import Toast from "./components/toast";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";
import { useRestoreProfile } from "./hooks/useRestoreProfile";

function App({ children }: { children: React.ReactNode }) {
  useRestoreProfile();
  return (
    <HelmetProvider>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider adapters={[AntdAdapter]}>
          <VercelAnalytics />
          <Helmet>
            <title>نرم افزار اعتبارات</title>
            <link rel="icon" href={Logo} />
          </Helmet>
          <Toast />
          <RouteLoadingProgress />
          <MotionLazy>{children}</MotionLazy>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
