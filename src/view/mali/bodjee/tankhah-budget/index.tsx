import type {
  AmeleKharidTypeData,
  PeymanKarTypeData,
  TakhsisItem,
  TankhahNaghdPardakhtTypeData,
  TankhahTypeData,
  TypeGetDataTakhsis,
  YeganTypeData,
} from "#/entity";
import { resourceAndOperation } from "@/_mock/item-permission";
import useCustomAxios from "@/hooks/use-request";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { CardContent } from "@/ui/card";
import { useEffect, useState } from "react";
import AccountSelectModal from "./AccountSelectModal";
import FinancialInfo from "./financial-info";
import Header from "./header";
import MainTable from "./main-table";
import PaymentForm from "./payment-form";
import TankhahTable from "./tankhah-table";

const defaultTakhsiValue: TankhahTypeData = {
  amount: null,
  date_tankhah: null,
  description: null,
};
export default function AddTankhah() {
  const serverAllowed = usePermission();

  const [selectedUnit, setSelectedUnit] = useState<string>();
  const [dataTankhah, setDataTankhah] = useState<TankhahTypeData[]>([]);
  // const [dataTankhahNaghdPardakht, setDataTankhahNaghdPardakht] = useState<
  //   TankhahNaghdPardakhtTypeData[]
  // >([]);
  // const [remainingBudget, setRemainingBudget] = useState<number | null>(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState<TakhsisItem | null>(null);
  const [accountSelectCallback, setAccountSelectCallback] = useState<
    ((account: PeymanKarTypeData) => void) | null
  >(null);
  // const [refreshTakhsisItem, setRefreshTakhsisItem] = useState<number>(
  //   Date.now()
  // );
  const [refreshTankhah, setRefreshTankhah] = useState<number>(Date.now());
  const [modalProps, setModalProps] = useState({
    show: false,
    title: "افزودن تنخواه جدید",
    formValue: defaultTakhsiValue,
  });
  const [takhsisList, setTakhsisList] = useState<TakhsisItem[]>([]);

  const { operationList, resourceList } = resourceAndOperation;
  const axiosHook = useCustomAxios();
  // !!GET DATA TAKHSIS YAFTE HA
  const getDataTakhsis = axiosHook.useGetData<TypeGetDataTakhsis>(
    buildApiRoute(resourceList.TAKHSISETEBAR, operationList.GETALL)
  );
  const [dataSettings, setDataSettings] = useState<{
    yegan: YeganTypeData[];
    amleKharid: AmeleKharidTypeData[];
    peymanKar: PeymanKarTypeData[];
  }>({ yegan: [], amleKharid: [], peymanKar: [] });

  const getDataSettings = axiosHook.useGetData<any>(
    "api/getMany?resources=" +
      resourceList.YEGAN +
      "," +
      resourceList.AMELE_KHARID +
      "," +
      resourceList.PEYMANKAR
  );
  const getDataTankhah = axiosHook.useGetData<any>(
    buildApiRoute(resourceList.TANKHAH, operationList.GETALL)
  );
  const getDataTankhahNaghdPardakht = axiosHook.useGetData<any>(
    buildApiRoute(resourceList.NAGDPARDAKHT, operationList.GETALL)
  );
  // !!_________POST DATA
  const sendReqBuildNewTankhah = axiosHook.usePostData(
    buildApiRoute(resourceList.TANKHAH, operationList.CREATE)
  );
  const sendUpdateTankhah = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.TANKHAH,
      operationList.UPDATE,
      modalProps.formValue.id
    )
  );
  const sendReqBuildNewTankhahNaghdPardakht = axiosHook.usePostData(
    buildApiRoute(resourceList.NAGDPARDAKHT, operationList.CREATE)
  );
  const sendUpdateTankhahNaghdPardakht = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.NAGDPARDAKHT,
      operationList.UPDATE,
      modalProps.formValue.id
    )
  );
  useEffect(() => {
    if (serverAllowed.can(resourceList.TAKHSISETEBAR, operationList.GETALL)) {
      getDataTakhsis.fetchData();
    }
  }, []);

  useEffect(() => {
    if (
      serverAllowed.can(resourceList.NAGDPARDAKHT, operationList.GETALL) &&
      serverAllowed.can(resourceList.TANKHAH, operationList.GETALL)
    ) {
      getDataTankhah.fetchData();
      // getDataTankhahNaghdPardakht.fetchData();
    }
  }, [refreshTankhah]);

  useEffect(() => {
    const res = getDataTakhsis.data;
    if (res?.success && res.data) {
      setTakhsisList(res.data);
    }
  }, [getDataTakhsis.data]);

  useEffect(() => {
    const res = getDataTankhah.data;
    // const resNg = getDataTankhahNaghdPardakht.data;
    if (res?.success && res.data) {
      setDataTankhah(res.data);
    }
    // if (resNg?.success && resNg.data) {
    //   setDataTankhahNaghdPardakht(resNg.data);
    // }
  }, [getDataTankhahNaghdPardakht.data, getDataTankhah.data]);

  useEffect(() => {
    if (serverAllowed.can(resourceList.YEGAN, operationList.GETALL)) {
      getDataSettings.fetchData();
    }
  }, []);

  useEffect(() => {
    const res = getDataSettings.data;
    if (res?.success && res.data) {
      setDataSettings({
        yegan: res.data[resourceList.YEGAN],
        amleKharid: res.data[resourceList.AMELE_KHARID],
        peymanKar: res.data[resourceList.PEYMANKAR],
      });
      // setTakhsisList(res.data);
    }
  }, [getDataSettings.data]);

  // !!_______POST DATA AND ADD NEW ITEM

  const handleModalSubmit = async (
    newData: TankhahTypeData,
    type: "edit" | "add",
    tankhahType: "tankhah" | "naghd" = "tankhah"
  ) => {
    let res;
    // NoeEtebar
    const date_etebar = newData.date_tankhah
      ? new Date(newData.date_tankhah).toISOString()
      : null;
    if (tankhahType) {
      if (type === "add") {
        res = await sendReqBuildNewTankhah.sendData({
          amel_kharid_id: Number(newData.amel_kharid_id),
          amount: Number(newData.amount),
          date_tankhah: date_etebar,
          takhsis_etebar_id: selectedRow?.id,
          description: newData.description,
        });
      } else {
        res = await sendUpdateTankhah.sendData({
          amel_kharid_id: Number(newData.amel_kharid_id),
          amount: Number(newData.amount),
          date_tankhah: date_etebar,
          takhsis_etebar_id: selectedRow?.id,
          description: newData.description,
        });
      }
    }

    if (res) {
      setRefreshTankhah(Date.now());
    }

    closeModal();
  };
  const handleModalSubmitNaghdPardhakht = async (
    newData: TankhahNaghdPardakhtTypeData,
    type: "edit" | "add"
  ) => {
    let res;
    // NoeEtebar
    const date_etebar = newData.date_pardakht
      ? new Date(newData.date_pardakht).toISOString()
      : null;
    if (type === "add") {
      res = await sendReqBuildNewTankhahNaghdPardakht.sendData({
        peymankar_id: Number(newData.peymankar_id),
        amount: Number(newData.amount),
        date_pardakht: date_etebar,
        takhsis_etebar_id: selectedRow?.id,
        description: newData.description,
      });
    } else {
      res = await sendUpdateTankhahNaghdPardakht.sendData({
        peymankar_id: Number(newData.peymankar_id),
        amount: Number(newData.amount),
        date_pardakht: date_etebar,
        takhsis_etebar_id: selectedRow?.id,
        description: newData.description,
      });
    }
    if (res) {
      setRefreshTankhah(Date.now());
    }

    closeModal();
  };
  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    setSelectedRow(null);
  };

  const handleAccountModalOpen = (
    onSelect: (account: { accountNumber: string; accountOwner: string }) => void
  ) => {
    setAccountSelectCallback(() => onSelect);
    setAccountModalOpen(true);
  };

  const handleAccountSelect = (account: PeymanKarTypeData) => {
    if (accountSelectCallback) {
      accountSelectCallback(account);
    }
    setAccountModalOpen(false);
    setAccountSelectCallback(null);
  };
  const openCreateNewTankhahModal = () => {
    setModalProps({
      show: true,
      title: "افزودن تنخواه جدید",
      formValue: defaultTakhsiValue,
    });
  };
  const closeModal = () => {
    setModalProps({
      show: false,
      title: "افزودن تنخواه جدید",
      formValue: defaultTakhsiValue,
    });
  };
  const [allAmount, setAllAmount] = useState(0);
  useEffect(() => {
    if (selectedRow?.amount_takhsis) {
      const cpyData: any[] = [];
      dataTankhah.forEach((x) => {
        if (x.takhsis_etebar_id === selectedRow.id) {
          cpyData.push(x);
        }
      });
      const total = cpyData.reduce(
        (acc: any, item: any) => acc + (item.amount || 0),
        0
      );

      setAllAmount(total);
    }
  }, [selectedRow]);

  return (
    <>
      <Header
        selectedUnit={selectedUnit}
        dataYegan={dataSettings.yegan}
        onUnitChange={handleUnitChange}
      />
      <CardContent>
        {selectedUnit && (
          <>
            <FinancialInfo
              yegan={dataSettings?.yegan.filter(
                (x) => x.id === Number(selectedUnit)
              )}
            />

            <PaymentForm
              title={modalProps.title}
              show={modalProps.show}
              formValue={modalProps.formValue}
              onOk={handleModalSubmit}
              handleModalSubmitNaghdPardhakht={handleModalSubmitNaghdPardhakht}
              onCancel={closeModal}
              onAccountModalOpen={handleAccountModalOpen}
              dataAmeleKharid={dataSettings.amleKharid}
              selectedRow={selectedRow}
              allAmount={allAmount}
            />
            <MainTable
              dataSource={takhsisList.filter(
                (x) => x.yegan_id === Number(selectedUnit)
              )}
              openCreateNewTankhahModal={openCreateNewTankhahModal}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />
            {selectedRow && (
              <div className="mt-8 space-y-8">
                <TankhahTable
                  selectedRow={selectedRow}
                  dataSource={dataTankhah.filter(
                    (x) => x.takhsis_etebar_id === selectedRow.id
                  )}
                />
                {/* <CashTable selectedRow={selectedRow} /> */}
              </div>
            )}
          </>
        )}
      </CardContent>
      {accountModalOpen && (
        <AccountSelectModal
          peymanKarList={dataSettings.peymanKar}
          open={accountModalOpen}
          onClose={() => {
            setAccountModalOpen(false);
            setAccountSelectCallback(null);
          }}
          onSelect={handleAccountSelect}
        />
      )}
    </>
  );
}
