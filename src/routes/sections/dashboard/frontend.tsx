import { ROUTES } from "@/_mock/routes";
import type { RouteObject } from "react-router";
import { Component } from "./utils";

export const frontendDashboardRoutes: RouteObject[] = [
  { path: "workbench", element: Component("/pages/dashboard/workbench") },
  {
    path: "settings",
    children: [
      {
        path: ROUTES.SETTINGS.YEGAN,
        element: Component("/pages/settings/yegan"),
      },
      {
        path: ROUTES.SETTINGS.AMELE_KHARID,
        element: Component("/pages/settings/amele-kharid"),
      },
      {
        path: ROUTES.SETTINGS.EMZA_TANKHAH,
        element: Component("/pages/settings/emza-tankhah"),
      },
      {
        path: ROUTES.SETTINGS.EMZA_SANAD_BARGASHTI,
        element: Component("/pages/settings/emza-sanad-bargashti"),
      },
      {
        path: ROUTES.SETTINGS.EMZA_TAKHSIS,
        element: Component("/pages/settings/emza-takhsis"),
      },
      {
        path: ROUTES.SETTINGS.YEGAN_VAGOZAR,
        element: Component("/pages/settings/yegan-vagozar"),
      },
      {
        path: ROUTES.SETTINGS.FAALIAT,
        element: Component("/pages/settings/faaliat"),
      },
      {
        path: ROUTES.SETTINGS.BARNAME,
        element: Component("/pages/settings/barname"),
      },
      {
        path: ROUTES.SETTINGS.PEYMANKAR,
        element: Component("/pages/settings/peymankar"),
      },
    ],
  },
  {
    path: "mali",
    children: [
      {
        path: "bodjee",
        children: [
          {
            path: ROUTES.BUDGET.CREDIT,
            element: Component("/pages/mali/bodjee/budget"),
          },
          {
            path: ROUTES.BUDGET.TAKHSIS,
            element: Component("/pages/mali/bodjee/takhsis-budget"),
          },
          {
            path: ROUTES.BUDGET.TANKHAH,
            element: Component("/pages/mali/bodjee/tankhah-budget"),
          },
          {
            path: ROUTES.BUDGET.ELAMIE,
            element: Component("/pages/mali/bodjee/elamie-budget"),
          },
          {
            path: ROUTES.BUDGET.NON_CREDIT,
            element: Component("/pages/mali/bodjee/non-budget"),
          },
          {
            path: ROUTES.BUDGET.NON_TAKHSIS,
            element: Component("/pages/mali/bodjee/takhsis-non-budget"),
          },
          {
            path: ROUTES.BUDGET.NON_TANKHAH,
            element: Component("/pages/mali/bodjee/tankhah-non-budget"),
          },
          {
            path: ROUTES.BUDGET.NON_ELAMIE,
            element: Component("/pages/mali/bodjee/elamie-non-budget"),
          },
        ],
      },
      {
        path: "ezafekar",
        children: [
          {
            path: ROUTES.EZAFEKAR.FORM,
            element: Component("/pages/mali/ezafekar"),
          },
          {
            path: ROUTES.EZAFEKAR.REPORT,
            element: Component("/pages/mali/ezafekar/report"),
          },
        ],
      },
      {
        path: "padash",
        children: [
          // { index: true, element: <Navigate to="form" replace /> },
          {
            path: ROUTES.PADASH.FORM,
            element: Component("/pages/mali/padash"),
          },
          {
            path: ROUTES.PADASH.REPORT,
            element: Component("/pages/mali/padash/report"),
          },
          {
            path: ROUTES.PADASH.SETTINGS,
            element: Component("/pages/mali/padash/settings"),
          },
        ],
      },

      {
        path: "transfers",
        children: [
          {
            path: ROUTES.TRANSFERS.GHERMEZ,
            element: Component("/pages/mali/transfers/ghermez"),
          },
          {
            path: ROUTES.TRANSFERS.GHERMEZ_REPORT,
            element: Component("/pages/mali/transfers/reported-ghermez"),
          },
          {
            path: ROUTES.TRANSFERS.JABEJAE,
            element: Component("/pages/mali/transfers/jabejaie"),
          },
          {
            path: ROUTES.TRANSFERS.JABEJAE_REPORT,
            element: Component("/pages/mali/transfers/reported-jabejaie"),
          },
        ],
      },
    ],
  },
  {
    path: "users",
    children: [
      {
        path: ROUTES.USERS.PERSONS,
        element: Component("/pages/users/persons"),
      },
      {
        path: ROUTES.USERS.ADMINS,
        element: Component("/pages/users/admins"),
      },
      {
        path: ROUTES.USERS.ROLES,
        element: Component("/pages/users/roles"),
      },
      {
        path: ROUTES.USERS.AUTH_REPORT,
        element: Component("/pages/users/reported-auth"),
      },
      {
        path: ROUTES.USERS.PERMISSION,
        element: Component("/pages/users/permission"),
      },
    ],
  },
  {
    path: "user-profile",
    element: Component("/pages/my-profile"),
  },
];
