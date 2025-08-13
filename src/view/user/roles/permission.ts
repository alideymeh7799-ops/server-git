import { ROUTES } from "@/_mock/routes";

const listItems = [
  // MENU ID = 1
  {
    id: 1,
    parentId: null,
    nameKey: "yegan",
    title: "ثبت یگان",
    path: ROUTES.SETTINGS.YEGAN,
    icon: "mdi-light:settings",
    caption: "",
    sectionId: 1,
    sectionKey: "yegan",
  },
  {
    id: 2,
    parentId: null,
    nameKey: "amel_kharid",
    title: "عامل خرید ",
    path: ROUTES.SETTINGS.AMELE_KHARID,
    icon: "mdi-light:clipboard-plus",
    caption: "",
    sectionId: 1,
    sectionKey: "amele_kharid",
  },
  {
    id: 3,
    parentId: null,
    nameKey: "emza_yegan",
    title: " ثبت امضاکنندگان تنخواه ",
    path: ROUTES.SETTINGS.EMZA_TANKHAH,
    icon: "mdi-light:baseball-diamond",
    caption: "",
    sectionId: 1,
    sectionKey: "emza_tankha",
  },
  {
    id: 4,
    parentId: null,
    nameKey: "emza_yegan",
    title: "ثبت امضاکنندگان سند برگشتی",
    path: ROUTES.SETTINGS.EMZA_SANAD_BARGASHTI,
    icon: "mdi-light:baseball-diamond",
    caption: "",
    sectionId: 1,
    sectionKey: "emza_sanad_bargashti",
  },
  {
    id: 5,
    parentId: null,
    nameKey: "emza_yegan",
    title: " ثبت امضاء کنندگان تخصیص ",
    path: ROUTES.SETTINGS.EMZA_TAKHSIS,
    icon: "mdi-light:baseball-diamond",
    caption: "",
    sectionId: 1,
    sectionKey: "emza_takhsis",
  },
  {
    id: 6,
    parentId: null,
    nameKey: "yegan_vagozar",
    title: " ثبت اطلاعات یگان واگذار ",
    path: ROUTES.SETTINGS.YEGAN_VAGOZAR,
    icon: "mdi-light:face-mask",
    caption: "",
    sectionId: 1,
    sectionKey: "yegan_vagozar",
  },
  {
    id: 7,
    parentId: null,
    nameKey: "faaliat",
    title: " فعالیت ",
    path: ROUTES.SETTINGS.FAALIAT,
    icon: "mdi-light:ungroup",
    caption: "",
    sectionId: 1,
    sectionKey: "faliat",
  },
  {
    id: 8,
    parentId: null,
    nameKey: "barname",
    title: " برنامه",
    path: ROUTES.SETTINGS.BARNAME,
    icon: "mdi-light:tab-plus",
    caption: "",
    sectionId: 1,
    sectionKey: "barname",
  },

  // MENU ID = 2
  {
    id: 9,
    parentId: null,
    nameKey: "credit_origin_budget",
    title: "اعتبارات بودجه ای ",
    icon: "mdi-light:credit-card-scan",
    caption: "",
    sectionId: 2,
    sectionKey: "credit_origin_budget",
  },
  {
    id: 10,
    parentId: 9,
    nameKey: "credit_origin_budget",
    title: "  ثبت اعتبار / برگ اعتبار  ",
    path: ROUTES.BUDGET.CREDIT,
    icon: "mdi-light:note-text",
    caption: "",
    sectionId: 2,
    sectionKey: "sabt_brg_bodjee",
  },
  {
    id: 11,
    parentId: 9,
    nameKey: "credit_origin_budget",
    title: "ثبت تخصیص اعتبار",
    path: ROUTES.BUDGET.TAKHSIS,
    icon: "mdi-light:note-text",
    caption: "",
    sectionId: 2,
    sectionKey: "sabt_takhsis_etebar",
  },
  {
    id: 12,
    parentId: 9,
    nameKey: "credit_origin_budget",
    title: "ثبت تنخواه / نقدپرداخت ",
    path: ROUTES.BUDGET.TANKHAH,
    icon: "mdi-light:format-float-none",
    caption: "",
    sectionId: 2,
    sectionKey: "sabt_tankhah_etebar",
  },
  {
    id: 13,
    parentId: 9,
    nameKey: "credit_origin_budget",
    title: " ثبت سند برگشتی / اعلامیه برگشتی ",
    path: ROUTES.BUDGET.ELAMIE,
    icon: "mdi-light:format-float-none",
    caption: "",
    sectionId: 2,
    sectionKey: "sabt_sanad_bargashti",
  },
  {
    id: 14,
    parentId: null,
    nameKey: "credit_origin_non_budget",
    title: "اعتبارات غیر بودجه ای ",
    icon: "mdi-light:briefcase",
    caption: "",
    sectionId: 2,
    sectionKey: "credit_origin_non_budget",
  },
  {
    id: 15,
    parentId: 14,
    sectionId: 2,
    nameKey: "credit_origin_non_budget",
    title: "  ثبت اعتبار / برگ اعتبار  ",
    path: ROUTES.BUDGET.NON_CREDIT,
    icon: "mdi-light:note-text",
    caption: "",
    sectionKey: "sabt_barg_gheyr_bodjee",
  },
  {
    id: 16,
    parentId: 14,
    sectionId: 2,
    nameKey: "credit_origin_non_budget",
    title: "ثبت تخصیص اعتبار",
    path: ROUTES.BUDGET.NON_TAKHSIS,
    icon: "mdi-light:note-text",
    caption: "",
    sectionKey: "sabt_takhssis_gheyr_bodjee",
  },
  {
    id: 17,
    parentId: 14,
    nameKey: "credit_origin_non_budget",
    title: "ثبت تنخواه / نقدپرداخت ",
    path: ROUTES.BUDGET.NON_TANKHAH,
    icon: "mdi-light:format-float-none",
    caption: "",
    sectionId: 2,
    sectionKey: "sabt_tankhsh_gheyr_bodjee",
  },
  {
    id: 18,
    parentId: 14,
    nameKey: "credit_origin_non_budget",
    title: " ثبت سند برگشتی / اعلامیه برگشتی ",
    path: ROUTES.BUDGET.NON_ELAMIE,
    icon: "mdi-light:format-float-none",
    caption: "",
    sectionId: 2,
    sectionKey: "sabt_sanad_bargashti",
  },

  // MENU ID = 3
  {
    id: 19,
    parentId: null,
    nameKey: "pre_payment",
    title: "ثبت  اضافه کار",
    path: ROUTES.EZAFEKAR.FORM,
    icon: "mdi-light:chart-pie",
    caption: "",
    sectionId: 3,
    sectionKey: "sabt_ezafekar",
  },
  {
    id: 20,
    parentId: null,
    nameKey: "pre_payment",
    title: "   گزارشات",
    path: ROUTES.EZAFEKAR.REPORT,
    icon: "mdi-light:chart-bar",
    caption: "",
    sectionId: 3,
    sectionKey: "gozaresh_ezafekar",
  },

  // MENU ID = 4
  {
    id: 21,
    parentId: null,
    nameKey: "padash",
    title: "ثبت پاداش",
    path: ROUTES.PADASH.FORM,
    icon: "",
    caption: "",
    sectionId: 4,
    sectionKey: "sabt_padash",
  },
  {
    id: 22,
    parentId: null,
    nameKey: "padash",
    title: "گزارشات",
    path: ROUTES.PADASH.REPORT,
    icon: "",
    caption: "",
    sectionId: 4,
    sectionKey: "gozaresh_padash",
  },
  {
    id: 23,
    parentId: null,
    nameKey: "padash",
    title: "ثبت اطلاعات پایه",
    path: ROUTES.PADASH.SETTINGS,
    icon: "",
    caption: "",
    sectionId: 4,
    sectionKey: "sabt_etelat_paye",
  },

  // MENU ID = 5
  {
    id: 24,
    parentId: null,
    nameKey: "ghermez_etebar",
    title: "ثبت قرمز کردن اعتبار ",
    path: ROUTES.TRANSFERS.GHERMEZ,
    icon: "",
    caption: "",
    sectionId: 5,
    sectionKey: "sabt_ghermez_etebar",
  },
  {
    id: 26,
    parentId: null,
    nameKey: "ghermez_etebar",
    title: "گزارشات قرمز کردن ",
    path: ROUTES.TRANSFERS.GHERMEZ_REPORT,
    icon: "",
    caption: "",
    sectionId: 5,
    sectionKey: "gozaresh_ghermez_etebar",
  },
  {
    id: 25,
    parentId: null,
    nameKey: "jabejae_etebar",
    title: "ثبت جابجایی",
    path: ROUTES.TRANSFERS.JABEJAE,
    icon: "",
    caption: "",
    sectionId: 5,
    sectionKey: "sabt_jabejae_etebar",
  },
  {
    id: 27,
    parentId: null,
    nameKey: "jabejae_etebar",
    title: "گزارشات جابجایی",
    path: ROUTES.TRANSFERS.JABEJAE_REPORT,
    icon: "",
    caption: "",
    sectionId: 5,
    sectionKey: "gozaresh_jabejae_etebar",
  },

  // MENU ID = 6
  {
    id: 28,
    parentId: null,
    nameKey: "person",
    title: " مدیریت پرسنل",
    path: ROUTES.USERS.PERSONS,
    icon: "",
    caption: "",
    sectionId: 6,
    sectionKey: "managment_person",
  },
  {
    id: 29,
    parentId: null,
    nameKey: "user",
    title: "مدیریت ادمین ها",
    path: ROUTES.USERS.ADMINS,
    icon: "",
    caption: "",
    sectionId: 6,
    sectionKey: "managment_user",
  },
  {
    id: 30,
    parentId: null,
    nameKey: "role",
    title: " مدیریت نقش ها",
    path: ROUTES.USERS.ROLES,
    icon: "",
    caption: "",
    sectionId: 6,
    sectionKey: "managment_role",
  },

  // MENU ID = 7
  {
    id: 31,
    parentId: null,
    nameKey: "user",
    title: "   گزارش ورود و خروج ",
    path: ROUTES.USERS.AUTH_REPORT,
    icon: "",
    caption: "",
    sectionId: 7,
    sectionKey: "sign_in_sign_up",
  },

  // MENU ID = 8
  {
    id: 32,
    parentId: null,
    nameKey: "personal_infos",
    title: "  پروفایل ",
    path: ROUTES.PROFILE,
    icon: "",
    caption: "",
    sectionId: 8,
  },

  // !!EMPTY (id 10 duplicate, maybe remove or fix)
  {
    id: 10,
    parentId: null,
    nameKey: "",
    title: "ثبت یگان",
    path: "/",
    icon: "",
    caption: "",
    sectionId: 1,
  },
];

