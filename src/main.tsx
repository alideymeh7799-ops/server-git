import "./global.css";
import "./locales/i18n";
import "./theme/theme.css";

import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import worker from "./_mock";
import { registerLocalIcons } from "./components/icon";
import PageError from "./pages/sys/error/PageError";
import { routesSection } from "./routes/sections";
import { urlJoin } from "./utils";

const { VITE_APP_BASE_PATH = "/" } = import.meta.env;

await registerLocalIcons();

worker.start({
	onUnhandledRequest: "bypass",
	serviceWorker: { url: urlJoin(VITE_APP_BASE_PATH, "mockServiceWorker.js") },
});

if (import.meta.env.VITE_USE_REACT_SCAN === "true") {
	import("react-scan").then(({ scan }) => {
		scan({
			enabled: true,
			showToolbar: true,
			log: false,
			animationSpeed: "fast",
		});
	});
}

const router = createBrowserRouter(
	[
		{
			Component: () => (
				<App>
					<Outlet />
				</App>
			),
			errorElement: <ErrorBoundary fallbackRender={PageError} />,
			children: routesSection,
		},
	],
	{
		basename: VITE_APP_BASE_PATH,
	},
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);
