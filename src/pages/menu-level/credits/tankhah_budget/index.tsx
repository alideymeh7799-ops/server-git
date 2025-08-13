import type { CreditEntry } from "#/entity";
import { Card, CardContent } from "@/ui/card";
import { useState } from "react";
import AccountSelectModal, { Account } from "./AccountSelectModal";
import FinancialInfo from "./financial-info";
import Header from "./header";
import MainTable from "./main-table";
import PaymentForm from "./payment-form";
import TankhahTable from "./tankhah-table";
// complete
// Mock data
const dataByUnit: Record<string, CreditEntry[]> = {
  "یگان ۱": [
    {
      radif: "1",
      program: "برنامه ۱",
      faliat: "فعالیت ۱",
      madeh: "ماده ۱",
      sharh_hazineh: "هزینه ۱",
      sharhe_program: "شرح برنامه ۱",
      sharh_faliat: "شرح فعالیت ۱",
      noeEtebar: "نوع اعتبار ۱",
      payment_description: "",
    },
    {
      radif: "2",
      payment_description: "",
      program: "برنامه ۲",
      faliat: "فعالیت ۲",
      madeh: "ماده ۲",
      sharh_hazineh: "هزینه ۲",
      sharhe_program: "شرح برنامه ۲",
      sharh_faliat: "شرح فعالیت ۲",
      noeEtebar: "نوع اعتبار ۲",
    },
  ],
  "یگان ۲": [
    {
      radif: "1",
      payment_description: "",
      program: "برنامه A",
      faliat: "فعالیت A",
      madeh: "ماده A",
      sharh_hazineh: "هزینه A",
      sharhe_program: "شرح برنامه A",
      sharh_faliat: "شرح فعالیت A",
      noeEtebar: "نوع اعتبار A",
    },
  ],
  "یگان ۳": [],
};

export default function TankhahPage() {
  const [selectedUnit, setSelectedUnit] = useState<string>();
  const [dataSource, setDataSource] = useState<CreditEntry[]>([]);
  const [remainingBudget, setRemainingBudget] = useState<number | null>(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [paymentFormOpen, setPaymentFormOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<CreditEntry | null>(null);
  const [accountSelectCallback, setAccountSelectCallback] = useState<
    ((account: Account) => void) | null
  >(null);

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    setDataSource(dataByUnit[value] || []);
    setRemainingBudget(Math.floor(Math.random() * 10000000));
    setSelectedRow(null);
  };

  const handleFormSubmit = (data: {
    paymentType: string | undefined;
    purchaseAgent: string | undefined;
    paymentAmount: number | undefined;
    repeatCount: number | undefined;
    description: string;
    paymentDate: any;
    returnNotice: string;
    accountNumber: string;
    accountOwner: string;
  }) => {
    console.log("فرم ثبت شد:", data);
    // Add logic to handle the submitted form data, e.g., API call or state update
  };

  const handleAccountModalOpen = (
    onSelect: (account: { accountNumber: string; accountOwner: string }) => void
  ) => {
    setAccountSelectCallback(() => onSelect);
    setAccountModalOpen(true);
  };

  const handleAccountSelect = (account: Account) => {
    if (accountSelectCallback) {
      accountSelectCallback(account);
    }
    setAccountModalOpen(false);
    setAccountSelectCallback(null);
  };

  return (
    <Card>
      <Header selectedUnit={selectedUnit} onUnitChange={handleUnitChange} />
      <CardContent>
        {selectedUnit && remainingBudget !== null && (
          <>
            {/* <FinancialInfo
              selectedUnit={selectedUnit}
              remainingBudget={remainingBudget}
              sendDataForm={paymentFormOpen}
              onToggleForm={() => setPaymentFormOpen(!paymentFormOpen)}
            /> */}
            <FinancialInfo
              selectedUnit={selectedUnit}
              remainingBudget={remainingBudget}
              onToggleForm={() => setPaymentFormOpen(!paymentFormOpen)}
            />

            <PaymentForm
              open={paymentFormOpen}
              onClose={() => setPaymentFormOpen(false)}
              onSubmit={handleFormSubmit}
              onAccountModalOpen={handleAccountModalOpen}
            />
            <MainTable
              dataSource={dataSource}
              selectedRow={selectedRow}
              onRowSelect={setSelectedRow}
            />
            {selectedRow && (
              <div className="mt-8 space-y-8">
                <TankhahTable selectedRow={selectedRow} />
                {/* <CashTable selectedRow={selectedRow} /> */}
              </div>
            )}
          </>
        )}
      </CardContent>
      <AccountSelectModal
        open={accountModalOpen}
        onClose={() => {
          setAccountModalOpen(false);
          setAccountSelectCallback(null);
        }}
        onSelect={handleAccountSelect}
      />
    </Card>
  );
}
