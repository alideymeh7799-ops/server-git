import type { typeDataPersonal } from "#/entity";
import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

interface RewardModalProps {
  user: typeDataPersonal;
  show: boolean;
  onOk: (data: { amount: number; date: string; docNumber: string }) => void;
  onCancel: () => void;
  defaultValues?: {
    amount: number;
    date: string;
    docNumber: string;
  };
}

export default function RewardModal({
  user,
  show,
  onOk,
  onCancel,
  defaultValues,
}: RewardModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues);
    } else {
      form.resetFields();
    }
  }, [defaultValues, form]);

  return (
    <Modal
      title="ثبت پاداش"
      open={show}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
      okText="ثبت"
      cancelText="انصراف"
    >
      <div className="mb-4 space-y-1">
        <div>نام: {user.firstName}</div>
        <div>نام خانوادگی: {user.family}</div>
        <div>کد ملی: {user.nationalId}</div>
      </div>

      <Form form={form} layout="vertical" onFinish={onOk}>
        <Form.Item
          label="مبلغ پاداش"
          name="amount"
          rules={[{ required: true, message: "مقدار را وارد کنید" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="تاریخ تنظیم"
          name="date"
          rules={[{ required: true, message: "تاریخ را وارد کنید" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="شماره سند"
          name="docNumber"
          rules={[{ required: true, message: "شماره سند را وارد کنید" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
