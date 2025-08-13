import type { TakhsisItem, TankhahTypeData } from "#/entity";
import { convertToShamsiIntl } from "@/hooks/converted-time";
import Table from "antd/es/table";
import { useEffect, useRef, useState } from "react";

const tankhahTableColumns = [
  // { title: "ردیف", dataIndex: "radif", key: "radif" },
  {
    title: "مبلغ پرداختی",
    dataIndex: "amount",
    key: "amount",
    render: (v: any) => (v ? v.toLocaleString() : "-"),
  },
  // { title: "نام عامل خرید", dataIndex: "agent", key: "agent" },
  // { title: "نوع پرداخت", dataIndex: "type", key: "type" },
  { title: "شرح تنخواه", dataIndex: "description", key: "description" },
  {
    title: "تاریخ تنخواه",
    dataIndex: "date_tankhah",
    key: "date_tankhah",
    render: (v: any) => (v ? convertToShamsiIntl(v, "date") : "-"),
  },
  // { title: "یگان واگذار کننده", dataIndex: "unit", key: "unit" },
];

interface TankhahTableProps {
  selectedRow: TakhsisItem | null;
  dataSource: TankhahTypeData[];
}

const TankhahTable: React.FC<TankhahTableProps> = ({
  selectedRow,
  dataSource,
}) => {
  const tableRefTankhah = useRef<HTMLDivElement>(null);
  console.log(selectedRow);
  const [allAmount, setAllAmount] = useState(0);
  useEffect(() => {
    const total = dataSource.reduce((acc, item) => acc + (item.amount || 0), 0);
    setAllAmount(total);
  }, [dataSource]);

  return (
    <div className="bg-muted/30 border rounded-xl shadow-sm p-4 space-y-2">
      <h3 className="font-semibold text-base text-gray-700 mb-2">
        لیست تنخواه پرداختی
      </h3>
      {/* <PrintData
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
      /> */}
      <div ref={tableRefTankhah} className="w-full">
        <Table
          rowKey={(_, index) => `tankhah-${index}`}
          size="small"
          columns={tankhahTableColumns}
          dataSource={dataSource}
          pagination={false}
        />
        <div className=" text-primary   pt-2 border-t mt-2">
          جمع کل تنخواه:
          {Number(allAmount).toLocaleString()}
          {"  ریال "}
        </div>
      </div>
    </div>
  );
};

export default TankhahTable;
