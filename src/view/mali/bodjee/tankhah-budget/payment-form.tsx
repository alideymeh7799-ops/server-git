import {
  AmeleKharidTypeData,
  TakhsisItem,
  TankhahNaghdPardakhtTypeData,
  TankhahTypeData,
} from "@/types/entity";
import { Button } from "@/ui/button";
import { Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

type Props = {
  title: string;
  show: boolean;
  formValue: any;
  onOk: (data: TankhahTypeData, mode: "add" | "edit") => void;
  handleModalSubmitNaghdPardhakht: (
    data: TankhahNaghdPardakhtTypeData,
    mode: "add" | "edit"
  ) => void;
  onCancel: () => void;
  onAccountModalOpen: (
    cb: (account: { accountNumber: string; accountOwner: string }) => void
  ) => void;
  dataAmeleKharid: AmeleKharidTypeData[];
  selectedRow: TakhsisItem | null;
  allAmount: number;
};

const PaymentForm: React.FC<Props> = ({
  title,
  show,
  formValue,
  onOk,
  handleModalSubmitNaghdPardhakht,
  onCancel,
  onAccountModalOpen,
  dataAmeleKharid,
  selectedRow,
  allAmount,
}) => {
  const [form] = Form.useForm();

  const [selectedPaymentType, setSelectedPaymentType] = useState<string>(
    formValue?.paymentType || ""
  );
  const [selectedAmaeleKharid, setSelectedAmaeleKharid] = useState<
    number | undefined
  >(formValue?.amel_kharid_id ? Number(formValue.amel_kharid_id) : undefined);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountOwner, setAccountOwner] = useState<string>("");
  const [paymentDate, setPaymentDate] = useState<any>(
    formValue?.date_tankhah || null
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    form.setFieldsValue(formValue);
    setSelectedPaymentType(formValue?.paymentType || "");
    setSelectedAmaeleKharid(
      formValue?.amel_kharid_id ? Number(formValue.amel_kharid_id) : undefined
    );
    setPaymentDate(formValue?.date_tankhah || null);

    if (formValue?.accountNumber) setAccountNumber(formValue.accountNumber);
    if (formValue?.accountOwner) setAccountOwner(formValue.accountOwner);
  }, [formValue, form]);

  // اعتبارسنجی فرم برای فعال/غیرفعال کردن دکمه ارسال
  useEffect(() => {
    const checkFormValid = async () => {
      try {
        if (selectedPaymentType === "tankhah") {
          // برای تنخواه باید amel_kharid_id و paymentDate و amount و description باشند
          await form.validateFields([
            "paymentType",
            "amel_kharid_id",
            "amount",
            "description",
          ]);
          if (!paymentDate) throw new Error("تاریخ پرداخت باید انتخاب شود");
        } else if (selectedPaymentType === "cash") {
          // برای نقد پرداخت باید amount و description و paymentDate باشند
          await form.validateFields(["paymentType", "amount", "description"]);
          if (!paymentDate) throw new Error("تاریخ پرداخت باید انتخاب شود");
        } else {
          throw new Error("نوع پرداخت باید انتخاب شود");
        }
        setIsSubmitDisabled(false);
      } catch {
        setIsSubmitDisabled(true);
      }
    };

    checkFormValid();
  }, [form, selectedPaymentType, selectedAmaeleKharid, paymentDate]);

  const handleAccountSelect = (account: {
    accountNumber: string;
    accountOwner: string;
  }) => {
    setAccountNumber(account.accountNumber);
    setAccountOwner(account.accountOwner);
  };

  const handleSubmit = (values: any) => {
    const mode = formValue?.id ? "edit" : "add";

    if (selectedPaymentType === "cash") {
      const payload: TankhahNaghdPardakhtTypeData = {
        amount: values.amount,
        description: values.description,
        date_pardakht: paymentDate,
        peymankar_id: 4,
      };
      handleModalSubmitNaghdPardhakht(payload, mode);
    } else {
      const payload: TankhahTypeData = {
        ...values,
        amel_kharid_id: selectedAmaeleKharid,
        date_tankhah: paymentDate,
      };
      onOk(payload, mode);
    }
  };

  return (
    <Modal
      title={title}
      open={show}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      {selectedRow?.amount_takhsis && (
        <div className="w-full p-4 bg-gradient-to-r mb-2 from-primary/60 to-primary/90 text-foreground rounded-lg shadow-lg flex justify-between items-center space-x-6 rtl:flex-row-reverse">
          <div className="flex flex-col items-center">
            <span className="text-sm opacity-75">مبلغ برگ اعتبار</span>
            <span className="text-lg ">
              {selectedRow.amount_takhsis.toLocaleString() + "  "}
              ريال
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm opacity-75">باقیمانده</span>
            <span className="text-lg ">
              {(selectedRow.amount_takhsis - allAmount).toLocaleString() + "  "}
              ريال
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm opacity-75">تنخواه ثبت شده</span>
            <span className="text-lg ">
              {allAmount.toLocaleString() + "  "}
              ريال
            </span>
          </div>
        </div>
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={formValue}
        className="grid grid-cols-12 gap-4"
      >
        <Form.Item
          name="paymentType"
          label="نوع پرداخت"
          className="col-span-12 md:col-span-6"
          rules={[{ required: true, message: "نوع پرداخت را انتخاب کنید" }]}
        >
          <Select
            placeholder="انتخاب کنید"
            onChange={(value) => setSelectedPaymentType(value)}
            value={selectedPaymentType}
          >
            <Select.Option value="tankhah">تنخواه</Select.Option>
            <Select.Option value="cash">نقد پرداخت</Select.Option>
          </Select>
        </Form.Item>

        {selectedPaymentType === "tankhah" && (
          <>
            <Form.Item
              name="amel_kharid_id"
              label="عامل خرید"
              className="col-span-12 md:col-span-6"
              rules={[{ required: true, message: "عامل خرید را انتخاب کنید" }]}
            >
              <Select
                placeholder="انتخاب کنید"
                onChange={(value) => setSelectedAmaeleKharid(value)}
                value={selectedAmaeleKharid}
              >
                {dataAmeleKharid.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.number_hesab} {item.onvan_hesab}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="amount"
              label="مبلغ پرداختی"
              className="col-span-12 md:col-span-6"
              rules={[{ required: true, message: "مبلغ را وارد کنید" }]}
            >
              <Input type="number" />
            </Form.Item>
            {/* <Form.Item
              name="amount"
              label="مبلغ پرداختی"
              className="col-span-12 md:col-span-6"
              rules={[
                { required: true, message: "مبلغ را وارد کنید" },
                () => ({
                  validator(_, value) {
                    if (value === undefined || value === null || value === "") {
                      return Promise.resolve(); // اجازه میدیم required خودش خطا بده
                    }
                    if (
                      selectedRow?.amount_takhsis &&
                      value <= selectedRow.amount_takhsis - allAmount
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        `مبلغ نباید بیشتر از ${
                          selectedRow?.amount_takhsis &&
                          selectedRow?.amount_takhsis - allAmount
                        } باشد.`
                      )
                    );
                  },
                }),
              ]}
            >
              <Input type="number" />
            </Form.Item> */}

            <Form.Item
              name="description"
              label="شرح سند"
              className="col-span-12"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="تاریخ پرداخت"
              className="col-span-12 md:col-span-6"
            >
              <DatePicker
                value={paymentDate}
                onChange={setPaymentDate}
                calendar={persian}
                locale={persian_fa}
                style={{ width: "100%", height: "50px" }}
              />
            </Form.Item>
          </>
        )}

        {selectedPaymentType === "cash" && (
          <>
            <Form.Item
              name="amount"
              label="مبلغ تخصیص"
              className="col-span-12 md:col-span-6"
              rules={[{ required: true, message: "مبلغ را وارد کنید" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="description"
              label="شرح تخصیص"
              className="col-span-12"
            >
              <Input />
            </Form.Item>

            <Form.Item label="شماره حساب کاربر" className="col-span-12">
              <Button
                className="w-full"
                onClick={() => onAccountModalOpen(handleAccountSelect)}
              >
                {accountNumber
                  ? `شماره: ${accountNumber} | مالک: ${accountOwner}`
                  : "انتخاب شماره حساب"}
              </Button>
            </Form.Item>

            <Form.Item
              label="تاریخ پرداخت"
              className="col-span-12 md:col-span-6"
            >
              <DatePicker
                value={paymentDate}
                onChange={setPaymentDate}
                calendar={persian}
                locale={persian_fa}
                style={{ width: "100%", height: "50px" }}
              />
            </Form.Item>
          </>
        )}

        <Form.Item className="col-span-12 flex justify-end gap-3">
          <Button
            className="px-5 py-2 rounded-md ml-2 border-gray-300 text-white bg-error/50 hover:bg-error"
            onClick={onCancel}
          >
            انصراف
          </Button>
          <Button
            type="submit"
            className="px-5 py-2 rounded-md text-white bg-success/70 hover:bg-success"
            disabled={isSubmitDisabled}
          >
            {formValue?.id ? "ویرایش" : "افزودن"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PaymentForm;