export interface MenuItem {
  id: number;
  parentId: number | null;
  nameKey: string;
  title: string;
  path?: string;
  icon?: string;
  caption?: string;
  sectionKey?: string;
  sectionId: number;
  items?: MenuItem[];
}

export interface MenuSection {
  id: number;
  name: string;
  items: MenuItem[];
}

// تابع تبدیل آیکون رشته ساده به ساختار آیکون پیچیده مشابه نمونه اصلی
const buildIcon = (iconKey?: string): React.ReactNode | undefined => {
  if (!iconKey) return undefined;
  return `mdi-light:${iconKey}`;
};

export type NavItemDataProps = {
  path: string;
  title: string;
  icon?: string | React.ReactNode;
  info?: React.ReactNode;
  caption?: string;
  auth?: string[];
  children?: NavItemDataProps[]; // می‌تونی داشته باشی اما ما از items استفاده می‌کنیم
  items?: NavItemDataProps[];
  disabled?: boolean;
  hidden?: boolean;
};

const buildMenuTree = (
  items: MenuItem[],
  access: string[],
  sectionId: number,
  parentId: number | null = null
): NavItemDataProps[] => {
  return items
    .filter(
      (item) =>
        item.sectionId === sectionId &&
        item.parentId === parentId &&
        access.includes(item.nameKey)
    )
    .map((item) => {
      const children = buildMenuTree(items, access, sectionId, item.id);
      return {
        title: item.title,
        path: item.path ?? "", // حتما path رشته باشه
        icon: buildIcon(item.icon),
        caption: item.caption,
        items: children.length ? children : undefined, // استفاده از items برای زیرمجموعه‌ها
      };
    });
};

