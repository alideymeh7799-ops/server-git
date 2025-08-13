import { Button } from "@/ui/button";
import { Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

const paymentTypes = [
  { label: "تنخواه‌گردان", value: "tankhah" },
  { label: "نقدی پرداخت", value: "cash" },
];

const purchaseAgents = [
  { label: "عامل ۱", value: "agent1" },
  { label: "عامل ۲", value: "agent2" },
  { label: "عامل ۳", value: "agent3" },
];

interface FormData {
  paymentType: string | undefined;
  purchaseAgent: string | undefined;
  paymentAmount: number | undefined;
  repeatCount: number | undefined;
  description: string;
  paymentDate: any;
  returnNotice: string;
  accountNumber: string;
  accountOwner: string;
}

interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  onAccountModalOpen: (
    onSelect: (account: { accountNumber: string; accountOwner: string }) => void
  ) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  open,
  onClose,
  onSubmit,
  onAccountModalOpen,
}) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState<
    string | undefined
  >();
  const [selectedPurchaseAgent, setSelectedPurchaseAgent] = useState<
    string | undefined
  >();
  const [paymentAmount, setPaymentAmount] = useState<number | undefined>();
  const [repeatCount, setRepeatCount] = useState<number | undefined>();
  const [description, setDescription] = useState<string>("");
  const [paymentDate, setPaymentDate] = useState<any>();
  const [returnNotice, setReturnNotice] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountOwner, setAccountOwner] = useState<string>("");

  const handleAccountSelect = (account: {
    accountNumber: string;
    accountOwner: string;
  }) => {
    setAccountNumber(account.accountNumber);
    setAccountOwner(account.accountOwner);
  };

  const handleSubmit = () => {
    const formData: FormData = {
      paymentType: selectedPaymentType,
      purchaseAgent: selectedPurchaseAgent,
      paymentAmount,
      repeatCount,
      description,
      paymentDate,
      returnNotice,
      accountNumber,
      accountOwner,
    };
    onSubmit(formData);
    onClose();
    // Reset form after submission
    setSelectedPaymentType(undefined);
    setSelectedPurchaseAgent(undefined);
    setPaymentAmount(undefined);
    setRepeatCount(undefined);
    setDescription("");
    setPaymentDate(undefined);
    setReturnNotice("");
    setAccountNumber("");
    setAccountOwner("");
  };

  const handleCancel = () => {
    onClose();
    // Reset form on cancel
    setSelectedPaymentType(undefined);
    setSelectedPurchaseAgent(undefined);
    setPaymentAmount(undefined);
    setRepeatCount(undefined);
    setDescription("");
    setPaymentDate(undefined);
    setReturnNotice("");
    setAccountNumber("");
    setAccountOwner("");
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      centered
      title={
        <div className="text-2xl font-bold text-center text-balance">
          ثبت تنخواه جدید
        </div>
      }
      className="rounded-lg"
    >
      <Form layout="vertical" className="grid grid-cols-12 gap-4">
        <Form.Item
          label={
            <span className="font-semibold text-balance/90">نوع پرداخت</span>
          }
          className="col-span-12 md:col-span-6"
        >
          <Select
            className="w-full"
            placeholder="نوع پرداخت"
            value={selectedPaymentType}
            onChange={setSelectedPaymentType}
            popupClassName="rounded-md"
          >
            {paymentTypes.map(({ label, value }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <span className="font-semibold text-balance/90">عامل خرید</span>
          }
          className="col-span-12 md:col-span-6"
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => {
              const children = option?.children;
              const text =
                typeof children === "string"
                  ? children
                  : Array.isArray(children)
                  ? children.join("")
                  : String(children);
              return text.toLowerCase().includes(input.toLowerCase());
            }}
            className="w-full"
            placeholder="عامل خرید"
            value={selectedPurchaseAgent}
            onChange={setSelectedPurchaseAgent}
            popupClassName="rounded-md"
          >
            {purchaseAgents.map(({ label, value }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <span className="font-semibold text-balance/90">مبلغ پرداختی</span>
          }
          className="col-span-12 md:col-span-6"
        >
          <Input
            className="w-full rounded-md border-gray-300 focus:border-blue-500"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e.target.value))}
            placeholder="مبلغ پرداختی را وارد کنید"
            type="number"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-semibold text-balance/90">تعداد تکرار</span>
          }
          className="col-span-12 md:col-span-6"
        >
          <Input
            className="w-full rounded-md border-gray-300 focus:border-blue-500"
            value={repeatCount}
            onChange={(e) => setRepeatCount(Number(e.target.value))}
            placeholder="تعداد دفعات را وارد کنید"
            type="number"
          />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold text-balance/90">شرح سند</span>}
          className="col-span-12"
        >
          <Input
            className="w-full rounded-md border-gray-300 focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="مثلاً بابت خرید اقلام مصرفی"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-semibold text-balance/90">تاریخ پرداخت</span>
          }
          className="col-span-12 md:col-span-6"
        >
          <DatePicker
            value={paymentDate}
            onChange={setPaymentDate}
            calendar={persian}
            style={{ width: "100%", borderRadius: "6px" }}
            locale={persian_fa}
            inputClass="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-blue-500"
            placeholder="انتخاب تاریخ"
          />
        </Form.Item>
        {/* <Form.Item
          label={
            <span className="font-semibold text-balance/90">
              اعلامیه برگشتی
            </span>
          }
          className="col-span-12 md:col-span-6"
        >
          <Input
            className="w-full rounded-md border-gray-300 focus:border-blue-500"
            value={returnNotice}
            onChange={(e) => setReturnNotice(e.target.value)}
            placeholder="در صورت وجود"
          />
        </Form.Item> */}
        {selectedPaymentType === "cash" && (
          <Form.Item
            label={
              <span className="font-semibold text-balance/90">
                شماره حساب کاربر
              </span>
            }
            className="col-span-12"
          >
            <Button
              variant="outline"
              className="w-full justify-start rounded-md border-gray-300 hover:border-blue-500 text-balance/90 hover:text-blue-500"
              onClick={() => onAccountModalOpen(handleAccountSelect)}
            >
              {accountNumber ? (
                <div className="text-left w-full flex items-center justify-between">
                  <div className="font-semibold text-sm">
                    شماره حساب:{" "}
                    <span className="text-blue-500">{accountNumber}</span>
                  </div>
                  <div className="font-semibold text-sm">
                    نام و نشان:{" "}
                    <span className="text-blue-500">{accountOwner}</span>
                  </div>
                </div>
              ) : (
                "انتخاب شماره حساب"
              )}
            </Button>
          </Form.Item>
        )}
        <Form.Item className="col-span-12 flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            className="px-6 py-2 rounded-md border-gray-300 text-balance/90 hover:bg-gray-100"
            onClick={handleCancel}
          >
            انصراف
          </Button>
          <Button
            className="px-6 py-2 rounded-md bg-primary  text-white"
            onClick={handleSubmit}
          >
            ثبت
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PaymentForm;
