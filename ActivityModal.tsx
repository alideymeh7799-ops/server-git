import { Modal, Form, Input } from "antd";
import type { Activity } from "./index";
import { useEffect } from "react";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: Activity) => void;
  initialData: Activity;
}

export default function ActivityModal({
  visible,
  onCancel,
  onSubmit,
  initialData,
}: Props) {
  const [form] = Form.useForm<Activity>();

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({ ...initialData, ...values });
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={initialData.id ? "ویرایش فعالیت" : "افزودن فعالیت"}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="تأیید"
      cancelText="انصراف"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="نام فعالیت"
          name="name"
          rules={[{ required: true, message: "وارد کردن نام الزامی است" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="کد فعالیت"
          name="code"
          rules={[{ required: true, message: "کد فعالیت الزامی است" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="توضیحات" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
