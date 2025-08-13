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
