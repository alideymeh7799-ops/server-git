import SignersPage from "../../common/emza";

const fields = [
  { label: "انتخاب نیروی خدمتی", name: "serviceForce" },
  { label: "از تخصیص", name: "fromAllocation" },
  { label: "نام یگان عمده", name: "majorUnitName" },
  { label: "درجه ف یگان عمده", name: "majorUnitRank" },
  { label: "نام ف یگان عمده", name: "majorUnitCommanderName" },
  { label: "نام کنت", name: "kontName" },
  { label: "درجه رئیس کنت", name: "kontRank" },
  { label: "نام رئیس کنت", name: "kontCommanderName" },
  { label: "نام اعتبارات", name: "creditName" },
  { label: "درجه رئیس اعتبارات", name: "creditCommanderRank" },
  { label: "گیرنده اعتبار یک", name: "creditReceiver1" },
  { label: "گیرنده اعتبار دوم", name: "creditReceiver2" },
  { label: "گیرنده اعتبار سوم", name: "creditReceiver3" },
  { label: "گیرنده اعتبار چهارم", name: "creditReceiver4" },
];

export default function SignersAllocationPage() {
  return (
    <SignersPage
      title="فرم ثبت مشخصات امضا کنندگان تخصیص"
      fields={fields}
      type="emza_yegans"
    />
  );
}
