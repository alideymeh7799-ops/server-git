    import { Input, Modal, Table } from "antd";
import { useMemo, useState } from "react";

export type Account = {
  id: string;
  owner: string;
  accountNumber: string;
};

type AccountSelectModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (account: Account) => void;
};

const mockAccounts: Account[] = [
  { id: "1", owner: "علی رضایی", accountNumber: "1234567890" },
  { id: "2", owner: "مهدی محمدی", accountNumber: "2233445566" },
  { id: "3", owner: "زهرا احمدی", accountNumber: "9876543210" },
];

export default function AccountSelectModal({ open, onClose, onSelect }: AccountSelectModalProps) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return mockAccounts.filter((acc) =>
      acc.owner.includes(search) || acc.accountNumber.includes(search)
    );
  }, [search]);

  const columns = [
    { title: "نام", dataIndex: "owner", key: "owner" },
    { title: "شماره حساب", dataIndex: "accountNumber", key: "accountNumber" },
    {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: Account) => (
        <a onClick={() => { onSelect(record); onClose(); }}>انتخاب</a>
      ),
    },
  ];

  return (
    <Modal
      title="انتخاب حساب بانکی"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Input
        placeholder="جستجو بر اساس نام یا شماره حساب"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <Table
        rowKey="id"
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        size="small"
      />
    </Modal>
  );
}
