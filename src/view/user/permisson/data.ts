import { ROUTES } from "@/_mock/routes";

export const operationPermissionList = {
  CREATE: { key: "create", label: "ساخت" },
  UPDATE: { key: "update", label: "ویرایش" },
  GETALL: { key: "getAll", label: "دریافت همه" },
  GETONE: { key: "getOne", label: "دریافت تکی" },
  DELETE: { key: "delete", label: "حذف" },
  SOFTDELETE: { key: "softDelete", label: "حذف نرم" },
  RESTORE: { key: "restore", label: "بازیابی" },
  GETDELETED: { key: "getDeleted", label: "دریافت حذف‌شده‌ها" },
  SEARCH: { key: "search", label: "جستجو" },
  BATCHDELETE: { key: "batchDelete", label: "حذف دسته‌ای" },
  BATCHRESTORE: { key: "batchRestore", label: "بازیابی دسته‌ای" },
};
export const routes = [
  {
    title: "ثبت اطلاعات پایه سامانه",
    children: [
      { title: "ثبت یگان", path: ROUTES.SETTINGS.YEGAN },
      { title: "عامل خرید", path: ROUTES.SETTINGS.AMELE_KHARID },
      { title: "ثبت امضا کنندگان تنخواه", path: ROUTES.SETTINGS.EMZA_TANKHAH },
      {
        title: "ثبت امضاء کنندگان تخصیص  ",
        path: ROUTES.SETTINGS.EMZA_SANAD_BARGASHTI,
      },
      { title: "ثبت امضا کنندگان تخصیص", path: ROUTES.SETTINGS.EMZA_TAKHSIS },
      { title: "ثبت اطلاعات یگان واگذار", path: ROUTES.SETTINGS.YEGAN_VAGOZAR },
      { title: "مدیریت پیمانکاران", path: ROUTES.SETTINGS.PEYMANKAR },
      { title: "مدیریت فعالیت", path: ROUTES.SETTINGS.FAALIAT },
      { title: "مدیریت برنامه ", path: ROUTES.SETTINGS.BARNAME },
    ],
  },
  {
    title: " اطلاعات مالی و حسابداری",
    children: [
      {
        title: "اعتبارات بودجه‌ای",
        children: [
          {
            title: " ثبت اعتبار / برگ اعتبار",
            path: ROUTES.BUDGET.CREDIT,
          },
          { title: "ثبت تخصیص اعتبار", path: ROUTES.BUDGET.TAKHSIS },
          { title: "ثبت پرداخت / نقد پرداخت", path: ROUTES.BUDGET.TANKHAH },
          { title: "ثبت سند برگشتی / اعلامیه", path: ROUTES.BUDGET.ELAMIE },
        ],
      },
      // {
      //   title: "اعتبارات غیر بودجه ای",
      //   children: [
      //     {
      //       title: " ثبت اعتبار / برگ اعتبار",
      //       path: ROUTES.BUDGET.CREDIT,
      //     },
      //     { title: "ثبت تخصیص اعتبار", path: ROUTES.BUDGET.NON_TANKHAH },
      //     { title: "ثبت پرداخت / نقد پرداخت", path: ROUTES.BUDGET.TANKHAH },
      //     { title: "ثبت سند برگشتی / اعلامیه", path: ROUTES.BUDGET.ELAMIE },
      //   ],
      // },
      {
        title: "اضافه کار",
        children: [
          { title: "فرم اضافه کار", path: ROUTES.EZAFEKAR.FORM },
          { title: "گزارش اضافه کار", path: ROUTES.EZAFEKAR.REPORT },
        ],
      },
      {
        title: " پاداش",
        children: [
          { title: " ثبت پاداش  ", path: ROUTES.PADASH.FORM },
          { title: " گزارشات ", path: ROUTES.PADASH.REPORT },
        ],
      },
    ],
  },

  {
    title: "ثبت  انتقالات و گزارشات",

    children: [
      { title: "ثبت قرمز کردن اعتبار", path: ROUTES.TRANSFERS.GHERMEZ },
      { title: "گزارشات قرمز کردن   ", path: ROUTES.TRANSFERS.GHERMEZ_REPORT },
      { title: "ثبت   جابجایی", path: ROUTES.TRANSFERS.JABEJAE },
      { title: "   گزارشات جابجایی", path: ROUTES.TRANSFERS.JABEJAE_REPORT },
    ],
  },
  {
    title: "مدیریت و بررسی کاربران",
    children: [
      { title: "مدیریت کادر پایور (پرسنل)", path: ROUTES.USERS.PERSONS },
      { title: "مدیریت کاربران (ادمین  ها)", path: ROUTES.USERS.ADMINS },
      { title: " مدیریت نقش ها", path: ROUTES.USERS.ROLES },
      { title: "مدیریت   تعیین سطح دسترسی", path: ROUTES.USERS.PERMISSION },
    ],
  },
  {
    title: "گزارشات",
    children: [
      { title: "مشاهده گزارشات سامانه", path: ROUTES.USERS.AUTH_REPORT },
    ],
  },
];
