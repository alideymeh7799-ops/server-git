import useCustomAxios, { Authorization } from "@/hooks/use-request";
import { typeDataPersonal } from "@/types/entity";
import { Card, CardHeader } from "@/ui/card";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Popconfirm, Select, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";
import UserFormModal from "./create-user-modal";
import { rankOptions, unitCodeOptions } from "./data";

const defaultValue: typeDataPersonal = {
	name: null,
	family: null,
	firstName: null,
	unitCode: null,
	rank: null,
	nationalId: null,
	accountNumber: null,
	bankCode: null,
	hsaSource: null,
	fmoSource: null,
	hsoSource: null,
	personnelId: null,
};
interface TypeGetData {
	data?: typeDataPersonal[];
	message: string;
	success: boolean;
}
const UserManagement: React.FC = () => {
	const [form] = Form.useForm();

	const [data, setData] = useState<typeDataPersonal[]>([]);
	const [searchText, setSearchText] = useState("");

	// const [searchField, setSearchField] =
	//   useState<keyof typeDataPersonal>("firstName");

	//   !!____STATE GET DATA FOR THE NOW
	const [refreshKey, setRefreshKey] = useState<number>(Date.now());

	const [modalProps, setModalProps] = useState({
		show: false,
		title: "افزودن کاربر",
		formValue: defaultValue,
	});

	const axiosHook = useCustomAxios();
	// !!________GET DATA
	const getDataBudget = axiosHook.useGetData<TypeGetData>("api/personal", {
		Authorization: Authorization,
	});

	// !!________UPDATE DATA
	const sendUpdatePersonnel = axiosHook.useUpdateData("api/personal/" + modalProps?.formValue.id, {
		"content-type": "application/json",
		Authorization: Authorization,
	});
	// !!_________POST DATA
	const sendCreatePersonnel = axiosHook.usePostData("api/personal", {
		"content-type": "application/json",
		Authorization: Authorization,
	});

	// !!_________DELETE DATA
	const sendDeletePerson = axiosHook.useDeleteData("api/personal/", {
		"content-type": "application/json",
		Authorization: Authorization,
	});

	// !!_____GET DATA FOR THE USE_Effect
	useEffect(() => {
		getDataBudget.fetchData();
	}, [refreshKey]);

	useEffect(() => {
		const res = getDataBudget.data;
		if (res?.success && res.data) {
			setData(res.data);
		}
	}, [getDataBudget.data]);

	// !!_______POST DATA AND ADD NEW ITEM
	const closeModal = () => {
		setModalProps((prev) => ({ ...prev, show: false }));
	};
	const handleModalSubmit = async (newData: typeDataPersonal, type: "edit" | "add") => {
		let res;

		if (type === "add") {
			res = await sendCreatePersonnel.sendData({
				name: newData.name,
				firstName: newData.firstName,
				unitCode: newData.unitCode,
				rank: newData.rank,
				nationalId: newData.nationalId,
				accountNumber: newData.accountNumber,
				bankCode: newData.bankCode,
				hsaSource: newData.hsaSource,
				fmoSource: newData.fmoSource,
				hsoSource: newData.hsoSource,
				personnelId: newData.personnelId,
			});
		} else {
			res = await sendUpdatePersonnel.sendData({
				name: newData.name,
				firstName: newData.firstName,
				unitCode: newData.unitCode,
				rank: newData.rank,
				nationalId: newData.nationalId,
				accountNumber: newData.accountNumber,
				bankCode: newData.bankCode,
				hsaSource: newData.hsaSource,
				fmoSource: newData.fmoSource,
				hsoSource: newData.hsoSource,
				personnelId: newData.personnelId,
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
	// ??-----------------
	const columns: ColumnsType<typeDataPersonal> = [
		{
			title: "شماره پرسنلی",
			dataIndex: "personnelId",
			key: "personnelId",
		},
		{
			title: "نام",
			dataIndex: "firstName",
			key: "firstName",
			filteredValue: [searchText],
			// onFilter: (value, record) => record.name,
		},
		{
			title: "کد یگان",
			dataIndex: "unitCode",
			key: "unitCode",
			render: (value) => unitCodeOptions.find((opt) => opt.value === value)?.label || value,
		},
		{
			title: "درجه",
			dataIndex: "rank",
			key: "rank",
			render: (value) => rankOptions.find((opt) => opt.value === value)?.label || value,
		},
		{
			title: "شماره ملی",
			dataIndex: "nationalId",
			key: "nationalId",
		},
		{
			title: "شماره حساب",
			dataIndex: "accountNumber",
			key: "accountNumber",
		},
		{
			title: "کد بانک",
			dataIndex: "bankCode",
			key: "bankCode",
		},
		{
			title: "ماخذ HSA",
			dataIndex: "hsaSource",
			key: "hsaSource",
		},
		{
			title: "ماخذ FMO",
			dataIndex: "fmoSource",
			key: "fmoSource",
		},
		{
			title: "ماخذ HSO",
			dataIndex: "hsoSource",
			key: "hsoSource",
		},
		// {
		//   title: "تاریخ اعزام",
		//   dataIndex: "dispatchDate",
		//   key: "dispatchDate",
		// },
		// {
		//   title: "نقش",
		//   dataIndex: "role",
		//   key: "role",
		// },
		// {
		//   title: "دسترسی‌ها",
		//   dataIndex: "permissions",
		//   key: "permissions",
		//   render: (permissions: string[]) => permissions.join(", "),
		// },
		{
			title: "عملیات",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<Button
						type="link"
						icon={<EditOutlined />}
						onClick={() =>
							setModalProps((prev) => ({
								...prev,
								show: true,
								title: "ویرایش شخص",
							}))
						}
					>
						ویرایش
					</Button>
					<Popconfirm title="آیا از حذف این کاربر مطمئن هستید؟" onConfirm={() => deleteDataSubmit(record.id ? record.id : null)} okText="بله" cancelText="خیر">
						<Button type="link" danger icon={<DeleteOutlined />}>
							حذف
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<h1 className="font-bold text-3xl">لیست پرسنل</h1>
					<div className="flex items-center  gap-2">
						<Button
							type="primary"
							onClick={() => {
								form.resetFields();
								setModalProps((prev) => ({ ...prev, show: true }));
							}}
						>
							افزودن کاربر جدید
						</Button>
						<div className="flex items-center gap-2">
							<Select
								defaultValue="firstName"
								className="w-60"
								// onChange={(value: any) => setSearchField(value)}
								options={[
									{ label: "نام", value: "firstName" },
									{ label: "شماره پرسنلی", value: "personnelId" },
									{ label: "شماره ملی", value: "nationalId" },
									{ label: "کد یگان", value: "unitCode" },
									{ label: "درجه", value: "rank" },
								]}
							/>
							<Input
								className="w-80"
								placeholder={`عبارت انتخاب شده را جستجو کنید`}
								prefix={<SearchOutlined />}
								onChange={(e) => setSearchText(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</CardHeader>
			{modalProps.show && (
				<UserFormModal show={modalProps.show} title={modalProps.title} formValue={modalProps.formValue} onOk={handleModalSubmit} onCancel={closeModal} />
			)}

			<Table
				columns={columns}
				dataSource={data} // ✅ حالا فیلتر شده رو نشون میده
				pagination={{ pageSize: 10 }}
				scroll={{ x: 1500 }}
			/>
		</Card>
	);
};

export default UserManagement;
