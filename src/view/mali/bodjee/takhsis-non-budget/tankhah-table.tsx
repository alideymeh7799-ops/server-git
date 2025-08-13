import type { CreditEntry } from "#/entity";
import PrintData from "@/components/print-data";
import Table from "antd/es/table";
import { useRef } from "react";

const tankhahTableColumns = [
  { title: "ردیف", dataIndex: "radif", key: "radif" },
  { title: "مبلغ پرداختی", dataIndex: "amount", key: "amount" },
  { title: "نام عامل خرید", dataIndex: "agent", key: "agent" },
  { title: "نوع پرداخت", dataIndex: "type", key: "type" },
  { title: "شرح تنخواه", dataIndex: "desc", key: "desc" },
  { title: "تاریخ تنخواه", dataIndex: "date", key: "date" },
  { title: "یگان واگذار کننده", dataIndex: "unit", key: "unit" },
];

interface TankhahTableProps {
  selectedRow: CreditEntry | null;
}

const TankhahTable: React.FC<TankhahTableProps> = ({ selectedRow }) => {
  const tableRefTankhah = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-muted/30 border rounded-xl shadow-sm p-4 space-y-2">
      <h3 className="font-semibold text-base text-gray-700 mb-2">
        لیست تنخواه پرداختی
      </h3>
      <PrintData
        dataExcel={{
          data: [],
          nameFile: `لیست تنخواه پرداختی ${selectedRow?.program || ""}`,
          nameSheet: selectedRow?.program || "",
          columns: tankhahTableColumns,
        }}
        dataPrint={{
          idSelcted: tableRefTankhah.current,
          name: `لیست تنخواه پرداختی ${selectedRow?.program || ""}`,
        }}
      />
      <div ref={tableRefTankhah} className="w-full">
        <Table
          rowKey={(_, index) => `tankhah-${index}`}
          size="small"
          columns={tankhahTableColumns}
          dataSource={[]}
          pagination={false}
        />
        <div className="text-sm font-semibold text-right pt-2 border-t mt-2">
          جمع کل تنخواه: ۰ ریال
        </div>
      </div>
    </div>
  );
};

export default TankhahTable;
