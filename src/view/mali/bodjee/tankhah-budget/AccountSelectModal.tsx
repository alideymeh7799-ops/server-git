import { PeymanKarTypeData } from "@/types/entity";
import { Input, Modal, Table } from "antd";
import { useMemo, useState } from "react";

type AccountSelectModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (account: PeymanKarTypeData) => void;
  peymanKarList: PeymanKarTypeData[];
};

export default function AccountSelectModal({
  open,
  onClose,
  onSelect,
  peymanKarList,
}: AccountSelectModalProps) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return peymanKarList.filter((acc) => {
      if (!acc || !acc.name || !acc.number_hesab) return false;

      return (
        acc.name.includes(search) || String(acc.number_hesab).includes(search)
      );
    });
  }, [search, peymanKarList]);

  const columns = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "شماره حساب", dataIndex: "number_hesab", key: "number_hesab" },
    {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: PeymanKarTypeData) => (
        <a
          onClick={() => {
            onSelect(record);
            onClose();
          }}
        >
          انتخاب
        </a>
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
        // pagination={{ pageSize: 5 }}
        size="small"
      />
    </Modal>
  );
}
