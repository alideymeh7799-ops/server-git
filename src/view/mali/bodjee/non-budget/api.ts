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

export const handleDeleteAPI = async (id?: string) => {
	const res = await fetch(`/api/credit/${id}/delete`, { method: "DELETE" });
	if (!res.ok) throw new Error("خطا در حذف");
	return res.json();
};

export const fetchCreditData = async () => {
	// const res = await fetch("/api/credit");
	// if (!res.ok) throw new Error("خطا در دریافت داده‌ها");
	return dataSource;
	// return res.json();
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
		// {
		//   id: 0,
		//   value: "radif",
		//   title: t("non_credits.culoumns_header.radif"),
		// },
		{
			id: 1,
			value: "sarfasl",
			title: t("non_credits.culoumns_header.sarfasl"),
		},

		{
			id: 3,
			value: "sharh_hazineh ",
			title: t("non_credits.culoumns_header.sharh_hazineh"),
		},
		{
			id: 4,
			value: "mojavez ",
			title: t("non_credits.culoumns_header.mojavez"),
		},
	];
};
export const columnsRecordedNonBudget = [
	{
		title: "سر فصل",
		dataIndex: "sarfasl",
		key: "sarfasl",
	},
	{
		title: "شرح هزینه",
		dataIndex: "payment_description",
		key: "payment_description",
	},
	{
		title: "نوع اعتبار",
		dataIndex: "credit_origin",
		key: "credit_origin",
	},
	{
		title: "مجوز",
		dataIndex: "mojavez",
		key: "mojavez",
	},
];
