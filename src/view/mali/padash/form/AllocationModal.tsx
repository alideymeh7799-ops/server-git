import { Button } from "@/ui/button";
import type { TabsProps } from "antd";
import { Checkbox, DatePicker, Input, message, Modal, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { cn } from "@/utils";

const pettyCashData = [
  {
    id: 1,
    name: "افسر ۱",
    amount: 1000000,
    desc: "برای خرید تجهیزات",
    account: "123456",
  },
  {
    id: 2,
    name: "افسر ۲",
    amount: 1500000,
    desc: "برای تعمیرات",
    account: "789456",
  },
];

const cashPaymentData = [
  {
    id: 3,
    name: "هزینه ۱",
    amount: 500000,
    desc: "هزینه ایاب و ذهاب",
    account: "987654",
  },
  {
    id: 4,
    name: "هزینه ۲",
    amount: 800000,
    desc: "هزینه پذیرایی",
    account: "321654",
  },
];

export default function AllocationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedPettyCashId, setSelectedPettyCashId] = useState<number | null>(
    null
  );
  const [selectedCashPaymentId, setSelectedCashPaymentId] = useState<
    number | null
  >(null);

  const [pettyForm, setPettyForm] = useState({
    officer: "",
    amount: "",
    desc: "",
  });
  const [cashForm, setCashForm] = useState({ amount: "", desc: "", date: "" });

  const handlePettySubmit = () => {
    if (!pettyForm.officer || !pettyForm.amount)
      return message.error("لطفا اطلاعات را کامل کنید");
    message.success("تنخواه ثبت شد");
    setSelectedPettyCashId(null);
    setPettyForm({ officer: "", amount: "", desc: "" });
  };

  const handleCashSubmit = () => {
    if (!cashForm.amount || !cashForm.date)
      return message.error("لطفا اطلاعات را کامل کنید");
    message.success("پرداخت نقدی ثبت شد");
    setSelectedCashPaymentId(null);
    setCashForm({ amount: "", desc: "", date: "" });
  };

  const withCheckboxColumn = (selectedId: number | null): ColumnsType<any> => [
    {
      title: "",
      dataIndex: "checkbox",
      render: (_, record) => <Checkbox checked={selectedId === record.id} />,
    },
    { title: "نام", dataIndex: "name" },
    { title: "مبلغ", dataIndex: "amount" },
    { title: "شرح", dataIndex: "desc" },
    { title: "شماره حساب", dataIndex: "account" },
  ];

  const items: TabsProps["items"] = [
    {
      key: "petty",
      label: "تنخواه",
      children: (
        <div>
          <Table
            rowKey="id"
            dataSource={pettyCashData}
            columns={withCheckboxColumn(selectedPettyCashId)}
            onRow={(record) => ({
              onClick: () => setSelectedPettyCashId(record.id),
              className: cn({
                "bg-green-100": selectedPettyCashId === record.id,
                "cursor-pointer": true,
              }),
            })}
            pagination={false}
          />
          {selectedPettyCashId && (
            <div className="mt-4 space-y-2">
              <Input
                placeholder="افسر خرید"
                value={pettyForm.officer}
                onChange={(e) =>
                  setPettyForm({ ...pettyForm, officer: e.target.value })
                }
              />
              <Input
                placeholder="مبلغ"
                value={pettyForm.amount}
                onChange={(e) =>
                  setPettyForm({ ...pettyForm, amount: e.target.value })
                }
              />
              <Input.TextArea
                placeholder="شرح"
                value={pettyForm.desc}
                onChange={(e) =>
                  setPettyForm({ ...pettyForm, desc: e.target.value })
                }
              />
              <Button
                onClick={handlePettySubmit}
                className="bg-green-600 text-white"
              >
                ثبت
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "cash",
      label: "نقد پرداخت",
      children: (
        <div>
          <Table
            rowKey="id"
            dataSource={cashPaymentData}
            columns={withCheckboxColumn(selectedCashPaymentId)}
            onRow={(record) => ({
              onClick: () => setSelectedCashPaymentId(record.id),
              className: cn({
                "bg-blue-100": selectedCashPaymentId === record.id,
                "cursor-pointer": true,
              }),
            })}
            pagination={false}
          />
          {selectedCashPaymentId && (
            <div className="mt-4 space-y-2">
              <Input
                placeholder="مبلغ"
                value={cashForm.amount}
                onChange={(e) =>
                  setCashForm({ ...cashForm, amount: e.target.value })
                }
              />
              <Input.TextArea
                placeholder="شرح هزینه"
                value={cashForm.desc}
                onChange={(e) =>
                  setCashForm({ ...cashForm, desc: e.target.value })
                }
              />
              <DatePicker
                placeholder="تاریخ"
                className="w-full"
                onChange={(dateString) =>
                  setCashForm({
                    ...cashForm,
                    date: dateString.toLocaleString(),
                  })
                }
              />
              <Button
                onClick={handleCashSubmit}
                className="bg-blue-600 text-white"
              >
                ثبت
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="تخصیص اعتبار"
      width={800}
    >
      <Tabs items={items} />
    </Modal>
  );
}
