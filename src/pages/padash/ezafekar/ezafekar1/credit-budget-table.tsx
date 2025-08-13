import { useEffect, useState } from "react";
import { Table } from "antd";
import { CardContent } from "@/ui/card";
import { TableActions } from "./table-actions";

import { toast } from "sonner";
import type { CreditEntry } from "#/entity";

interface CreditBudgetTableProps {
	onEdit: (formValue: CreditEntry) => void;
}

export default function CreditBudgetTable({ onEdit }: CreditBudgetTableProps) {
	// const [dataSource, setDataSource] = useState<CreditEntry[]>([]);
	const [loading, setLoading] = useState(false);

	const loadData = async () => {
		setLoading(true);
		try {
			// const data = await fetchCreditData();
			// setDataSource(data);
		} catch (err) {
			toast.error((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const columns = [
		{ title: "برنامه", dataIndex: "program", key: "program" },
		{ title: "فعالیت", dataIndex: "activity", key: "activity" },
		{ title: "ردیف", dataIndex: "row", key: "row" },
		{ title: "ماده", dataIndex: "article", key: "article" },
		{ title: "شرح هزینه", dataIndex: "description", key: "description" },
		{
			title: "عملیات",
			key: "actions",
			render: (_: any, record: CreditEntry) => <TableActions record={record} onRefresh={loadData} onEdit={() => onEdit(record)} />,
		},
	];

	return (
		<CardContent>
			<Table
				rowSelection={{ type: "checkbox" }}
				columns={columns}
				// dataSource={dataSource}
				loading={loading}
				rowKey="id"
			/>
		</CardContent>
	);
}
