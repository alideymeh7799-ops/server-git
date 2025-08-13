import type { Permission_Old } from "#/entity";
import { BasicStatus, PermissionType } from "#/enum";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import Table, { type ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PermissionModal, { type PermissionModalProps } from "./naghd-pardakht-budget-modal";

const defaultPermissionValue: Permission_Old = {
	id: "",
	parentId: "",
	name: "",
	label: "",
	route: "",
	component: "",
	icon: "",
	hide: false,
	status: BasicStatus.ENABLE,
	type: PermissionType.CATALOGUE,
};
export default function PermissionPage() {
	// const permissions = useUserPermission();
	const { t } = useTranslation();

	const [permissionModalProps, setPermissionModalProps] = useState<PermissionModalProps>({
		formValue: { ...defaultPermissionValue },
		title: "New",
		show: false,
		onOk: () => {
			setPermissionModalProps((prev) => ({ ...prev, show: false }));
		},
		onCancel: () => {
			setPermissionModalProps((prev) => ({ ...prev, show: false }));
		},
	});
	const columns: ColumnsType<Permission_Old> = [
		{
			title: "کد یگان",
			dataIndex: "name",

			render: (_, record) => <div>{t(record.label)}</div>,
		},
		{
			title: "شرح یگان",
			dataIndex: "name",

			render: (_, record) => <div>{t(record.label)}</div>,
		},
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex w-full justify-end text-gray">
					{record?.type === PermissionType.CATALOGUE && (
						<Button variant="ghost" size="icon" onClick={() => onCreate(record.id)}>
							<Icon icon="gridicons:add-outline" size={18} />
						</Button>
					)}
					<Button variant="ghost" size="icon" onClick={() => onEdit(record)}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Button variant="ghost" size="icon">
						<Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
					</Button>
				</div>
			),
		},
	];

	const onCreate = (parentId?: string) => {
		setPermissionModalProps((prev) => ({
			...prev,
			show: true,
			...defaultPermissionValue,
			title: "New",
			formValue: { ...defaultPermissionValue, parentId: parentId ?? "" },
		}));
	};

	const onEdit = (formValue: Permission_Old) => {
		setPermissionModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>Permission List</div>
					<Button onClick={() => onCreate()}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table rowKey="id" size="small" scroll={{ x: "max-content" }} pagination={false} columns={columns} dataSource={[]} />
			</CardContent>
			<PermissionModal {...permissionModalProps} />
		</Card>
	);
}
