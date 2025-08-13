// src/components/UserFormModal.tsx
import { Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";

import { typeDataPersonal } from "@/types/entity";
import { rankOptions, unitCodeOptions } from "./data";

type ModalProps = {
	formValue: typeDataPersonal;
	show: boolean;
	onOk: (values: typeDataPersonal, type: "add" | "edit") => void;
	onCancel: VoidFunction;
	title: string;
};

export default function UserFormModal({ show, title, formValue, onOk, onCancel }: ModalProps) {
	const [form] = Form.useForm();

	React.useEffect(() => {
		if (formValue) {
			form.setFieldsValue({
				...formValue,
			});
		} else {
			form.resetFields();
		}
	}, [formValue]);
	const onSubmit = (values: typeDataPersonal) => {
		onOk(values, formValue.id ? "edit" : "add");
	};
	return (
		<Modal
			title={title}
			open={show}
			onOk={() => form.submit()}
			onCancel={() => {
				form.resetFields();
				onCancel();
			}}
			okText={formValue?.id ? "ذخیره تغییرات" : "افزودن"}
			cancelText="لغو"
		>
			<Form
				form={form}
				layout="vertical"
				onFinish={(values) => {
					const formattedValues = {
						...values,
					};
					onSubmit(formattedValues);
				}}
			>
				<Row gutter={16}>
					<Col span={12} className="flex flex-col gap-1">
						<Form.Item name="personnelId" label="شماره پرسنلی" rules={[{ required: true }]}>
							<Input className="w-full" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="firstName" label="نام" rules={[{ required: true }]} className="flex flex-col gap-1">
							<Input className="w-full" />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item name="unitCode" label="کد یگان" rules={[{ required: true }]} className="flex flex-col gap-1">
							<Select options={unitCodeOptions} placeholder="انتخاب کد یگان" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="rank" label="درجه" rules={[{ required: true }]} className="flex flex-col gap-1">
							<Select options={rankOptions} placeholder="انتخاب درجه" />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item name="nationalId" label="شماره ملی" rules={[{ required: true }]} className="flex flex-col gap-1">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="accountNumber" label="شماره حساب" rules={[{ required: true }]} className="flex flex-col gap-1">
							<Input />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item name="bankCode" label="کد بانک" rules={[{ required: true }]} className="flex flex-col gap-1">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="hsaSource" label="ماخذ HSA" rules={[{ required: true }]} className="flex flex-col gap-1">
							<Input />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item name="fmoSource" label="ماخذ FMO" rules={[{ required: true }]} className="flex flex-col gap-1">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="hsoSource" label="ماخذ HSO" rules={[{ required: true }]} className="flex flex-col gap-1">
							<Input />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
}
