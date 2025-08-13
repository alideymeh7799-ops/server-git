import SignersPage from "../../common/emza";

const fields = [
  { label: "رئیس حسابداری یگان", name: "unitAccountingChief" },
  { label: "درجه حسابداری یگان", name: "unitAccountingRank" },
  { label: "نام و نشان حسابداری یگان", name: "unitAccountingFullName" },
  { label: "رئیس سرویس یگان", name: "unitServiceChief" },
  { label: "درجه رئیس سرویس یگان", name: "unitServiceRank" },
  { label: "نام و نشات رئیس سرویس یگان", name: "unitServiceFullName" },
  { label: "فرمانده یگان عمده", name: "majorUnitCommander" },
  { label: "نام و نشان فرمانده یگان عمده", name: "majorUnitCommanderFullName" },
  { label: "رئیس کنت امور مالی", name: "financeKontChief" },
  { label: "درجه رئیس ممیزی", name: "auditChiefRank" },
  { label: "نام رئیس ممیزی", name: "auditChiefName" },
  { label: "درجه رئیس صندوق", name: "fundChiefRank" },
  { label: "نام رئیس صندوق", name: "fundChiefName" },
  { label: "درجه رئیس حسابداری دارایی", name: "assetAccountingRank" },
  { label: "نام رئیس حسابداری دارایی", name: "assetAccountingName" },
  { label: "نام دارایی", name: "assetName" },
  { label: "درجه رئیس دارایی", name: "assetChiefRank" },
  { label: "نام رئیس دارایی", name: "assetChiefName" },
];

export default function SignersCashFundPage() {
  return (
    <SignersPage
      title="فرم مشخصات امضا کنندگان تنخواه"
      fields={fields}
      type="emza_conts"
    />
  );
}
