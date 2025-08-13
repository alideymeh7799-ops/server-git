import { listItems } from "@/_mock/item-permission";

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

export type NavItemDataProps = {
  path: string;
  title: string;
  icon?: string | React.ReactNode;
  info?: React.ReactNode;
  caption?: string;
  auth?: string[];
  children?: NavItemDataProps[];
  items?: NavItemDataProps[];
  disabled?: boolean;
  hidden?: boolean;
};

type PermissionNode = {
  id?: string;
  name: string;
  children?: PermissionNode[];
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

const buildIcon = (iconKey?: string): React.ReactNode | undefined => {
  if (!iconKey) return undefined;
  return `mdi-light:${iconKey}`;
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
        path: item.path ?? "",
        icon: buildIcon(item.icon),
        caption: item.caption,
        items: children.length ? children : undefined,
      };
    });
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
            id: item.sectionKey,
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

  const uniqueItems = listItems.filter(
    (item, index, self) => self.findIndex((i) => i.id === item.id) === index
  );

  return sections
    .map((section) => ({
      id: `section-${section.id}`,
      name: section.name,
      children: buildTree(uniqueItems, section.id),
    }))
    .filter((section) => section.children.length > 0);
};
