import { resourceAndOperation } from "@/_mock/item-permission";
import { convertToShamsiIntl } from "@/hooks/converted-time";
import useCustomAxios from "@/hooks/use-request";
import { buildApiRoute, usePermission } from "@/hooks/user";
import {
  AmeleKharidTypeData,
  CreditEntry,
  TankhahTypeData,
  YeganTypeData,
} from "@/types/entity";
import { CardContent } from "@/ui/card";
import { Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import CashBargashtiTable from "./cash-bargashti-table";
import Header from "./header";
import MainTable from "./main-table";
import SaneBargashtiTable from "./sane-bargashti-table";
interface TypeGetDataAllTankah {
  data?: TankhahTypeData[];
  message: string;
  success: boolean;
}
const tankhahTableColumns = [
  // { title: "ردیف", dataIndex: "radif", key: "radif" },
  {
    title: "مبلغ پرداختی",
    dataIndex: "amount",
    key: "amount",
    render: (v: any) => (v ? v.toLocaleString() : "-"),
  },
  // { title: "نام عامل خرید", dataIndex: "agent", key: "agent" },
  // { title: "نوع پرداخت", dataIndex: "type", key: "type" },
  { title: "شرح تنخواه", dataIndex: "description", key: "description" },
  {
    title: "تاریخ تنخواه",
    dataIndex: "date_tankhah",
    key: "date_tankhah",
    render: (v: any) => (v ? convertToShamsiIntl(v, "date") : "-"),
  },
  // { title: "یگان واگذار کننده", dataIndex: "unit", key: "unit" },
];
export default function ElameBargashti() {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const [dataTankhah, setDataTankhah] = useState<TankhahTypeData[]>([]);
  // const [dataSource, setDataSource] = useState<CreditEntry[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>();
  // const [remainingBudget, setRemainingBudget] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<CreditEntry | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | undefined>();
  //   !!____STATE GET DATA FOR THE NOW
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  // const [refreshKeyCr, setRefreshKeyCr] = useState<number>(Date.now());
  const [dataSettings, setDataSettings] = useState<{
    yegan: YeganTypeData[];
    amleKharid: AmeleKharidTypeData[];
  }>({ yegan: [], amleKharid: [] });
  const axiosHook = useCustomAxios();
  // !!________GET DATA

  const getDataAllTankhah = axiosHook.useGetData<TypeGetDataAllTankah>(
    buildApiRoute(resourceList.TANKHAH, operationList.GETALL)
  );
  const getDataSettings = axiosHook.useGetData<any>(
    "api/getMany?resources=" +
      resourceList.YEGAN +
      "," +
      resourceList.AMELE_KHARID
  );
  useEffect(() => {
    if (can(resourceList.TANKHAH, operationList.GETALL)) {
      getDataAllTankhah.fetchData();
    }
  }, [refreshKey]);
  useEffect(() => {
    if (can(resourceList.YEGAN, operationList.GETALL)) {
      getDataSettings.fetchData();
    }
  }, []);
  useEffect(() => {
    const res = getDataSettings.data;
    if (res?.success && res.data) {
      setDataSettings({
        yegan: res.data[resourceList.YEGAN],
        amleKharid: res.data[resourceList.AMELE_KHARID],
      });
      // setTakhsisList(res.data);
    }
  }, [getDataSettings.data]);
  useEffect(() => {
    const res = getDataAllTankhah.data;

    if (res?.success && res.data) {
      setDataTankhah(res.data);
    }
  }, [getDataAllTankhah.data]);

  // const getDataCreditsChoices = axiosHook.useGetData<TypeGetDataCredit>(
  //   buildApiRoute(resourceList.ADDCREDITS, operationList.GETALL)
  // );

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    // const newData = dataByUnit[value] || [];
    // setDataSource(newData);
    // setRemainingBudget(Math.floor(Math.random() * 10000000));
    setSelectedRow(null);
  };

  const handleAgentChange = useCallback(
    (value: string | undefined) => {
      setSelectedAgent(value);
      // const newData =
      //   selectedUnit && value ? dataByUnit[selectedUnit] || [] : [];
      // setDataSource(newData);
      // setRemainingBudget(value ? Math.floor(Math.random() * 10000000) : null);
      setSelectedRow(null);
      setRefreshKey(Date.now());
    },
    [selectedUnit]
  );

  return (
    <>
      <Header
        selectedUnit={selectedUnit}
        onUnitChange={handleUnitChange}
        selectedAgent={selectedAgent}
        onAgentChange={handleAgentChange}
        dataSettingsYegan={dataSettings.yegan}
        dataSettingsAmeleKharid={dataSettings.amleKharid}
      />
      <CardContent>
        {/* {selectedUnit && selectedAgent && ( */}
        {/* <> */}
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
        <Table
          rowKey={(_, index) => `tankhah-${index}`}
          size="small"
          columns={tankhahTableColumns}
          dataSource={dataTankhah}
          pagination={false}
        />
        <MainTable
        // dataSource={dataSource}
        // selectedRow={selectedRow}
        // onRowSelect={setSelectedRow}
        // title={`یگان واگذار کننده  : ${selectedUnit}  عامل خرید  : ${selectedAgent}`}
        // dataSource={dataTankhah}
        />
        {selectedRow && (
          <div className="mt-8 space-y-8">
            <SaneBargashtiTable selectedRow={selectedRow} />
            <CashBargashtiTable selectedRow={selectedRow} />
          </div>
        )}
        {/* </>
        )} */}
      </CardContent>
    </>
  );
}
