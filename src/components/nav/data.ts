import { listItems } from "@/_mock/item-permission";

export interface MenuItem {
  id: number;
  parentId: number | null;
  nameKey: string;
  title: string;
  path?: string;
  icon?: string;
  caption?: string;
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

export const menuItems = (
  access: string[]
): { name: string; items: NavItemDataProps[] }[] => {
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

  return sections.map((section) => ({
    name: section.name,
    items: buildMenuTree(listItems, access, section.id),
  }));
};
