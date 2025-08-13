import { CreditRow, TakhsisItem } from "@/types/entity";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

interface PropType {
  selectedRecord: CreditRow;
  takhsis: TakhsisItem;
}

const mockUnits = [
  { label: "یگان الف", value: "unit-a" },
  { label: "یگان ب", value: "unit-b" },
  { label: "یگان ج", value: "unit-c" },
];

export default function ShowDataRecordeedSelected({
  selectedRecord,
  takhsis,
}: PropType) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [takhsisList, setTakhsisList] = useState<Record<string, TakhsisItem[]>>(
    {}
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleModalOk = () => {
    setSelectedRowId(selectedRecord.id);
    form.validateFields().then((values) => {
      const newItem: TakhsisItem = {
        id: editingId || Date.now().toString(),
        amount_takhsis: values.amount_takhsis,
        sharh_takhsis: values.sharh_takhsis,
        add_credit_id: values.add_credit_id,
        date_takhsis: selectedDate,
        yegan_id: 1,
      };

      setTakhsisList((prev) => {
        const currentList = selectedRecord ? prev[selectedRecord.id] : [];
        const updatedList = editingId
          ? currentList.map((item) => (item.id === editingId ? newItem : item))
          : currentList?.length > 0
          ? [...currentList, newItem]
          : [newItem];
        return { ...prev, [selectedRecord.id]: updatedList };
      });

      setModalOpen(false);
      form.resetFields();
      setSelectedDate("");
      setEditingId(null);
    });
  };

  //   const deleteTakhsis = (id: string) => {
  //     if (!selectedRecord) return;
  //     const current = takhsisList[selectedRecord.id] || [];
  //     setTakhsisList((prev) => ({
  //       ...prev,
  //       [selectedRecord.id]: current.filter((item) => item.id !== id),
  //     }));
  //   };

  const editTakhsis = (item: TakhsisItem) => {
    setModalOpen(true);
    setEditingId(item.id ? item.id : null);
    setSelectedDate(item.date_takhsis ? item.date_takhsis : "");
    form.setFieldsValue({
      id: editingId || Date.now().toString(),
      amount_takhsis: item.amount_takhsis,
      sharh_takhsis: item.sharh_takhsis,
      add_credit_id: item.add_credit_id,
      date_takhsis: selectedDate,
      yegan_id: 1,
    });
  };

  const selectedTakhsis = selectedRowId ? takhsisList[selectedRowId] || [] : [];

  const remainingCredit = 0;

  return (
    <>
      <CardContent>
        {selectedRecord && (
          <div className="mt-6 space-y-6">
            <Card className="bg-background shadow-sm">
              <CardHeader>
                <div className="text-lg font-semibold">
                  اطلاعات ردیف انتخاب‌شده
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <span className="font-medium">شماره برگ: </span>
                    {selectedRecord.radif}
                  </div>
                  <div>
                    <span className="font-medium">نوع حساب: </span>
                    {selectedRecord.madeh}
                  </div>
                  <div>
                    <span className="font-medium">نوع اعتبار: </span>
                    {selectedRecord.sharh_takhsis}
                  </div>
                  <div>
                    <span className="font-medium">کل اعتبار: </span>
                    {takhsis.amount_takhsis} ریال
                  </div>
                  <div>
                    <span className="font-medium">باقی‌مانده اعتبار: </span>
                    {remainingCredit.toLocaleString("fa-IR")} ریال
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-lg font-semibold">
                  لیست تخصیص‌های ثبت‌شده
                </div>
              </CardHeader>
              <CardContent>
                <Table<TakhsisItem>
                  rowKey="id"
                  columns={[
                    {
                      title: "مبلغ",
                      dataIndex: "amount",
                      render: (v) => v.toLocaleString("fa-IR"),
                    },
                    {
                      title: "شرح",
                      dataIndex: "description",
                    },
                    {
                      title: "یگان",
                      dataIndex: "unit",
                    },
                    {
                      title: "تاریخ",
                      dataIndex: "date",
                    },
                    {
                      title: "عملیات",
                      render: (_, item) => (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => editTakhsis(item)}
                          >
                            ویرایش
                          </Button>
                          <Popconfirm
                            title="آیا از حذف مطمئن هستید؟"
                            onConfirm={() =>
                              // deleteTakhsis(
                              //   item.id ? item!.id.toString() : null
                              // )
                              {}
                            }
                            okText="بله"
                            cancelText="خیر"
                          >
                            <Button variant="destructive">حذف</Button>
                          </Popconfirm>
                        </div>
                      ),
                    },
                  ]}
                  dataSource={selectedTakhsis}
                  pagination={false}
                  size="small"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>

      <Modal
        open={modalOpen}
        title="تخصیص اعتبار"
        onOk={handleModalOk}
        onCancel={() => {
          setModalOpen(false);
          setEditingId(null);
          form.resetFields();
          setSelectedDate("");
        }}
        okText="ثبت"
        cancelText="انصراف"
        width={600}
        style={{ direction: "rtl" }}
      >
        <Form form={form} layout="vertical" className="w-full">
          <Form.Item
            name="amount_takhsis"
            label="مبلغ تخصیص داده شده"
            rules={[{ required: true, message: "مبلغ را وارد کنید" }]}
          >
            <InputNumber
              className="w-full"
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="sharh_takhsis"
            label="شرح تخصیص"
            rules={[{ required: true, message: "شرح را وارد کنید" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="unit"
            label="یگان تخصیص یافته"
            rules={[{ required: true, message: "یگان را انتخاب کنید" }]}
          >
            <Select
              options={mockUnits}
              placeholder="یگان را انتخاب کنید"
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="date_takhsis"
            label="تاریخ تخصیص"
            rules={[{ required: true, message: "تاریخ را وارد کنید" }]}
          >
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={selectedDate}
              onChange={(date) =>
                setSelectedDate(date?.format("YYYY/MM/DD") || "")
              }
              inputClass="w-full rounded border px-3 py-2"
              calendarPosition="bottom-right"
              format="YYYY/MM/DD"
              className="w-full"
              placeholder="تاریخ را انتخاب کنید"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
