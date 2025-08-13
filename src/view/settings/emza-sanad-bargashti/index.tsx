import SignersPage from "@/view/common/emza";

const fields = [
  { label: "از نامه‌های ارسالی", name: "fromLetter" },
  { label: "به نامه‌های ارسالی", name: "toLetter" },
  { label: "عنوان نامه‌های ارسالی", name: "letterTitle" },
  { label: "نام رئیس نامه‌های ارسالی", name: "letterChiefName" },
  { label: "اقدام‌کننده نامه‌های ارسالی", name: "letterActionPerson" },
  { label: "رئیس اعتبارات نامه‌های ارسالی", name: "letterCreditChief" },
  { label: "تلفن", name: "phone" },
];

export default function SignersLetters() {
  return (
    <SignersPage
      title="فرم ثبت مشخصات امضاکنندگان نامه‌ها و گزارشات"
      fields={fields}
      type="emza_sanad_barghashtis"
    />
  );
}
