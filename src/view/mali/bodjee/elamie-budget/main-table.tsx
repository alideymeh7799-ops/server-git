import { Button, Input, Modal, Select, Space, Table } from "antd";
import { useState } from "react";

interface CreditItem {
  id: number;
  radif: number;
  program: string;
  faliat: string;
  madeh: string;
  sharh_hazineh: string;
  sharhe_program: string;
  sharh_faliat: string;
  noeEtebar: string;
}

interface ReturnEntry {
  buyer: string;
  amount: number;
  docCode: string;
  date?: string; // رشته تاریخ به صورت "YYYY-MM-DD"
  returnType?: "اعلام برگشتی" | "سند برگشتی";
}

const CreditTable = () => {
  const fakeData: CreditItem[] = [
    {
      id: 1,
      radif: 1,
      program: "برنامه اول",
      faliat: "فعالیت A",
      madeh: "ماده ۱",
      sharh_hazineh: "هزینه نمونه",
      sharhe_program: "شرح برنامه",
      sharh_faliat: "شرح فعالیت",
      noeEtebar: "نوع ۱",
    },
    {
      id: 2,
      radif: 2,
      program: "برنامه دوم",
      faliat: "فعالیت B",
      madeh: "ماده ۲",
      sharh_hazineh: "هزینه تست",
      sharhe_program: "شرح برنامه ۲",
      sharh_faliat: "شرح فعالیت ۲",
      noeEtebar: "نوع ۲",
    },
  ];

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [returnType, setReturnType] = useState<
    "اعلام برگشتی" | "سند برگشتی" | null
  >(null);
  const [amount, setAmount] = useState<number>(0);
  const [docCode, setDocCode] = useState<string>("");
  const [date, setDate] = useState<string>(""); // رشته تاریخ

  const [docs, setDocs] = useState<ReturnEntry[]>([]);
  const [announcements, setAnnouncements] = useState<ReturnEntry[]>([]);

  // خطاهای فرم
  const [errors, setErrors] = useState<{
    returnType?: string;
    amount?: string;
    docCode?: string;
    date?: string;
  }>({});

  const handleOpenModal = () => {
    setModalOpen(true);
    setEditingIndex(null); // ثبت جدید
    setReturnType(null);
    setAmount(0);
    setDocCode("");
    setDate("");
    setErrors({});
  };

  const handleEdit = (
    entry: ReturnEntry,
    index: number,
    type: "doc" | "announcement"
  ) => {
    setAmount(entry.amount);
    setDocCode(entry.docCode);
    setDate(entry.date ?? "");
    setReturnType(
      entry.returnType ?? (type === "doc" ? "سند برگشتی" : "اعلام برگشتی")
    );
    setEditingIndex(index);
    setModalOpen(true);
    setErrors({});
  };

  const handleDelete = (index: number, type: "doc" | "announcement") => {
    if (type === "doc") {
      setDocs((prev) => prev.filter((_, i) => i !== index));
    } else {
      setAnnouncements((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!returnType) newErrors.returnType = "لطفا نوع برگشتی را انتخاب کنید.";
    if (!amount || amount <= 0)
      newErrors.amount = "مبلغ برگشتی باید بزرگتر از صفر باشد.";
    if (!docCode.trim()) newErrors.docCode = "کد مدرک یگان را وارد کنید.";
    if (!date) newErrors.date = "تاریخ برگشتی را انتخاب کنید.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const entry: ReturnEntry = {
      buyer: "عامل خرید پیش‌فرض",
      amount,
      docCode,
      date,
      returnType: returnType || undefined,
    };

    if (editingIndex !== null) {
      // ویرایش
      if (returnType === "سند برگشتی") {
        setDocs((prev) => {
          const updated = [...prev];
          updated[editingIndex] = entry;
          return updated;
        });
      } else {
        setAnnouncements((prev) => {
          const updated = [...prev];
          updated[editingIndex] = entry;
          return updated;
        });
      }
    } else {
      // ثبت جدید
      if (returnType === "سند برگشتی") {
        setDocs((prev) => [...prev, entry]);
      } else {
        setAnnouncements((prev) => [...prev, entry]);
      }
    }

    // ریست فرم و بستن مودال
    setModalOpen(false);
    setAmount(0);
    setDocCode("");
    setReturnType(null);
    setDate("");
    setEditingIndex(null);
    setErrors({});
  };

  const sumAmount = (arr: ReturnEntry[]) =>
    arr.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const mainTableColumns = [
    { title: "ردیف", dataIndex: "radif", key: "radif" },
    { title: "برنامه", dataIndex: "program", key: "program" },
    { title: "فعالیت", dataIndex: "faliat", key: "faliat" },
    { title: "ماده", dataIndex: "madeh", key: "madeh" },
    { title: "شرح هزینه", dataIndex: "sharh_hazineh", key: "sharh_hazineh" },
    { title: "شرح برنامه", dataIndex: "sharhe_program", key: "sharhe_program" },
    { title: "شرح فعالیت", dataIndex: "sharh_faliat", key: "sharh_faliat" },
    { title: "نوع اعتبار", dataIndex: "noeEtebar", key: "noeEtebar" },
    {
      title: "عملیات",
      key: "action",
      render: () => <Button onClick={handleOpenModal}>ثبت سند برگشتی</Button>,
    },
  ];

  const docColumns = [
    { title: "عامل خرید", dataIndex: "buyer", key: "buyer" },
    { title: "مبلغ برگشتی", dataIndex: "amount", key: "amount" },
    { title: "مدرک یگان", dataIndex: "docCode", key: "docCode" },
    { title: "تاریخ سند", dataIndex: "date", key: "date" },
    { title: "نوع برگشتی", dataIndex: "returnType", key: "returnType" },
    {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: ReturnEntry, index: number) => (
        <Space>
          <Button onClick={() => handleEdit(record, index, "doc")}>
            ویرایش
          </Button>
          <Button danger onClick={() => handleDelete(index, "doc")}>
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  const annColumns = [
    { title: "مبلغ برگشتی", dataIndex: "amount", key: "amount" },
    { title: "عامل خرید", dataIndex: "buyer", key: "buyer" },
    { title: "مدرک یگان", dataIndex: "docCode", key: "docCode" },
    { title: "تاریخ سند", dataIndex: "date", key: "date" },
    {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: ReturnEntry, index: number) => (
        <Space>
          <Button onClick={() => handleEdit(record, index, "announcement")}>
            ویرایش
          </Button>
          <Button danger onClick={() => handleDelete(index, "announcement")}>
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={mainTableColumns}
        dataSource={fakeData}
        rowKey="id"
        pagination={false}
      />

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        title="تخصیص اعتبار"
      >
        <div className="space-y-4">
          <Select
            placeholder="نوع برگشتی"
            className="w-full"
            value={returnType ?? undefined}
            onChange={(val: "اعلام برگشتی" | "سند برگشتی") =>
              setReturnType(val)
            }
            status={errors.returnType ? "error" : ""}
          >
            <Select.Option value="اعلام برگشتی">اعلام برگشتی</Select.Option>
            <Select.Option value="سند برگشتی">سند برگشتی</Select.Option>
          </Select>
          {errors.returnType && (
            <div style={{ color: "red", fontSize: 12 }}>
              {errors.returnType}
            </div>
          )}

          <div>مانده تنخواه: ۵۰۰,۰۰۰ ریال</div>

          <Input
            type="number"
            placeholder="مبلغ برگشتی"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            status={errors.amount ? "error" : ""}
          />
          {errors.amount && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.amount}</div>
          )}

          <Input
            placeholder="کد مدرک یگان"
            value={docCode}
            onChange={(e) => setDocCode(e.target.value)}
            status={errors.docCode ? "error" : ""}
          />
          {errors.docCode && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.docCode}</div>
          )}

          {/* input type date */}
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            status={errors.date ? "error" : ""}
          />
          {errors.date && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.date}</div>
          )}
        </div>
      </Modal>

      <h3>اسناد برگشتی</h3>
      <Table
        columns={docColumns}
        dataSource={docs}
        pagination={false}
        rowKey={(record) => record.docCode + record.date}
        locale={{ emptyText: "هیچ سند برگشتی ثبت نشده" }}
      />
      <div>جمع اسناد برگشتی: {sumAmount(docs).toLocaleString()}</div>

      <h3>اعلام برگشتی</h3>
      <Table
        columns={annColumns}
        dataSource={announcements}
        pagination={false}
        rowKey={(record, idx) => record.docCode + idx}
        locale={{ emptyText: "هیچ اعلام برگشتی ثبت نشده" }}
      />
      <div>جمع اعلام برگشتی: {sumAmount(announcements).toLocaleString()}</div>
    </>
  );
};

export default CreditTable;
