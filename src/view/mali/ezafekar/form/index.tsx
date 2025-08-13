import { usePermission } from "@/hooks/user";
import { Button } from "@/ui/button";
import { Card, CardHeader } from "@/ui/card";
import { Input, message, Modal, Select, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

export default function EzafeKar() {
  const { can } = usePermission();
  const [extraDate, setExtraDate] = useState("");

  const [selectedUnit, setSelectedUnit] = useState<string>("");
  // const [filteredPersonnel, setFilteredPersonnel] = useState(personnelData);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [extraAmount, setExtraAmount] = useState("");
  const [extraList, setExtraList] = useState<any[]>([]);

  // const handleSearch = () => {
  //   const filtered = personnelData.filter((p) => p.name.includes(search));
  //   setFilteredPersonnel(filtered);
  // };
  const handleAddExtra = () => {
    if (!extraAmount || !extraDate)
      return message.error("تمام فیلدها الزامی است");

    const { hso, hsa, fmo } = selectedPerson;
    const totalMaKhaz = hso + hsa + fmo;
    const hours = Number((totalMaKhaz / 176).toFixed(2)); // تعداد ساعت با دو رقم اعشار

    setExtraList((prev) => [
      ...prev,
      {
        ...selectedPerson,
        extraAmount: Number(extraAmount),
        date: new Date().toLocaleString("fa-IR"),
        extraDate,
        hours,
      },
    ]);

    setModalVisible(false);
    setExtraAmount("");
    setExtraDate("");
  };

  const handleOpenModal = (person: any) => {
    setSelectedPerson(person);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setExtraList((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = extraList.reduce((sum, p) => sum + p.extraAmount, 0);
  const getColumns = () => {
    const actionsEnabled = {
      canAdd: can("pre_payment", "create"),
    };

    const baseColumns: any[] = [
      { title: "نام", dataIndex: "name" },
      { title: "کد ماخذ HSO", dataIndex: "hso" },
      { title: "کد ماخذ HSA", dataIndex: "hsa" },
      { title: "کد ماخذ FMO", dataIndex: "fmo" },
    ];

    const actionColumn = {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          {actionsEnabled.canAdd && (
            <Button
              onClick={() => handleOpenModal(record)}
              className="bg-error-light text-white"
            >
              ثبت اضافه کار{" "}
            </Button>
          )}
        </Space>
      ),
    };

    if (actionsEnabled.canAdd) {
      baseColumns.push(actionColumn);
    }

    return baseColumns;
  };
  // const columns: ColumnsType<any> = [
  //   { title: "نام", dataIndex: "name" },
  //   { title: "کد ماخذ HSO", dataIndex: "hso" },
  //   { title: "کد ماخذ HSA", dataIndex: "hsa" },
  //   { title: "کد ماخذ FMO", dataIndex: "fmo" },
  //   {
  //     title: "ثبت اضافه کار",
  //     render: (_, record) => (
  //       <Button onClick={() => handleOpenModal(record)}>ثبت اضافه کار</Button>
  //     ),
  //   },
  // ];

  const addedColumns: ColumnsType<any> = [
    { title: "نام", dataIndex: "name" },
    { title: "مبلغ اضافه کار", dataIndex: "extraAmount" },
    { title: "زمان ثبت", dataIndex: "date" },
    { title: "HSO", dataIndex: "hso" },
    { title: "HSA", dataIndex: "hsa" },
    { title: "FMO", dataIndex: "fmo" },
    {
      title: "عملیات",
      render: (_, record) => (
        <Button onClick={() => handleDelete(record.id)}>حذف</Button>
      ),
    },
  ];

  return (
    <Card className="p-6 space-y-4">
      <CardHeader
        className={
          "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full "
        }
      >
        <h2 className="text-xl font-bold">ثبت اضافه کار</h2>
        <div className="flex gap-3">
          {can("pre_payment", "getAll") && (
            <Select
              placeholder="انتخاب یگان"
              value={selectedUnit || undefined}
              onChange={(val) => setSelectedUnit(val)}
              style={{ width: 200 }}
              options={[
                { value: "unit1", label: "یگان ۱" },
                { value: "unit2", label: "یگان ۲" },
              ]}
            />
          )}
          {can("pre_payment", "search") && (
            <Input
              placeholder="جستجوی نام"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 200 }}
            />
          )}
        </div>
        {/* <Button onClick={handleSearch}>جستجو</Button> */}
      </CardHeader>

      <Table
        dataSource={[]}
        rowKey="id"
        columns={getColumns()}
        pagination={false}
      />

      <Modal
        title="ثبت اطلاعات اضافه کار"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleAddExtra}
        okText="ثبت"
        cancelText="انصراف"
      >
        <p>نام پرسنل: {selectedPerson?.name}</p>
        <p>HSO: {selectedPerson?.hso} تومان</p>
        <p>HSA: {selectedPerson?.hsa} تومان</p>
        <p>FMO: {selectedPerson?.fmo} تومان</p>
        <p>
          مجموع ماخذ:{" "}
          {selectedPerson
            ? selectedPerson.hso + selectedPerson.hsa + selectedPerson.fmo
            : 0}{" "}
          تومان
        </p>
        <p>
          تعداد ساعت:{" "}
          {selectedPerson
            ? (
                (selectedPerson.hso + selectedPerson.hsa + selectedPerson.fmo) /
                176
              ).toFixed(2)
            : "0"}
        </p>

        <Input
          className="mt-2"
          placeholder="مبلغ اضافه کار"
          value={extraAmount}
          onChange={(e) => setExtraAmount(e.target.value)}
          type="number"
        />

        <Input
          className="mt-2"
          placeholder="تاریخ اضافه کار (مثلاً 1403/05/15)"
          value={extraDate}
          onChange={(e) => setExtraDate(e.target.value)}
        />
      </Modal>

      {extraList.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">لیست اضافه‌کار ثبت شده</h3>
          <Table
            dataSource={extraList}
            rowKey="id"
            columns={addedColumns}
            pagination={false}
            footer={() => (
              <div className="text-right font-bold">
                مجموع کل مبلغ: {totalAmount.toLocaleString()} تومان
              </div>
            )}
          />
        </div>
      )}
    </Card>
  );
}
