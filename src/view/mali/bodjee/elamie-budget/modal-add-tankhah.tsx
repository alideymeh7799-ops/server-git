import { Input, Modal, Select } from "antd";
import { useState } from "react";

// interface CreditItem {
//   id: number;
//   radif: number;
//   program: string;
//   faliat: string;
//   madeh: string;
//   sharh_hazineh: string;
//   sharhe_program: string;
//   sharh_faliat: string;
//   noeEtebar: string;
// }

// interface ReturnEntry {
//   buyer: string;
//   amount: number;
//   docCode: string;
//   date?: string; // رشته تاریخ به صورت "YYYY-MM-DD"
//   returnType?: "اعلام برگشتی" | "سند برگشتی";
// }

const ModalAddTankhah = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // const [returnType, setReturnType] = useState<
  //   "اعلام برگشتی" | "سند برگشتی" | null
  // >(null);
  const [amount, setAmount] = useState<number>(0);
  const [docCode, setDocCode] = useState<string>("");
  const [date, setDate] = useState<string>(""); // رشته تاریخ

  // const [docs, setDocs] = useState<ReturnEntry[]>([]);
  // const [announcements, setAnnouncements] = useState<ReturnEntry[]>([]);

  // خطاهای فرم
  const [errors, setErrors] = useState<{
    returnType?: string;
    amount?: string;
    docCode?: string;
    date?: string;
  }>({});
  const handleSubmit = () => {
    setErrors({ amount: "s" });
  };
  return (
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
          // value={returnType ?? undefined}
          // onChange={(val: "اعلام برگشتی" | "سند برگشتی") =>
          //   setReturnType(val)
          // }
          // status={errors.returnType ? "error" : ""}
        >
          <Select.Option value="اعلام برگشتی">اعلام برگشتی</Select.Option>
          <Select.Option value="سند برگشتی">سند برگشتی</Select.Option>
        </Select>
        {errors.returnType && (
          <div style={{ color: "red", fontSize: 12 }}>{errors.returnType}</div>
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
  );
};

export default ModalAddTankhah;
