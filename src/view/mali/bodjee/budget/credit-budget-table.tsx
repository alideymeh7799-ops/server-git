import type { CreditDetailBargeEtebar, CreditEntry } from "#/entity";
import { resourceAndOperation } from "@/_mock/item-permission";
import { usePermission } from "@/hooks/user";
import useLocale from "@/locales/use-locale";
import { Button } from "@/ui/button";
import { CardContent } from "@/ui/card";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { TableActions } from "./table-actions";

interface CreditBudgetTableProps {
  onEdit: (formValue: CreditEntry) => void;
  data: CreditEntry[];
  openCreateModalCredit: (
    record: CreditDetailBargeEtebar | null,
    id: string | number | null
  ) => void;
  selectedRow: CreditEntry | null;
  // showCreditModal: (record: CreditEntry) => void;
  showDataCredits: (record: CreditEntry | null) => void;
}
export default function CreditBudgetTable({
  onEdit,
  data,

  openCreateModalCredit,
  // showCreditModal,
  selectedRow,
  showDataCredits,
}: CreditBudgetTableProps) {
  const serverAllowed = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const { locale } = useLocale();

  const { t } = useTranslation();
  const getColumns = () => {
    const actionsEnabled = {
      canEdit: serverAllowed.can(
        resourceList.CREDITBUDGET,
        operationList.UPDATE
      ),
      canDelete: serverAllowed.can(
        resourceList.CREDITBUDGET,
        operationList.DELETE
      ),
    };

    const baseColumns: any[] = [
      {
        title: t("credits.credit_budget_origin.culoumns_header.radif"),
        dataIndex: "radif",
        key: "radif",
      },
      {
        title: t("credits.credit_budget_origin.culoumns_header.program"),
        key: "barname",
        render: (_: any, record: CreditEntry) => record.barname?.code ?? "-",
      },
      {
        title: t("credits.credit_budget_origin.culoumns_header.faliat"),
        key: "faaliat",
        render: (_: any, record: CreditEntry) => record.faaliat?.code ?? "-",
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
        key: "sharhe_program",
        render: (_: any, record: CreditEntry) => record.barname?.code ?? "-",
      },
      {
        title: t("credits.credit_budget_origin.culoumns_header.sharh_faliat"),
        key: "sharh_faliat",
        render: (_: any, record: CreditEntry) => record.faaliat?.code ?? "-",
      },
      {
        title: t("credits.credit_budget_origin.culoumns_header.noeEtebar"),
        dataIndex: "noe_etebar",
        key: "noe_etebar",
      },
    ];

    const actionColumn = {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: CreditEntry) => (
        <div className="flex gap-2 items-center">
          <TableActions
            record={record}
            onRefresh={() => {}}
            openCreateModalCredit={() =>
              openCreateModalCredit(null, record.id ? record.id : null)
            }
            onEdit={() => onEdit(record)}
          />
          {(serverAllowed.can(
            resourceList.CREDITBUDGET,
            operationList.UPDATE
          ) ||
            serverAllowed.can(
              resourceList.CREDITBUDGET,
              operationList.CREATE
            )) && (
            <Button
              className={
                record?.id === selectedRow?.id
                  ? "bg-error-dark hover:bg-error text-white py-1 px-2 text-xs cursor-pointer"
                  : "bg-chart3 hover:bg-chart3/80 text-white border py-1 px-2 text-xs cursor-pointer"
              }
              onClick={() =>
                showDataCredits(record?.id === selectedRow?.id ? null : record)
              }
            >
              {record?.id === selectedRow?.id
                ? "بستن اعتبارات"
                : t("credits.credit_budget_origin.show_data_budgets")}
            </Button>
          )}
        </div>
      ),
    };

    if (actionsEnabled.canEdit || actionsEnabled.canDelete) {
      baseColumns.push(actionColumn);
    }

    return baseColumns;
  };

  return (
    <CardContent className="w-full">
      <Table
        // rowSelection={{ type: "checkbox" }}
        columns={getColumns()}
        dataSource={data}
        rowKey="id"
        style={{ direction: locale === "fa_IR" ? "rtl" : "ltr" }}
        className="max-w-full "
        rowClassName={(record) =>
          record?.id === selectedRow?.id ? "bg-accent-foreground/20" : ""
        }
      />
    </CardContent>
  );
}
