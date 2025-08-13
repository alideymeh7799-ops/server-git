import { Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";

import { PersonalType } from "@/types/entity";
import { rankOptions, unitCodeOptions } from "./data";

type ModalProps = {
  formValue: PersonalType;
  show: boolean;
  onOk: (values: PersonalType, type: "add" | "edit") => void;
  onCancel: VoidFunction;
  title: string;
};

export default function UserFormModal({
  show,
  title,
  formValue,
  onOk,
  onCancel,
}: ModalProps) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (formValue) {
      form.setFieldsValue({
        ...formValue,
      });
    } else {
      form.resetFields();
    }
  }, [formValue]);

  const onSubmit = (values: PersonalType) => {
    onOk(values, formValue?.id ? "edit" : "add");
  };

  return (
    <Modal
      title={title}
      open={show}
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText={formValue?.id ? "ذخیره تغییرات" : "افزودن"}
      cancelText="لغو"
      okButtonProps={{ htmlType: "submit" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onSubmit(values);
        }}
      >
        <Row gutter={16}>
          <Col span={12} className="flex flex-col gap-1">
            <Form.Item
              name="personnel_number"
              label="شماره پرسنلی"
              rules={[{ required: true, message: "شماره پرسنلی را وارد کنید" }]}
            >
              <Input className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="نام"
              rules={[{ required: true, message: "نام را وارد کنید" }]}
              className="flex flex-col gap-1"
            >
              <Input className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="family"
              label="نام خانوادگی"
              rules={[{ required: true, message: "نام خانوادگی را وارد کنید" }]}
              className="flex flex-col gap-1"
            >
              <Input className="w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="unitCode"
              label="کد یگان"
              rules={[{ required: true, message: "کد یگان را انتخاب کنید" }]}
              className="flex flex-col gap-1"
            >
              <Select options={unitCodeOptions} placeholder="انتخاب کد یگان" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rank"
              label="درجه"
              rules={[{ required: true, message: "درجه را انتخاب کنید" }]}
              className="flex flex-col gap-1"
            >
              <Select options={rankOptions} placeholder="انتخاب درجه" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="id_number"
              label="شماره ملی"
              rules={[
                { required: true, message: "شماره ملی را وارد کنید" },
                {
                  pattern: /^\d{10}$/,
                  message: "شماره ملی باید ۱۰ رقم عدد باشد",
                },
              ]}
              className="flex flex-col gap-1"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="accountNumber"
              label="شماره حساب"
              rules={[
                { required: true, message: "شماره حساب را وارد کنید" },
                {
                  pattern: /^\d+$/,
                  message: "شماره حساب فقط باید شامل اعداد باشد",
                },
              ]}
              className="flex flex-col gap-1"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="bankCode"
              label="کد بانک"
              rules={[{ required: true, message: "کد بانک را وارد کنید" }]}
              className="flex flex-col gap-1"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="hsaSource"
              label="ماخذ HSA"
              rules={[{ required: true, message: "ماخذ HSA را وارد کنید" }]}
              className="flex flex-col gap-1"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="fmoSource"
              label="ماخذ FMO"
              rules={[{ required: true, message: "ماخذ FMO را وارد کنید" }]}
              className="flex flex-col gap-1"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="hsoSource"
              label="ماخذ HSO"
              rules={[{ required: true, message: "ماخذ HSO را وارد کنید" }]}
              className="flex flex-col gap-1"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
