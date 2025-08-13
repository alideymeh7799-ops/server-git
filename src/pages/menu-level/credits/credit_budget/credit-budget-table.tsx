import type { CreditDetailBargeEtebar, CreditEntry } from "#/entity";
import useLocale from "@/locales/use-locale";
import { Button } from "@/ui/button";
import { CardContent } from "@/ui/card";
import { cn } from "@/utils";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { navItemClasses } from "./styles";
import { TableActions } from "./table-actions";

const itemClassName = cn(navItemClasses.base, navItemClasses.hover, "min-h-[44px]", true && 1 && navItemClasses.active);

interface CreditBudgetTableProps {
	onEdit: (formValue: CreditEntry) => void;
	data: CreditEntry[];
	openCreateModalCredit: (record: CreditDetailBargeEtebar | null, id: string | number | null) => void;
	// showCreditModal: (record: CreditEntry) => void;
	showDataCredits: (record: CreditEntry) => void;
}

export default function CreditBudgetTable({
	onEdit,
	data,

	openCreateModalCredit,
	// showCreditModal,
	showDataCredits,
}: CreditBudgetTableProps) {
	const { locale } = useLocale();

	const { t } = useTranslation();

	// !!HEADER AND DATA FOR THE TABLE BUDGET
	const columns = [
		{
			title: t("credits.credit_budget_origin.culoumns_header.radif"),
			dataIndex: "radif",
			key: "radif",
		},
		{
			title: <span className={itemClassName}>{t("credits.credit_budget_origin.culoumns_header.program")}</span>,
			dataIndex: "barname",
			key: "barname",
		},
		{
			title: t("credits.credit_budget_origin.culoumns_header.faliat"),
			dataIndex: "faaliat_id",
			key: "faaliat_id",
		},
		{
			title: t("credits.credit_budget_origin.culoumns_header.madeh"),
			dataIndex: "madeh",
			key: "madeh",
		},
		{
			title: t("credits.credit_budget_origin.culoumns_header.sharh_hazineh"),
			dataIndex: "payment_description",
			key: "payment_description",
		},
		{
			title: t("credits.credit_budget_origin.culoumns_header.sharhe_program"),
			dataIndex: "faaliat_id",
			key: "faaliat_id",
		},
		{
			title: t("credits.credit_budget_origin.culoumns_header.sharh_faliat"),
			dataIndex: "faaliat_id",
			key: "faaliat_id",
		},
		{
			title: t("credits.credit_budget_origin.culoumns_header.noeEtebar"),
			dataIndex: "noeEtebar",
			key: "noeEtebar",
		},
		{
			title: t("credits.credit_budget_origin.culoumns_header.amaliat"),
			key: "actions",
			render: (_: any, record: CreditEntry) => (
				<div className="flex gap-2 items-center">
					<TableActions
						record={record}
						onRefresh={() => {}}
						openCreateModalCredit={() => openCreateModalCredit(null, record.id ? record.id : null)}
						onEdit={() => onEdit(record)}
					/>
					<Button
						className="bg-chart3 hover:bg-chart3/80 text-white border rounded-2xl py-1 px-2 text-xs cursor-pointer"
						onClick={() => showDataCredits(record)}
					>
						{t("credits.credit_budget_origin.show_data_budgets")}
					</Button>
				</div>
			),
		},
	];

	return (
		<CardContent className="w-full">
			<Table
				rowSelection={{ type: "checkbox" }}
				columns={columns}
				dataSource={data}
				rowKey="id"
				style={{ direction: locale === "fa_IR" ? "rtl" : "ltr" }}
				className="max-w-full"
			/>
		</CardContent>
	);
}
