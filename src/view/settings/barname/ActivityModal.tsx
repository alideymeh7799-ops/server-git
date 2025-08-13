import { FaaliatTypeData } from "@/types/entity";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, Input } from "antd";
import { useEffect } from "react";

interface Props {
  formValue: FaaliatTypeData;
  title: string;
  show: boolean;
  onOk: (values: FaaliatTypeData, type: "add" | "edit") => void;
  onCancel: VoidFunction;
}

export default function ActivityModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: Props) {
  const [form] = Form.useForm<FaaliatTypeData>();

  useEffect(() => {
    form.setFieldsValue(formValue);
  }, [formValue, form]);

  const handleFinish = (values: FaaliatTypeData) => {
    onOk(values, formValue.id ? "edit" : "add");
  };

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={formValue}
        >
          <Form.Item
            label="نام"
            name="description"
            rules={[
              { required: true, message: "وارد کردن نام الزامی است" },
              { min: 3, message: "نام باید حداقل ۳ کاراکتر باشد" },
              { max: 200, message: "نام باید حداکثر ۲۰۰ کاراکتر باشد" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="کد برنامه"
            name="code"
            rules={[
              { required: true, message: "کد برنامه الزامی است" },
              { pattern: /^[0-9]+$/, message: "کد باید فقط شامل عدد باشد" },
              { min: 1, message: "کد باید حداقل ۱ رقم باشد" },
              { max: 10, message: "کد باید حداکثر ۱۰ رقم باشد" },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          {/* دکمه‌ها با غیرفعال شدن خودکار */}
          <Form.Item shouldUpdate>
            {() => {
              const hasErrors = form
                .getFieldsError()
                .some(({ errors }) => errors.length > 0);
              const touched = form.isFieldsTouched(true);

              return (
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    className="px-5 py-2 rounded-md ml-2 border-gray-300 text-white bg-error/50 hover:bg-error"
                    onClick={onCancel}
                  >
                    انصراف
                  </Button>
                  <Button
                    type="submit"
                    disabled={!touched || hasErrors}
                    className={`px-5 py-2 rounded-md text-white ${
                      !touched || hasErrors
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-success/70 hover:bg-success"
                    }`}
                  >
                    {formValue.id ? "ویرایش" : "افزودن"}
                  </Button>
                </div>
              );
            }}
          </Form.Item>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
