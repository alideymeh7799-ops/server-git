import type { CreditEntry } from "#/entity";
import { CardContent } from "@/ui/card";
import { cn } from "@/utils";
import { Button, Input, Modal, Table } from "antd";
import { useState } from "react";
import { navItemClasses } from "./styles";
import { TableActions } from "./table-actions";

// تعریف نوع برای دیتای جدول اعتبارات
interface CreditDetail {
  creditNumber: string;
  creditDate: string;
  amount: number;
  assigningUnit: string;
}

const itemClassName = cn(
  navItemClasses.base,
  navItemClasses.hover,
  "min-h-[44px]",
  true && 1 && navItemClasses.active
);

interface CreditBudgetTableProps {
  onEdit: (formValue: CreditEntry) => void;
  data: CreditEntry[];
  // setData: (data: CreditEntry[]) => void;
  openCreateModalCredit: () => void;
}

export default function CreditBudgetTable({
  onEdit,
  data,

  openCreateModalCredit,
}: CreditBudgetTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CreditEntry | null>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  // دیتای نمونه برای جدول اعتبارات (می‌توانید با API جایگزین کنید)
  const creditDetails: CreditDetail[] = [
    {
      creditNumber: "CRD001",
      creditDate: "1404/04/01",
      amount: 5000000,
      assigningUnit: "یگان الف",
    },
    {
      creditNumber: "CRD002",
      creditDate: "1404/04/15",
      amount: 7500000,
      assigningUnit: "یگان ب",
    },
  ];

  // فیلتر کردن داده‌ها بر اساس جستجو و ستون انتخاب‌شده
  const filteredCreditDetails = creditDetails.filter((item) => {
    if (!searchText) return true;
    if (!selectedColumn) {
      return Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    }
    const value = item[selectedColumn as keyof CreditDetail];
    return value?.toString().toLowerCase().includes(searchText.toLowerCase());
  });

  const showCreditModal = (record: CreditEntry) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
    setSearchText("");
    setSelectedColumn(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setSearchText("");
    setSelectedColumn(null);
  };

  const handleColumnClick = (columnKey: string) => {
    setSelectedColumn(columnKey);
  };

  const handleResetSearch = () => {
    setSearchText("");
    setSelectedColumn(null);
  };

  const creditColumns = [
    {
      title: (
        <span
          className="cursor-pointer hover:text-blue-500"
          onClick={() => handleColumnClick("creditNumber")}
        >
          شماره اعتبار
        </span>
      ),
      dataIndex: "creditNumber",
      key: "creditNumber",
    },
    {
      title: (
        <span
          className="cursor-pointer hover:text-blue-500"
          onClick={() => handleColumnClick("creditDate")}
        >
          تاریخ اعتبار
        </span>
      ),
      dataIndex: "creditDate",
      key: "creditDate",
    },
    {
      title: (
        <span
          className="cursor-pointer hover:text-blue-500"
          onClick={() => handleColumnClick("amount")}
        >
          مبلغ
        </span>
      ),
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toLocaleString()} ریال`,
    },
    {
      title: (
        <span
          className="cursor-pointer hover:text-blue-500"
          onClick={() => handleColumnClick("assigningUnit")}
        >
          یگان واگزار کننده
        </span>
      ),
      dataIndex: "assigningUnit",
      key: "assigningUnit",
    },
  ];

  const columns = [
    { title: "ردیف", dataIndex: "id", key: "id" },
    {
      title: <span className={itemClassName}>برنامه</span>,
      dataIndex: "program",
      key: "program",
    },
    { title: "شرح برنامه", dataIndex: "barnameID", key: "barnameID" },
    { title: "شرح فعالیت", dataIndex: "faaliatID", key: "faaliatID" },
    // { title: "تاریخ ", dataIndex: "deletedAt", key: "deletedAt" },
    { title: "ماده", dataIndex: "madeh", key: "madeh" },
    {
      title: "شرح هزینه",
      dataIndex: "payment_description",
      key: "payment_description",
    },
    {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: CreditEntry) => (
        <div className="flex gap-2 items-center">
          <TableActions
            record={record}
            onRefresh={() => {}}
            openCreateModalCredit={() => openCreateModalCredit()}
            onEdit={() => onEdit(record)}
          />
          <Button
            className="bg-background border rounded-2xl text-primary py-1 px-2 text-xs cursor-pointer"
            onClick={() => showCreditModal(record)}
          >
            نمایش اعتبارات
          </Button>
        </div>
      ),
    },
  ];

  return (
    <CardContent>
      <Table
        rowSelection={{ type: "checkbox" }}
        columns={columns}
        dataSource={data}
        // loading={loading}
        rowKey="id"
      />
      <Modal
        title={
          <div className="p-6 bg-gray-50 rounded-t-lg shadow-sm px-12">
            <h3 className="text-xl font-bold text-gray-800">جزئیات ردیف</h3>
            {selectedRecord && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-700">
                  <strong className="font-semibold">برنامه:</strong>{" "}
                  {selectedRecord.program}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold">شرح هزینه:</strong>{" "}
                  {selectedRecord.payment_description}
                </p>
              </div>
            )}
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="modal-slide-up"
        styles={{
          content: {
            padding: 0,
            background: "#fff",
            borderRadius: "16px 16px 0 0",
          },
          body: { padding: "24px" },
        }}
      >
        <div className="mb-4 flex items-center gap-4">
          <Input
            placeholder={
              selectedColumn
                ? `جستجو در ${
                    creditColumns.find((col) => col.key === selectedColumn)
                      ?.title?.props?.children || selectedColumn
                  }...`
                : "جستجو در اعتبارات..."
            }
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full max-w-md"
            allowClear
          />
          <Button onClick={handleResetSearch}>ریست جستجو</Button>
        </div>
        <Table
          columns={creditColumns}
          dataSource={filteredCreditDetails}
          rowKey="creditNumber"
          pagination={false}
          className="ant-table-custom"
        />
      </Modal>
    </CardContent>
  );
}

// CSS برای انیمیشن و استایل مودال
const modalStyles = `
  .modal-slide-up{
    width:90vw !important;

  }
  .modal-slide-up .ant-modal {
    top: 0 ;
    bottom: 0 !important;
    margin: 0 !important;
    width: 95% !important;
    max-width: 1400px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    padding-bottom: 0 !important;
  }

  .modal-slide-up .ant-modal-content {
    border-radius: 16px 16px 0 0 !important;
    overflow: hidden;
    transform: translateY(100%);
    animation: slideUp 0.3s ease-out forwards;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  .modal-slide-up .ant-modal-mask {
    background: rgba(0, 0, 0, 0.6) !important;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .modal-slide-up .ant-modal-close {
    top: 16px !important;
    right: 16px !important;
    color: #000 !important;
    font-size: 16px !important;
  }

  .modal-slide-up .ant-modal-close-x {
    width: 40px !important;
    height: 40px !important;
    line-height: 40px !important;
    font-size: 18px !important;
    color: #555 !important;
  }

  .ant-table-custom .ant-table-thead > tr > th {
    background: #f8f9fa !important;
    font-weight: 600 !important;
    color: #333 !important;
    padding: 12px 16px !important;
    text-align: right !important;
    transition: background 0.2s ease;
  }

  .ant-table-custom .ant-table-thead > tr > th:hover {
    background: #e6f7ff !important;
  }

  .ant-table-custom .ant-table-tbody > tr > td {
    padding: 12px 16px !important;
    text-align: right !important;
  }

  @media (max-width: 768px) {
    .modal-slide-up .ant-modal {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
    }
  }
`;

// اضافه کردن استایل‌ها به سند
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = modalStyles;
  document.head.appendChild(styleSheet);
}
