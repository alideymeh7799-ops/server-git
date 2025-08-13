import type { CreditDetailBargeEtebar, CreditEntryNonBudget } from "#/entity";
import PrintData from "@/components/print-data";
import { CardContent } from "@/ui/card";
import { cn } from "@/utils";
import { Button, Table } from "antd";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { columnsRecordedNonBudget } from "./api";
import { navItemClasses } from "./styles";
import { TableActions } from "./table-actions";

const itemClassName = cn(navItemClasses.base, navItemClasses.hover, "min-h-[44px]", true && 1 && navItemClasses.active);

interface CreditBudgetTableProps {
	onEdit: (formValue: CreditEntryNonBudget) => void;
	data: CreditEntryNonBudget[];
	setData: (data: CreditEntryNonBudget[]) => void;
	showCreditModal: (record: CreditEntryNonBudget) => void;
	openCreateModalCredit: (record: CreditDetailBargeEtebar | null, id: string | number | null) => void;
	onDelete: (id: number | string) => void;
	showDataCredits: (record: CreditEntryNonBudget) => void;
}

export default function CreditBudgetTable({
	onEdit,
	data,
	openCreateModalCredit,
	// showCreditModal,
	onDelete,
	showDataCredits,
}: CreditBudgetTableProps) {
	const { t } = useTranslation();
	const tableRefData = useRef<HTMLDivElement>(null);
	// const [isReady, setIsReady] = useState(false); // استیت برای بررسی آماده بودن DOM

	// بررسی آماده بودن tableRefData
	useEffect(() => {
		if (tableRefData.current) {
			// setIsReady(true);
		}
	}, []);

	const columns = [
		{
			title: <span className={itemClassName}>{t("non_credits.culoumns_header.sarfasl")}</span>,
			dataIndex: "sarfasl",
			key: "sarfasl",
		},
		{
			title: t("non_credits.culoumns_header.sharh_hazineh"),
			dataIndex: "payment_description",
			key: "payment_description",
		},
		{
			title: t("non_credits.culoumns_header.no_etebar"),
			dataIndex: "credit_origin",
			key: "credit_origin",
		},
		{
			title: t("non_credits.culoumns_header.mojavez"),
			dataIndex: "mojavez",
			key: "mojavez",
		},
		{
			title: t("non_credits.culoumns_header.amaliat"),
			key: "actions",
			render: (_: any, record: CreditEntryNonBudget) => (
				<div className="flex gap-2 items-center">
					<TableActions
						record={record}
						onRefresh={() => {}}
						openCreateModalCredit={() => openCreateModalCredit(null, record.id ? record.id : null)}
						onEdit={() => onEdit(record)}
						onDelete={onDelete}
					/>
					<Button className="bg-background border rounded-2xl text-primary py-1 px-2 text-xs cursor-pointer" onClick={() => showDataCredits(record)}>
						{t("credits.credit_budget_origin.show_data_budgets")}
					</Button>
				</div>
			),
		},
	];

	return (
		<CardContent>
			<PrintData
				dataExcel={{
					data,
					nameFile: `اعتبارات غیر بودجه ای`,
					nameSheet: "اطلاعات اعتبارات غیر بودجه ای",
					columns: columnsRecordedNonBudget,
				}}
				dataPrint={{
					idSelcted: null, // ارسال ref به جای current
					name: `لیست اعتبارات غیر بودجه ای`,
				}}
			/>
			<div ref={tableRefData} className="w-full">
				<Table columns={columns} dataSource={data} className="font-irsans" rowKey={(record) => record?.credit_origin} size="small" />
			</div>
		</CardContent>
	);
}
