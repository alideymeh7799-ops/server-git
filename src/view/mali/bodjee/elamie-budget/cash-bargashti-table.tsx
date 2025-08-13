import type { CreditEntry } from "#/entity";
import PrintData from "@/components/print-data";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useRef, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

const { Option } = Select;

const cashTableColumns = [
  { title: "ردیف", dataIndex: "radif", key: "radif" },
  { title: "مبلغ پرداختی", dataIndex: "amount", key: "amount" },
  { title: "نوع پرداخت", dataIndex: "type", key: "type" },
  { title: "شرح سند", dataIndex: "desc", key: "desc" },
  { title: "تاریخ سند", dataIndex: "date", key: "date" },
  { title: "شماره حساب", dataIndex: "account", key: "account" },
  { title: "نام و نشان", dataIndex: "owner", key: "owner" },
];

interface CashTableProps {
  selectedRow: CreditEntry | null;
}

const CashBargashtiTable: React.FC<CashTableProps> = ({ selectedRow }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // افزودن ردیف جدید به جدول
  const handleAdd = (values: any) => {
    // تبدیل تاریخ از شیء DatePicker به رشته فارسی
    const formattedDate =
      values.date && typeof values.date.format === "function"
        ? values.date.format("YYYY/MM/DD")
        : "";

    const newRow = {
      radif: values.radif,
      amount: Number(values.amount),
      type: values.type,
      desc: values.desc,
      date: formattedDate,
      account: values.account,
      owner: values.owner,
      key: Date.now(),
    };

    setData((prev) => [...prev, newRow]);
    setIsModalOpen(false);
    form.resetFields();
  };

  // محاسبه جمع مبلغ‌ها
  const totalAmount = data.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <div className="bg-muted/30 border rounded-xl shadow-sm p-4 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-base text-gray-700">
          لیست اسناد نقد پرداخت
        </h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          افزودن اعلامیه برگشتی
        </Button>
      </div>

      <PrintData
        dataExcel={{
          data,
          nameFile: `اسناد نقد پرداخت ${selectedRow?.program || ""}`,
          nameSheet: selectedRow?.program || "",
          columns: cashTableColumns,
        }}
        dataPrint={{
          idSelcted: tableRef.current,
          name: `اسناد نقد پرداخت ${selectedRow?.program || ""}`,
        }}
      />

      <div ref={tableRef} className="w-full">
        <Table
          rowKey={(record) => record.key}
          size="small"
          columns={cashTableColumns}
          dataSource={data}
          pagination={false}
          className="bg-white rounded-xl shadow-sm border [&_.ant-table-thead_th]:bg-gray-100 [&_.ant-table-cell]:text-right"
        />
        <div className="text-sm font-semibold text-right pt-2 border-t mt-2">
          جمع کل نقد پرداخت: {totalAmount.toLocaleString()} ریال
        </div>
      </div>

      <Modal
        title="افزودن اعلامیه برگشتی نقدی"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="افزودن"
        cancelText="انصراف"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAdd}
          scrollToFirstError
          initialValues={{ type: "نقدی" }}
        >
          <Form.Item
            name="radif"
            label="ردیف"
            rules={[
              { required: true, message: "لطفا ردیف را وارد کنید" },
              {
                pattern: /^[0-9]+$/,
                message: "ردیف باید فقط شامل اعداد باشد",
              },
            ]}
          >
            <Input placeholder="مثلا: 1" />
          </Form.Item>

          <Form.Item
            name="amount"
            label="مبلغ پرداختی"
            rules={[
              { required: true, message: "لطفا مبلغ پرداختی را وارد کنید" },
              {
                pattern: /^\d+$/,
                message: "مبلغ باید فقط عدد باشد",
              },
              {
                validator: (_, value) =>
                  value && Number(value) > 0
                    ? Promise.resolve()
                    : Promise.reject("مبلغ باید بزرگتر از صفر باشد"),
              },
            ]}
          >
            <Input type="number" placeholder="مثلا: 100000" />
          </Form.Item>

          <Form.Item
            name="type"
            label="نوع پرداخت"
            rules={[
              { required: true, message: "لطفا نوع پرداخت را انتخاب کنید" },
            ]}
          >
            <Select placeholder="انتخاب کنید">
              <Option value="نقدی">نقدی</Option>
              <Option value="کارت">کارت</Option>
              <Option value="سایر">سایر</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="desc"
            label="شرح سند"
            rules={[{ required: true, message: "لطفا شرح سند را وارد کنید" }]}
          >
            <Input.TextArea rows={2} placeholder="توضیحات" />
          </Form.Item>

          <Form.Item
            name="date"
            label="تاریخ سند"
            rules={[
              { required: true, message: "لطفا تاریخ سند را انتخاب کنید" },
            ]}
          >
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              className="w-full"
              placeholder="انتخاب تاریخ"
            />
          </Form.Item>

          <Form.Item
            name="account"
            label="شماره حساب"
            rules={[
              { required: true, message: "لطفا شماره حساب را وارد کنید" },
            ]}
          >
            <Input placeholder="شماره حساب را وارد کنید" />
          </Form.Item>

          <Form.Item
            name="owner"
            label="نام و نشان"
            rules={[
              { required: true, message: "لطفا نام و نشان را وارد کنید" },
            ]}
          >
            <Input placeholder="نام و نشان را وارد کنید" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CashBargashtiTable;
