import { CreditEntry } from "@/types/entity";
import { Card, CardContent } from "@/ui/card";
import { useCallback, useState } from "react";
import CashBargashtiTable from "./cash-bargashti-table";
import Header from "./header";
import MainTable from "./main-table";
import SaneBargashtiTable from "./sane-bargashti-table";

const dataByUnit: Record<string, CreditEntry[]> = {
  "یگان ۱": [
    {
      // id: "1",
      radif: "1",
      program: "برنامه ۱",
      faliat: "فعالیت ۱",
      madeh: "ماده ۱",
      sharh_hazineh: "هزینه ۱",
      sharhe_program: "شرح برنامه ۱",
      sharh_faliat: "شرح فعالیت ۱",
      noeEtebar: "نوع اعتبار ۱",
      payment_description: "s",
    },
    {
      // id: "2",
      radif: "2",
      program: "برنامه ۲",
      faliat: "فعالیت ۲",
      madeh: "ماده ۲",
      sharh_hazineh: "هزینه ۲",
      sharhe_program: "شرح برنامه ۲",
      sharh_faliat: "شرح فعالیت ۲",
      noeEtebar: "نوع اعتبار ۲",
      payment_description: "s",
    },
  ],
  "یگان ۲": [
    {
      // id: "3",
      radif: "1",
      program: "برنامه A",
      faliat: "فعالیت A",
      madeh: "ماده A",
      sharh_hazineh: "هزینه A",
      sharhe_program: "شرح برنامه A",
      sharh_faliat: "شرح فعالیت A",
      noeEtebar: "نوع اعتبار A",
      payment_description: "S",
    },
  ],
  "یگان ۳": [],
};

export default function ElameBargashtiPage() {
  const [dataSource, setDataSource] = useState<CreditEntry[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>();
  const [remainingBudget, setRemainingBudget] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<CreditEntry | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | undefined>();

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    const newData = dataByUnit[value] || [];
    setDataSource(newData);
    setRemainingBudget(Math.floor(Math.random() * 10000000));
    setSelectedRow(null);
  };

  const handleAgentChange = useCallback(
    (value: string | undefined) => {
      setSelectedAgent(value);
      const newData =
        selectedUnit && value ? dataByUnit[selectedUnit] || [] : [];
      setDataSource(newData);
      setRemainingBudget(value ? Math.floor(Math.random() * 10000000) : null);
      setSelectedRow(null);
    },
    [selectedUnit]
  );

  console.log("remainingBudget", remainingBudget);

  return (
    <Card>
      <Header
        selectedUnit={selectedUnit}
        onUnitChange={handleUnitChange}
        selectedAgent={selectedAgent}
        onAgentChange={handleAgentChange}
      />
      <CardContent>
        {selectedUnit && selectedAgent && (
          <>
            {/* <FinancialInfo
            selectedUnit={selectedUnit}
            remainingBudget={remainingBudget}
            sendDataForm={paymentFormOpen}
            onToggleForm={() => setPaymentFormOpen(!paymentFormOpen)}
          /> */}
            {/* <PaymentForm
            open={paymentFormOpen}
            onClose={() => setPaymentFormOpen(false)}
            onSubmit={handleFormSubmit}
            onAccountModalOpen={handleAccountModalOpen}
          /> */}
            <MainTable
              dataSource={dataSource}
              selectedRow={selectedRow}
              onRowSelect={setSelectedRow}
              title={`یگان واگذار کننده  : ${selectedUnit}  عامل خرید  : ${selectedAgent}`}
            />
            {selectedRow && (
              <div className="mt-8 space-y-8">
                <SaneBargashtiTable selectedRow={selectedRow} />
                <CashBargashtiTable selectedRow={selectedRow} />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
