export const handleAddCreditAPI = async (id?: number) => {
  const res = await fetch(`/api/credit/${id}/add`, { method: "POST" });
  if (!res.ok) throw new Error("خطا در افزودن اعتبار");
  return res.json();
};

export const handleEditAPI = async (id: number) => {
  const res = await fetch(`/api/credit/${id}/edit`, { method: "PUT" });
  if (!res.ok) throw new Error("خطا در ویرایش");
  return res.json();
};

export const handleDeleteAPI = async (id?: number) => {
  const res = await fetch(`/api/credit/${id}/delete`, { method: "DELETE" });
  if (!res.ok) throw new Error("خطا در حذف");
  return res.json();
};

export const fetchCreditData = async () => {
  const res = await fetch("/api/credit");
  if (!res.ok) throw new Error("خطا در دریافت داده‌ها");
  return dataSource;
};

const dataSource = [
  {
    id: 1,
    program: "برنامه ۱",
    activity: "فعالیت الف",
    row: "1001",
    article: "ماده A",
    description: "هزینه مربوط به فعالیت الف",
  },
  {
    id: 2,
    program: "برنامه ۲",
    activity: "فعالیت ب",
    row: "1002",
    article: "ماده B",
    description: "هزینه مربوط به فعالیت ب",
  },
  {
    id: 3,
    program: "برنامه ۳",
    activity: "فعالیت ج",
    row: "1003",
    article: "ماده C",
    description: "هزینه مربوط به فعالیت ج",
  },
];
export const dataHeaderForTheSearch = (t: any) => {
  return [
    {
      id: 2,
      title: t("credits.credit_budget_origin.culoumns_header.radif"),
      value: "radif",
    },
    {
      id: 0,
      title: t("credits.credit_budget_origin.culoumns_header.program"),
      value: "program",
    },
    {
      id: 1,
      title: t("credits.credit_budget_origin.culoumns_header.faliat"),
      value: "faliat",
    },

    {
      id: 3,
      title: t("credits.credit_budget_origin.culoumns_header.madeh"),
      value: "madeh",
    },
    {
      id: 4,
      title: t("credits.credit_budget_origin.culoumns_header.sharhe_program"),
      value: "sharhe_program",
    },
    {
      id: 5,
      title: t("credits.credit_budget_origin.culoumns_header.sharh_faliat"),
      value: "sharh_faliat",
    },
    {
      id: 6,
      title: t("credits.credit_budget_origin.culoumns_header.sharh_hazineh"),
      value: "sharh_hazineh",
    },
  ];
};
