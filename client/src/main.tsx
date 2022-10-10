import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/apollo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import Home from "./pages/Home";
import ReactDOM from "react-dom/client";
import Result from "./pages/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/result/:id",
    element: <Result />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider
        theme={{
          globalStyles: (theme) => ({
            "*, *::before, *::after": {
              boxSizing: "border-box",
            },

            body: {
              ...theme.fn.fontStyles(),
              backgroundColor: "#fafafb",
              color: theme.black,
              lineHeight: theme.lineHeight,
              height: "100vh",
              width: "100%",
              display: "grid",
              placeItems: "center",
              [theme.fn.smallerThan("md")]: {
                padding: theme.spacing.xs,
              },
            },
            ".box": {
              backgroundColor: theme.white,
              padding: `${theme.spacing.lg}px ${theme.spacing.md}px`,
              borderRadius: theme.radius.md,
              boxShadow: theme.shadows.lg,
              textAlign: "center",
              width: 400,
            },
          }),
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <RouterProvider router={router} />
      </MantineProvider>
    </ApolloProvider>
  </StrictMode>
);
