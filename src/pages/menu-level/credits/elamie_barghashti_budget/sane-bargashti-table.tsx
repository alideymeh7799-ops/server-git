import type { CreditEntry } from "#/entity";
import PrintData from "@/components/print-data";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import DatePicker from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css"; // یا هر استایل دلخواه

import { useRef, useState } from "react";

const { Option } = Select;

const columns = [
	{ title: "ردیف", dataIndex: "radif", key: "radif" },
	{ title: "مبلغ برگشتی", dataIndex: "amount", key: "amount" },
	{ title: "عامل خرید", dataIndex: "agent", key: "agent" },
	{ title: "مدر", dataIndex: "doc", key: "doc" },
	{ title: "یگان", dataIndex: "unit", key: "unit" },
	{ title: "تاریخ سند", dataIndex: "date", key: "date" },
	{ title: "نوع برگشتی", dataIndex: "type", key: "type" },
];

interface SaneBargashtiProps {
	selectedRow: CreditEntry | null;
}

const SaneBargashtiTable: React.FC<SaneBargashtiProps> = ({ selectedRow }) => {
	const [data, setData] = useState<any[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const tableRef = useRef<HTMLDivElement>(null);

	const handleAdd = (values: any) => {
		const formattedDate = values.date?.format("YYYY/MM/DD");
		setData((prev) => [...prev, { ...values, date: formattedDate, key: Date.now() }]);
		setIsModalOpen(false);
		form.resetFields();
	};

	return (
		<div className="bg-muted/30 border rounded-xl shadow-sm p-4 space-y-2">
			<div className="flex items-center justify-between mb-2">
				<h3 className="font-semibold text-base text-gray-700">لیست اسناد برگشتی</h3>
				<Button type="primary" onClick={() => setIsModalOpen(true)}>
					افزودن سند برگشتی
				</Button>
			</div>

			<PrintData
				dataExcel={{
					data,
					nameFile: `لیست اسناد برگشتی ${selectedRow?.program || ""}`,
					nameSheet: selectedRow?.program || "",
					columns,
				}}
				dataPrint={{
					idSelcted: tableRef.current,
					name: `لیست اسناد برگشتی ${selectedRow?.program || ""}`,
				}}
			/>

			<div ref={tableRef} className="w-full">
				<Table
					rowKey={(record) => record.key}
					size="small"
					columns={columns}
					dataSource={data}
					pagination={false}
					className="bg-white rounded-xl shadow-sm border [&_.ant-table-thead_th]:bg-gray-100 [&_.ant-table-cell]:text-right"
				/>
				<div className="text-sm font-semibold text-right pt-2 border-t mt-2">
					جمع کل مبلغ برگشتی: {data.reduce((sum, item) => sum + Number(item.amount || 0), 0).toLocaleString()} ریال
				</div>
			</div>

			<Modal title="افزودن سند برگشتی" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()} okText="افزودن" cancelText="انصراف">
				<Form layout="vertical" form={form} onFinish={handleAdd}>
					<Form.Item name="radif" label="ردیف" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name="amount" label="مبلغ برگشتی" rules={[{ required: true }]}>
						<Input type="number" />
					</Form.Item>
					<Form.Item name="agent" label="عامل خرید" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name="doc" label="مدر" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name="unit" label="یگان" rules={[{ required: true }]}>
						<Input />
					</Form.Item>

					{/* اینجا تقویم شمسی react-multi-date-picker */}
					<Form.Item name="date" label="تاریخ سند" rules={[{ required: true, message: "انتخاب تاریخ الزامی است" }]}>
						<DatePicker
							calendar={persian}
							locale={persian_fa}
							format="YYYY/MM/DD"
							placeholder="تاریخ را انتخاب کنید"
							className="w-full"
							calendarPosition="bottom-right"
						/>
					</Form.Item>

					<Form.Item name="type" label="نوع برگشتی" rules={[{ required: true }]}>
						<Select>
							<Option value="نوع ۱">نوع ۱</Option>
							<Option value="نوع ۲">نوع ۲</Option>
							<Option value="نوع ۳">نوع ۳</Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default SaneBargashtiTable;
