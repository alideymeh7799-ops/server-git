import { convertToShamsiIntl } from "@/hooks/converted-time";
import { CreditDetailBargeEtebar, TakhsisItem } from "@/types/entity";
import { Button } from "@/ui/button";
import { CardContent } from "@/ui/card";
import { Table } from "antd";
import { toast } from "sonner";

type Props = {
  dataSource: TakhsisItem[];
  onEdit: (
    itemSelcted: CreditDetailBargeEtebar | null,
    record: TakhsisItem
  ) => void;
  onDelete: (id: number | string) => void;
  selectedTakhsisItem: CreditDetailBargeEtebar | null;
};

export default function TakhsisTableInCard({
  dataSource,
  onEdit,
  onDelete,
  selectedTakhsisItem,
}: Props) {
  const handleDelete = (record: TakhsisItem) => {
    toast.warning(`آیا از حذف  مطمئن هستید؟`, {
      action: {
        label: "حذف",
        onClick: () => {
          if (record.id) onDelete(record.id);
        },
      },
      cancel: {
        label: "لغو",
        onClick: () => console.log("حذف لغو شد"),
      },
    });
  };
  return (
    <CardContent>
      <Table<TakhsisItem>
        rowKey="id"
        columns={[
          {
            title: "مبلغ تخصیص",
            dataIndex: "amount_takhsis",
            render: (v) => (v ? v.toLocaleString() : "-"),
          },
          {
            title: "شرح تخصیص",
            dataIndex: "sharh_takhsis",
            render: (v) => v || "-",
          },
          {
            title: "شناسه اعتبار",
            dataIndex: "add_credit_id",
            render: (v) => v ?? "-",
          },
          {
            title: "تاریخ تخصیص",
            dataIndex: "date_takhsis",
            render: (v) => (v ? convertToShamsiIntl(v, "date") : "-"),
          },
          {
            title: "یگان",
            dataIndex: "yegan",
            render: (v) => (v?.name ? v.name : "-"),
          },
          {
            title: "عملیات",
            render: (_, item) => (
              <div className="flex gap-2">
                <Button
                  className="bg-primary/70 hover:bg-primary text-white font-bold"
                  onClick={() => onEdit(selectedTakhsisItem, item)}
                >
                  ویرایش
                </Button>
                <Button
                  className="bg-error/70 hover:bg-error text-white font-bold"
                  onClick={() => handleDelete(item)}
                >
                  حذف
                </Button>
              </div>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={false}
        size="small"
      />
    </CardContent>
  );
}
