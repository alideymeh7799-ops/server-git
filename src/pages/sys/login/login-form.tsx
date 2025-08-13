import { DB_USER } from "@/_mock/assets_backup";
import type { SignInReq } from "@/api/services/userService";
import { Icon } from "@/components/icon";
import useCustomAxios from "@/hooks/use-request";
import { useUserActions } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/login-provider";
import { setCookie } from "@/hooks/useCookie";
import useProfile from "@/store/profile";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const navigatge = useNavigate();
  // const signIn = useSignIn();
  const { setUserToken, setUserInfo } = useUserActions();
  const { loginState, setLoginState } = useLoginStateContext();

  const form = useForm<SignInReq>({
    defaultValues: {
      username: DB_USER[0].username,
      password: DB_USER[0].password,
    },
  });

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const sendDataAuthToServer = useCustomAxios().usePostData<any>(
    "/auth/login",
    { "content-type": "application/json" }
  );
  const setProfile = useProfile((state: any) => state.setProfile);
  const handleFinish = async (values: SignInReq) => {
    setLoading(true);
    try {
      const response = await sendDataAuthToServer.sendData(values);

      if (response.success) {
        toast.success(response.message, {
          closeButton: true,
        });

        const profileDataWithTimestamp = {
          ...response.data,
          loginTimestamp: new Date().getTime(),
        };

        localStorage.setItem(
          "user-profile",
          JSON.stringify(profileDataWithTimestamp)
        );

        setProfile(profileDataWithTimestamp);

        setCookie("token-data", response.credentials.access_token);

        navigatge(HOMEPAGE, { replace: true });
      } else {
        toast.success("Sign in success!", {
          closeButton: true,
        });
        setUserToken({
          accessToken: "b293ebe9-87b2-472d-9d11-8504e3f9939a",
          refreshToken: "df6f5b7c-7fcb-4101-b33c-4ad412d6f5aa",
        });
        setUserInfo({
          id: "user_admin_id",
          username: "admin",
          avatar: "https://avatars.githubusercontent.com/u/91092347",
          email: "admin@slash.com",
          roles: [
            {
              id: "role_admin_id",
              name: "admin",
              code: "SUPER_ADMIN",
            },
          ],
          permissions: [
            {
              id: "permission_create",
              name: "permission-create",
              code: "permission:create",
            },
            {
              id: "permission_read",
              name: "permission-read",
              code: "permission:read",
            },
            {
              id: "permission_update",
              name: "permission-update",
              code: "permission:update",
            },
            {
              id: "permission_delete",
              name: "permission-delete",
              code: "permission:delete",
            },
          ],
          menu: [
            {
              id: "group_dashboard",
              name: "sys.nav.dashboard",
              code: "dashboard",
              parentId: "",
              type: 0,
              children: [
                {
                  id: "workbench",
                  parentId: "group_dashboard",
                  name: "sys.nav.workbench",
                  code: "workbench",
                  icon: "local:ic-workbench",
                  type: 2,
                  path: "/workbench",
                  component: "/pages/dashboard/workbench",
                  children: [],
                },
                {
                  id: "analysis",
                  parentId: "group_dashboard",
                  name: "sys.nav.analysis",
                  code: "analysis",
                  icon: "local:ic-analysis",
                  type: 2,
                  path: "/analysis",
                  component: "/pages/dashboard/analysis",
                  children: [],
                },
              ],
            },
            {
              id: "group_pages",
              name: "sys.nav.pages",
              code: "pages",
              parentId: "",
              type: 0,
              children: [
                {
                  id: "management",
                  parentId: "group_pages",
                  name: "sys.nav.management",
                  code: "management",
                  icon: "local:ic-management",
                  type: 1,
                  path: "/management",
                  children: [
                    {
                      id: "management_user",
                      parentId: "management",
                      name: "sys.nav.user.index",
                      code: "management:user",
                      type: 1,
                      path: "/management/user",
                      children: [
                        {
                          id: "management_user_profile",
                          parentId: "management_user",
                          name: "sys.nav.user.profile",
                          code: "management:user:profile",
                          type: 2,
                          path: "management/user/profile",
                          component: "/pages/management/user/profile",
                          children: [],
                        },
                        {
                          id: "management_user_account",
                          parentId: "management_user",
                          name: "sys.nav.user.account",
                          code: "management:user:account",
                          type: 2,
                          path: "management/user/account",
                          component: "/pages/management/user/account",
                          children: [],
                        },
                      ],
                    },
                    {
                      id: "management_system",
                      parentId: "management",
                      name: "sys.nav.system.index",
                      code: "management:system",
                      type: 1,
                      path: "management/system",
                      children: [
                        {
                          id: "management_system_user",
                          parentId: "management_system",
                          name: "sys.nav.system.user",
                          code: "management:system:user",
                          type: 2,
                          path: "/management/system/user",
                          component: "/pages/management/system/user",
                          children: [],
                        },
                        {
                          id: "management_system_role",
                          parentId: "management_system",
                          name: "sys.nav.system.role",
                          code: "management:system:role",
                          type: 2,
                          path: "/management/system/role",
                          component: "/pages/management/system/role",
                          children: [],
                        },
                        {
                          id: "management_system_permission",
                          parentId: "management_system",
                          name: "sys.nav.system.permission",
                          code: "management:system:permission",
                          type: 2,
                          path: "/management/system/permission",
                          component: "/pages/management/system/permission",
                          children: [],
                        },
                        {
                          id: "management_system_amele-kharid",
                          parentId: "management_system",
                          name: "عاملین خرید",
                          code: "management:system:amele-kharid",
                          type: 2,
                          path: "/management/system/amele-kharid",
                          component: "/pages/management/system/amele-kharid",
                          children: [],
                        },
                        {
                          id: "management_system_yegan",
                          parentId: "management_system",
                          name: "sys.nav.system.yegan",
                          code: "management:system:yegan",
                          type: 2,
                          path: "/management/system/yegan",
                          component: "/pages/management/system/yegan",
                          children: [],
                        },
                        {
                          id: "management_system_yegan",
                          parentId: "management_system",
                          name: "sys.nav.system.yegan",
                          code: "management:system:yegan",
                          type: 2,
                          path: "/management/system/yegan",
                          component: "/pages/management/system/yegan",
                          children: [],
                        },
                        {
                          id: "management_system_amele-kharid",
                          parentId: "management_system",
                          name: "sys.nav.system.amele-kharid",
                          code: "management:system:amele-kharid",
                          type: 2,
                          path: "/management/system/amele-kharid",
                          component: "/pages/management/system/amele-kharid",
                          children: [],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "menulevel",
                  parentId: "group_pages",
                  name: "sys.nav.menulevel.index",
                  code: "menulevel",
                  icon: "local:ic-menulevel",
                  type: 1,
                  path: "/menu_level",
                  children: [
                    {
                      id: "menulevel_1b",
                      parentId: "menulevel",
                      name: "sys.nav.menulevel.1b.index",
                      code: "menulevel:1b",
                      type: 1,
                      path: "/menu_level/1b",
                      component: "/pages/menu-level/menu-level-1b",
                      children: [
                        {
                          id: "menulevel_1b_2a",
                          parentId: "menulevel_1b",
                          name: "sys.nav.menulevel.1b.2a",
                          code: "menulevel:1b:2a",
                          type: 2,
                          path: "/menu_level/1b/2a",
                          component:
                            "/pages/menu-level/menu-level-1b/menu-level-2a",
                          children: [],
                        },
                        {
                          id: "menulevel_1b_2b",
                          parentId: "menulevel_1b",
                          name: "sys.nav.menulevel.1b.2b.index",
                          code: "menulevel:1b:2b",
                          type: 1,
                          path: "/menu_level/1b/2b",
                          children: [
                            {
                              id: "menulevel_1b_2b_3a",
                              parentId: "menulevel_1b_2b",
                              name: "sys.nav.menulevel.1b.2b.3a",
                              code: "menulevel:1b:2b:3a",
                              type: 2,
                              path: "/menu_level/1b/2b/3a",
                              component:
                                "/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3a",
                              children: [],
                            },
                            {
                              id: "menulevel_1b_2b_3b",
                              parentId: "menulevel_1b_2b",
                              name: "sys.nav.menulevel.1b.2b.3b",
                              code: "menulevel:1b:2b:3b",
                              type: 2,
                              path: "/menu_level/1b/2b/3b",
                              component:
                                "/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3b",
                              children: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "error",
                  parentId: "group_pages",
                  name: "sys.nav.error.index",
                  code: "error",
                  icon: "bxs:error-alt",
                  type: 1,
                  path: "/error",
                  children: [
                    {
                      id: "error_403",
                      parentId: "error",
                      name: "sys.nav.error.403",
                      code: "error:403",
                      type: 2,
                      path: "/error/403",
                      component: "/pages/sys/error/Page403",
                      children: [],
                    },
                    {
                      id: "error_404",
                      parentId: "error",
                      name: "sys.nav.error.404",
                      code: "error:404",
                      type: 2,
                      path: "/error/404",
                      component: "/pages/sys/error/Page404",
                      children: [],
                    },
                    {
                      id: "error_500",
                      parentId: "error",
                      name: "sys.nav.error.500",
                      code: "error:500",
                      type: 2,
                      path: "/error/500",
                      component: "/pages/sys/error/Page500",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "group_ui",
              name: "sys.nav.ui",
              code: "ui",
              parentId: "",
              type: 0,
              children: [
                {
                  id: "components",
                  parentId: "group_ui",
                  name: "sys.nav.components",
                  code: "components",
                  icon: "solar:widget-5-bold-duotone",
                  type: 1,
                  path: "/components",
                  caption: "sys.nav.custom_ui_components",
                  children: [
                    {
                      id: "components_icon",
                      parentId: "components",
                      name: "sys.nav.icon",
                      code: "components:icon",
                      type: 2,
                      path: "/components/icon",
                      component: "/pages/components/icon",
                      children: [],
                    },
                    {
                      id: "components_animate",
                      parentId: "components",
                      name: "sys.nav.animate",
                      code: "components:animate",
                      type: 2,
                      path: "/components/animate",
                      component: "/pages/components/animate",
                      children: [],
                    },
                    {
                      id: "components_scroll",
                      parentId: "components",
                      name: "sys.nav.scroll",
                      code: "components:scroll",
                      type: 2,
                      path: "/components/scroll",
                      component: "/pages/components/scroll",
                      children: [],
                    },
                    {
                      id: "components_i18n",
                      parentId: "components",
                      name: "sys.nav.i18n",
                      code: "components:i18n",
                      type: 2,
                      path: "/components/multi-language",
                      component: "/pages/components/multi-language",
                      children: [],
                    },
                    {
                      id: "components_upload",
                      parentId: "components",
                      name: "sys.nav.upload",
                      code: "components:upload",
                      type: 2,
                      path: "/components/upload",
                      component: "/pages/components/upload",
                      children: [],
                    },
                    {
                      id: "components_chart",
                      parentId: "components",
                      name: "sys.nav.chart",
                      code: "components:chart",
                      type: 2,
                      path: "/components/chart",
                      component: "/pages/components/chart",
                      children: [],
                    },
                    {
                      id: "components_toast",
                      parentId: "components",
                      name: "sys.nav.toast",
                      code: "components:toast",
                      type: 2,
                      path: "/components/toast",
                      component: "/pages/components/toast",
                      children: [],
                    },
                  ],
                },
                {
                  id: "functions",
                  parentId: "group_ui",
                  name: "sys.nav.functions",
                  code: "functions",
                  icon: "solar:plain-2-bold-duotone",
                  type: 1,
                  path: "/functions",
                  children: [
                    {
                      id: "functions_clipboard",
                      parentId: "functions",
                      name: "sys.nav.clipboard",
                      code: "functions:clipboard",
                      type: 2,
                      path: "/functions/clipboard",
                      component: "/pages/functions/clipboard",
                      children: [],
                    },
                    {
                      id: "functions_tokenExpired",
                      parentId: "functions",
                      name: "sys.nav.token_expired",
                      code: "functions:token_expired",
                      type: 2,
                      path: "/functions/token_expired",
                      component: "/pages/functions/token-expired",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "group_others",
              name: "sys.nav.others",
              code: "others",
              parentId: "",
              type: 0,
              children: [
                {
                  id: "permission",
                  parentId: "group_others",
                  name: "sys.nav.permission",
                  code: "permission",
                  icon: "mingcute:safe-lock-fill",
                  type: 2,
                  path: "/permission",
                  component: "/pages/sys/others/permission",
                  children: [],
                },
                {
                  id: "permission_page_test",
                  parentId: "group_others",
                  name: "sys.nav.permission.page_test",
                  code: "permission:page_test",
                  icon: "mingcute:safe-lock-fill",
                  type: 2,
                  path: "/permission/page-test",
                  component: "/pages/sys/others/permission/page-test",
                  auth: ["permission:read"],
                  hidden: true,
                  children: [],
                },
                {
                  id: "calendar",
                  parentId: "group_others",
                  name: "sys.nav.calendar",
                  code: "calendar",
                  icon: "solar:calendar-bold-duotone",
                  type: 2,
                  path: "/calendar",
                  info: "12",
                  component: "/pages/sys/others/calendar",
                  children: [],
                },
                {
                  id: "kanban",
                  parentId: "group_others",
                  name: "sys.nav.kanban",
                  code: "kanban",
                  icon: "solar:clipboard-bold-duotone",
                  type: 2,
                  path: "/kanban",
                  component: "/pages/sys/others/kanban",
                  children: [],
                },
                {
                  id: "disabled",
                  parentId: "group_others",
                  name: "sys.nav.disabled",
                  code: "disabled",
                  icon: "local:ic-disabled",
                  type: 2,
                  path: "/disabled",
                  disabled: true,
                  component: "/pages/sys/others/disabled",
                  children: [],
                },
                {
                  id: "label",
                  parentId: "group_others",
                  name: "sys.nav.label",
                  code: "label",
                  icon: "local:ic-label",
                  type: 2,
                  path: "#label",
                  info: "New",
                  children: [],
                },
                {
                  id: "link",
                  parentId: "group_others",
                  name: "sys.nav.link",
                  code: "link",
                  icon: "local:ic-external",
                  type: 1,
                  path: "/link",
                  children: [
                    {
                      id: "link_external",
                      parentId: "link",
                      name: "sys.nav.external_link",
                      code: "link:external_link",
                      type: 2,
                      path: "/link/external_link",
                      component: "/pages/sys/others/link/external-link",
                      // externalLink: "https://ant.design/index-cn",
                      children: [],
                    },
                    {
                      id: "link_iframe",
                      parentId: "link",
                      name: "sys.nav.iframe",
                      code: "link:iframe",
                      type: 2,
                      path: "/link/iframe",
                      // externalLink: "https://ant.design/index-cn",
                      component: "/pages/sys/others/link/iframe",
                      children: [],
                    },
                  ],
                },
                {
                  id: "blank",
                  parentId: "group_others",
                  name: "sys.nav.blank",
                  code: "blank",
                  icon: "local:ic-blank",
                  type: 2,
                  path: "/blank",
                  component: "/pages/sys/others/blank",
                  children: [],
                },
              ],
            },
          ],
        });
        navigatge(HOMEPAGE, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Form {...form} {...props}>
        <form onSubmit={form.handleSubmit(handleFinish)} className="space-y-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              {t("sys.login.signInFormTitle")}
            </h1>

            <p className="text-balance text-sm text-muted-foreground">
              {t("sys.login.signInFormDescription")}
            </p>
          </div>

          <FormField
            control={form.control}
            name="username"
            rules={{ required: t("sys.login.accountPlaceholder") }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sys.login.userName")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={DB_USER.map((user) => user.username).join("/")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{ required: t("sys.login.passwordPlaceholder") }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sys.login.password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={DB_USER[0].password}
                    {...field}
                    suppressHydrationWarning
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 记住我/忘记密码 */}
          <div className="flex flex-row justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(checked) =>
                  setRemember(checked === "indeterminate" ? false : checked)
                }
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("sys.login.rememberMe")}
              </label>
            </div>
            <Button
              variant="link"
              onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
              size="sm"
            >
              {t("sys.login.forgetPassword")}
            </Button>
          </div>

          {/* 登录按钮 */}
          <Button type="submit" className="w-full text-white cursor-pointer">
            {loading && <Loader2 className="animate-spin mr-2" />}
            {t("sys.login.loginButton")}
          </Button>

          {/* 手机登录/二维码登录 */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setLoginState(LoginStateEnum.MOBILE)}
            >
              <Icon icon="uil:mobile-android" size={20} />
              {t("sys.login.mobileSignInFormTitle")}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setLoginState(LoginStateEnum.QR_CODE)}
            >
              <Icon icon="uil:qrcode-scan" size={20} />
              {t("sys.login.qrSignInFormTitle")}
            </Button>
          </div>

          {/* 其他登录方式 */}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              {t("sys.login.otherSignIn")}
            </span>
          </div>
          <div className="flex cursor-pointer justify-around text-2xl">
            <Button variant="ghost" size="icon">
              <Icon icon="mdi:github" size={24} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon icon="mdi:wechat" size={24} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon icon="ant-design:google-circle-filled" size={24} />
            </Button>
          </div>

          {/* 注册 */}
          <div className="text-center text-sm">
            {t("sys.login.noAccount")}
            <Button
              variant="link"
              className="px-1"
              onClick={() => setLoginState(LoginStateEnum.REGISTER)}
            >
              {t("sys.login.signUpFormTitle")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
