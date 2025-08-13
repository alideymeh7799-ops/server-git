import PrintData from "@/components/print-data";
import Table from "antd/es/table";
import { useRef } from "react";

const cashTableColumns = [
	{ title: "ردیف", dataIndex: "radif", key: "radif" },
	{ title: "مبلغ پرداختی", dataIndex: "amount", key: "amount" },
	{ title: "نوع پرداخت", dataIndex: "type", key: "type" },
	{ title: "شرح سند", dataIndex: "desc", key: "desc" },
	{ title: "تاریخ سند", dataIndex: "date", key: "date" },
	{ title: "شماره حساب", dataIndex: "account", key: "account" },
	{ title: "نام و نشان", dataIndex: "owner", key: "owner" },
];

// interface CashTableProps {
// 	selectedRow: CreditEntry | null;
// }

const CashTable: React.FC = () => {
	const tableRefNaghdPardakht = useRef<HTMLDivElement>(null);

	return (
		<div className="bg-muted/30 border rounded-xl shadow-sm p-4 space-y-2">
			<h3 className="font-semibold text-base text-gray-700 mb-2">لیست اسناد نقد پرداخت</h3>
			<PrintData
				dataExcel={{
					data: [],
					nameFile: "بررسی",
					nameSheet: "اطلاعات",
					columns: cashTableColumns,
				}}
				dataPrint={{
					idSelcted: tableRefNaghdPardakht.current,
					name: "ss",
				}}
			/>
			<div ref={tableRefNaghdPardakht} className="w-full">
				<Table rowKey={(_, index) => `cash-${index}`} size="small" columns={cashTableColumns} dataSource={[]} pagination={false} />
				<div className="text-sm font-semibold text-right pt-2 border-t mt-2">جمع کل نقد پرداخت: ۰ ریال</div>
			</div>
		</div>
	);
};

export default CashTable;
