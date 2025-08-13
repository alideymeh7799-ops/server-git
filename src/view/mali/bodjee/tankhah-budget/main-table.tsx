import { convertToShamsiIntl } from "@/hooks/converted-time";
import { TakhsisItem } from "@/types/entity";
import { Button } from "@/ui/button";
import Table from "antd/es/table";

interface MainTableProps {
  dataSource: TakhsisItem[];
  selectedRow: TakhsisItem | null;
  setSelectedRow: (row: TakhsisItem | null) => void;
  openCreateNewTankhahModal: () => void;
}

export default function MainTable({
  dataSource,
  selectedRow,
  setSelectedRow,
  openCreateNewTankhahModal,
}: MainTableProps) {
  const baseColumns = [
    {
      title: "مبلغ تخصیص",
      dataIndex: "amount_takhsis",
      render: (v: any) => (v ? v.toLocaleString() : "-"),
    },
    {
      title: "شرح تخصیص",
      dataIndex: "sharh_takhsis",
      render: (v: any) => v || "-",
    },
    {
      title: "شناسه اعتبار",
      dataIndex: "add_credit_id",
      render: (v: any) => v ?? "-",
    },
    {
      title: "تاریخ تخصیص",
      dataIndex: "date_takhsis",
      render: (v: any) => (v ? convertToShamsiIntl(v, "date") : "-"),
    },
    {
      title: "یگان",
      dataIndex: "yegan",
      render: (v: any) => (v?.name ? v.name : "-"),
    },
    {
      title: "عملیات",
      render: () => (
        <div className="flex gap-2">
          <Button
            className="bg-primary-dark/80 hover:bg-primary-dark cursor-pointer text-white font-bold "
            onClick={() => {
              openCreateNewTankhahModal();
            }}
          >
            ثبت تنخواه
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 5 }}
        columns={baseColumns}
        onRow={(record) => ({
          onClick: () =>
            setSelectedRow(selectedRow?.id !== record.id ? record : null),
          style: {
            cursor: "pointer",
            backgroundColor:
              selectedRow?.id === record.id ? "bg-primary" : undefined,
          },
        })}
        dataSource={dataSource}
      />
      {/* <div className="mt-4 text-right font-bold text-blue-700">ثبت تنخواه</div> */}
    </div>
  );
}