const CRUD_ACTIONS = [
  { id: 1, name: "create", title: "ساختن" },
  { id: 2, name: "getOne", title: "گرفتن یکی" },
  { id: 3, name: "getAll", title: "گرفتن همه" },
  { id: 4, name: "update", title: "بروزرسانی" },
  { id: 5, name: "delete", title: "حذف دائمی" },
  { id: 6, name: "softDelete", title: "حذف نرم" },
  { id: 7, name: "restore", title: "بازیابی" },
  { id: 8, name: "search", title: "جستجو" },
  { id: 9, name: "getDeleted", title: "مشاهده حذف‌شده‌ها" },
  { id: 10, name: "batchDelete", title: "حذف گروهی" },
  { id: 11, name: "batchRestore", title: "بازیابی گروهی" },
];

type PermissionNode = {
  id: string;
  name: string;
  children?: PermissionNode[];
};

export const buildPermissions = (access: string[] = []): PermissionNode[] => {
  const sections: MenuSection[] = [
    { id: 1, name: "ثبت اطلاعات اولیه", items: [] },
    { id: 2, name: "اطلاعات مالی و حسابداری", items: [] },
    { id: 3, name: "اضافه کار", items: [] },
    { id: 4, name: "پاداش", items: [] },
    { id: 5, name: "ثبت انتقالات و گزارشات", items: [] },
    { id: 6, name: "کاربران", items: [] },
    { id: 7, name: "گزارشات ادمین", items: [] },
    { id: 8, name: "اطلاعات شخصی", items: [] },
  ];

  const buildTree = (
    items: MenuItem[],
    sectionId: number,
    parentId: number | null = null
  ): PermissionNode[] => {
    return items
      .filter(
        (item) =>
          item.sectionId === sectionId &&
          item.parentId === parentId &&
          access.includes(item.nameKey)
      )
      .map((item) => {
        const children = buildTree(items, sectionId, item.id);
        if (children.length > 0) {
          return {
            id: item.nameKey,
            name: item.title,
            children,
          };
        } else {
          return {
            id: item.nameKey,
            name: item.title,
            children: CRUD_ACTIONS.map((action) => ({
              id: `${item.sectionKey}:${action.name}`,
              name: action.title,
            })),
          };
        }
      });
  };

  return sections.map((section) => ({
    id: `section-${section.id}`,
    name: section.name,
    children: buildTree(listItems, section.id),
  }));
};
