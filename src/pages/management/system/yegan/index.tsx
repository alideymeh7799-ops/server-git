import useCustomAxios, { Authorization } from "@/hooks/use-request";
import { YeganTypeData } from "@/types/entity";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Button, Form, Input, message, Modal, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";

const defaultValue: YeganTypeData = {
	code: null,
	name: null,
};
interface TypeGetData {
	data?: YeganTypeData[];
	message: string;
	success: boolean;
}
const YeganPage: React.FC = () => {
	const [data, setData] = useState<YeganTypeData[]>([]);
	const [form] = Form.useForm();

	const [searchText, setSearchText] = useState("");

	//   !!____STATE GET DATA FOR THE NOW
	const [refreshKey, setRefreshKey] = useState<number>(Date.now());

	const [modalProps, setModalProps] = useState({
		show: false,
		title: "افزودن یگان جدید",
		formValue: defaultValue,
	});

	const axiosHook = useCustomAxios();
	// !!________GET DATA
	const getData = axiosHook.useGetData<TypeGetData>("api/yegan", {
		Authorization: Authorization,
	});

	// !!________UPDATE DATA
	const sendUpdatePersonnel = axiosHook.useUpdateData("api/yegan/" + modalProps?.formValue.id, {
		"content-type": "application/json",
		Authorization: Authorization,
	});
	// !!_________POST DATA
	const sendCreatePersonnel = axiosHook.usePostData("api/yegan", {
		"content-type": "application/json",
		Authorization: Authorization,
	});

	// !!_________DELETE DATA
	const sendDeletePerson = axiosHook.useDeleteData("api/yegan/", {
		"content-type": "application/json",
		Authorization: Authorization,
	});

	// !!_____GET DATA FOR THE USE_Effect
	useEffect(() => {
		getData.fetchData();
	}, [refreshKey]);

	useEffect(() => {
		const res = getData.data;
		if (res?.success && res.data) {
			setData(res.data);
		}
	}, [getData.data]);

	// !!_______POST DATA AND ADD NEW ITEM
	const closeModal = () => {
		setModalProps((prev) => ({ ...prev, show: false }));
	};
	const handleModalSubmit = async (newData: YeganTypeData, type: "edit" | "add") => {
		let res;

		if (type === "add") {
			res = await sendCreatePersonnel.sendData({
				code: Number(newData.code),
				name: newData.name,
			});
		} else {
			res = await sendUpdatePersonnel.sendData({
				code: Number(newData.code),
				name: newData.name,
			});
		}

		if (res) {
			setRefreshKey(Date.now());
		}

		closeModal();
	};

	//!!______DELETED ITEM CREDIT AND BUDGET

	const deleteDataSubmit = async (id: number | string | null) => {
		try {
			let res: any;
			if (id) {
				res = await sendDeletePerson.remove(id.toString());
			}

			if (res?.success) {
				message.success("با موفقیت حذف شد");
				setRefreshKey(Date.now());
			} else {
				message.error("خطا در حذف");
			}
		} catch (error) {
			message.error(error.status === "500" ? "خطا در ارتباط با سرور" : "خطایی رخ داده است");
		}
	};
	const columns: ColumnsType<YeganTypeData> = [
		{
			title: "کد یگان",
			dataIndex: "code",
			key: "code",
		},
		{
			title: "نام یگان",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "عملیات",
			key: "actions",
			render: (_, record) => (
				<Space>
					<Button
						type="link"
						onClick={() => {
							form.setFieldsValue(record);
							setModalProps((prev) => ({
								...prev,
								show: true,
								title: "ویرایش یگان",
							}));
						}}
					>
						ویرایش
					</Button>
					<Popconfirm title="آیا مطمئن هستید؟" onConfirm={() => deleteDataSubmit(record.id ? record.id : null)}>
						<Button type="link" danger>
							حذف
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<h1 className="text-2xl font-bold  text-right w-full sm:w-auto">مدیریت یگان ها</h1>
				<div className="flex items-center gap-2">
					<Input placeholder="جستجوی کد یا نام یگان" value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ maxWidth: 300 }} />
					<Button
						type="primary"
						onClick={() =>
							setModalProps((prev) => ({
								...prev,
								show: true,
							}))
						}
					>
						افزودن یگان جدید
					</Button>
				</div>
			</CardHeader>

			<CardContent>
				<Table rowKey="id" columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
			</CardContent>

			<Modal
				title={modalProps.title}
				open={modalProps.show}
				onCancel={() => {
					setModalProps((prev) => ({
						...prev,
						show: false,
						formValue: defaultValue,
					}));
				}}
				onOk={() => form.submit()}
				okText={modalProps.formValue.id ? "ویرایش " : "افزودن"}
				cancelText="لغو"
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={(values) => {
						const formattedValues = {
							...values,
						};
						handleModalSubmit(formattedValues, modalProps.formValue.id ? "edit" : "add");
					}}
				>
					<Form.Item name="code" label="کد یگان" rules={[{ required: true }]}>
						<Input type="number" />
					</Form.Item>
					<Form.Item name="name" label="نام یگان" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default YeganPage;
