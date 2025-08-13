import type { CreditEntry } from "#/entity";
import PrintData from "@/components/print-data";
import Table from "antd/es/table";
import { useRef } from "react";

const mainTableColumns = [
	{ title: "ردیف", dataIndex: "radif", key: "radif" },
	{ title: "برنامه", dataIndex: "program", key: "program" },
	{ title: "فعالیت", dataIndex: "faliat", key: "faliat" },
	{ title: "ماده", dataIndex: "madeh", key: "madeh" },
	{ title: "شرح هزینه", dataIndex: "sharh_hazineh", key: "sharh_hazineh" },
	{ title: "شرح برنامه", dataIndex: "sharhe_program", key: "sharhe_program" },
	{ title: "شرح فعالیت", dataIndex: "sharh_faliat", key: "sharh_faliat" },
	{ title: "نوع اعتبار", dataIndex: "noeEtebar", key: "noeEtebar" },
];

interface MainTableProps {
	dataSource: CreditEntry[];
	selectedRow: CreditEntry | null;
	onRowSelect: (record: CreditEntry) => void;
}

const MainTable: React.FC<MainTableProps> = ({ dataSource, selectedRow, onRowSelect }) => {
	const tableRef = useRef<HTMLDivElement>(null);

	return (
		<div className="rounded-xl border shadow-sm overflow-hidden">
			<PrintData
				dataExcel={{
					data: dataSource,
					nameFile: `لیست تنخواه یگان ${dataSource[0]?.program || ""}`,
					nameSheet: dataSource[0]?.program || "",
					columns: mainTableColumns,
				}}
				dataPrint={{
					idSelcted: tableRef.current,
					name: `لیست تنخواه یگان ${dataSource[0]?.program || ""}`,
				}}
			/>
			<div ref={tableRef} className="w-full">
				<Table
					rowKey="id"
					size="small"
					scroll={{ x: "max-content" }}
					pagination={{ pageSize: 5 }}
					columns={mainTableColumns}
					dataSource={dataSource}
					onRow={(record) => ({
						onClick: () => onRowSelect(record),
					})}
					rowClassName={(record) => (record.madeh === selectedRow?.madeh ? "bg-blue-100 cursor-pointer" : "cursor-pointer")}
				/>
			</div>
		</div>
	);
};

export default MainTable;
