import type {
  CreditDetailBargeEtebar,
  CreditEntry,
  FaaliatTypeData,
  stateModalPayment,
  TypeGetDataCredit,
  YeganTypeData,
} from "#/entity";
import useCustomAxios from "@/hooks/use-request";
import useLocale from "@/locales/use-locale";
import { Button } from "@/ui/button";
import { CardHeader } from "@/ui/card";
import { Input, message, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { resourceAndOperation } from "@/_mock/item-permission";
import CreditModalPaymentBudget from "@/common/credit-budget-add-payment";
import CreditModal from "@/common/credit-budget-modal";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { useNavigate } from "react-router";
import { dataHeaderForTheSearch } from "./api";
import CreditBudgetTable from "./credit-budget-table";
import ShowDataSelectedRecorded from "./show-data-selected-recorded";

const { Option } = Select;
interface TypeGetData {
  data?: CreditEntry[];
  message: string;
  success: boolean;
}
const defaultCreditValue: CreditEntry = {
  radif: null,
  program: null,
  madeh: null,
  payment_description: null,
  faliat: null,
  sharh_faliat: null,
  sharh_hazineh: null,
  sharhe_program: null,
};
interface TypeGetDatabarname {
  data?: FaaliatTypeData[];
  message: string;
  success: boolean;
}
interface TypeGetDataFaaliat {
  data?: FaaliatTypeData[];
  message: string;
  success: boolean;
}

export default function Budget() {
  // !!DATA PROFILE
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const { t } = useTranslation();
  const { locale } = useLocale();

  const [selectedRecord, setSelectedRecord] = useState<CreditEntry | null>({
    faliat: "",
    madeh: "",
    payment_description: "",
    program: "",
    radif: null,
    sharh_faliat: "",
    sharh_hazineh: "",
    sharhe_program: "",
  });

  const [modalProps, setModalProps] = useState({
    show: false,
    title: t("credits.credit_budget_origin.title_modal_add"),
    formValue: defaultCreditValue,
  });
  const [modalPropsAddCredit, setModalPropsAddCredit] =
    useState<stateModalPayment>({
      show: false,
      title: t("credits.credit_budget_origin.title_modal_add"),
      formValue: {
        number_etebar: null,
        date_etebar: new Date().toLocaleString(),
        amount_etebar: null,
        assigningUnit: null,
      },
    });

  const [searchField, setSearchField] = useState<
    | "radif"
    | "sharhe_program"
    | "program"
    | "faliat"
    | "sharh_faliat"
    | "madeh"
    | "sharh_hazineh"
  >("radif");
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState<CreditEntry[]>([]);
  const [dataSelected, setDataSelected] = useState<CreditDetailBargeEtebar[]>(
    []
  );
  const openCreateModal = () => {
    setModalProps({
      show: true,
      title: t("credits.credit_budget_origin.title_modal_add"),
      formValue: defaultCreditValue,
    });
  };
  const openCreateModalCredit = (
    record: CreditDetailBargeEtebar | null,
    id: string | number | null
  ) => {
    if (record?.amount_etebar) {
      setModalPropsAddCredit({
        show: true,
        title: "ویرایش برگ اعتبار",
        formValue: {
          number_etebar: record.number_etebar,
          date_etebar: record.date_etebar ?? "",
          amount_etebar: record.amount_etebar ?? null,
          assigningUnit: record.assigningUnit ?? null, // تطابق با فرم‌والیو
        },
        id,
      });
    } else {
      setModalPropsAddCredit({
        show: true,
        title: t("credits.credit_budget_origin.title_modal_add"),
        formValue: {
          number_etebar: null,
          date_etebar: "",
          amount_etebar: null,
          assigningUnit: null,
        },
        id,
      });
    }
  };

  const openEditModal = (formValue: CreditEntry) => {
    setModalProps({
      show: true,
      title: t("credits.credit_budget_origin.title_modal_edit"),
      formValue: formValue,
    });
  };

  const closeModal = () => {
    setModalProps((prev) => ({ ...prev, show: false }));
  };
  const closeModalAddCredit = () => {
    setModalPropsAddCredit((prev) => ({ ...prev, show: false }));
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const field = item[searchField];
      if (field === undefined || field === null) return false;
      return field.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [data, searchQuery, searchField]);

  //   !!____STATE GET DATA FOR THE NOW
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const [refreshKeyCr, setRefreshKeyCr] = useState<number>(Date.now());
  const [dataSettings, setDataSettings] = useState<{
    yegan: YeganTypeData[];
  }>({ yegan: [] });
  const axiosHook = useCustomAxios();

  // !!________GET DATA
  const getDataSettings = axiosHook.useGetData<any>(
    "api/getMany?resources=" + resourceList.YEGAN
  );
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
      });
      // setTakhsisList(res.data);
    }
  }, [getDataSettings.data]);
  const getDataBudget = axiosHook.useGetData<TypeGetData>(
    buildApiRoute(resourceList.CREDITBUDGET, operationList.GETALL)
  );
  const getDataCreditsChoices = axiosHook.useGetData<TypeGetDataCredit>(
    buildApiRoute(resourceList.ADDCREDITS, operationList.GETALL)
  );
  // !!GET DATA
  const [dataBarname, setDataBarname] = useState<FaaliatTypeData[]>([]);
  const [dataFaaliat, setDataFaaliat] = useState<FaaliatTypeData[]>([]);

  const getDataFaaliat = axiosHook.useGetData<TypeGetDataFaaliat>(
    buildApiRoute(resourceList.FAALIAT, operationList.GETALL)
  );
  const getDataBarname = axiosHook.useGetData<TypeGetDatabarname>(
    buildApiRoute(resourceList.BARNAME, operationList.GETALL)
  );
  useEffect(() => {
    let isMounted = true;
    if (isMounted && can(resourceList.FAALIAT, operationList.GETALL)) {
      getDataFaaliat.fetchData();
      getDataBarname.fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [refreshKey]);
  // !!GET DATA AND ADD TO SATE FOR THE AMELEKHARID(DATA)
  useEffect(() => {
    const res = getDataFaaliat.data;
    const resBr = getDataBarname.data;
    if (res?.success && res.data) {
      setDataFaaliat(res.data);
    }
    if (resBr?.success && resBr.data) {
      setDataBarname(resBr.data);
    }
  }, [getDataFaaliat.data, getDataBarname.data]);

  // !!________UPDATE DATA
  const sendUpdateBudget = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.CREDITBUDGET,
      operationList.UPDATE,
      modalProps.formValue.id
    )
  );
  // !!_________POST DATA
  const sendReqBuildNewBudget = axiosHook.usePostData(
    buildApiRoute(resourceList.CREDITBUDGET, operationList.CREATE)
  );
  const sendRequstBuildNewCredit = axiosHook.usePostData(
    buildApiRoute(resourceList.ADDCREDITS, operationList.CREATE)
  );
  // !!_______UPDATE DATA
  const sendUpdateCreadit = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.ADDCREDITS,
      operationList.UPDATE,
      modalPropsAddCredit.id
    )
  );
  // !!_________DELETE DATA
  const sendDeleteBudget = axiosHook.useDeleteData(
    buildApiRoute(resourceList.CREDITBUDGET, operationList.DELETE)
  );
  const sendDeleteCredit = axiosHook.useDeleteData(
    buildApiRoute(resourceList.ADDCREDITS, operationList.DELETE)
  );
  // !!_____GET DATA FOR THE USE_Effect
  useEffect(() => {
    if (can(resourceList.CREDITBUDGET, operationList.GETALL)) {
      getDataBudget.fetchData();
    } else {
      const navigate = useNavigate();
      navigate(-1);
    }
  }, [refreshKey]);

  useEffect(() => {
    const res = getDataBudget.data;
    if (res?.success && res.data) {
      setData(res.data);
    }
  }, [getDataBudget.data]);

  //!! GET ALL DATA CREDITS

  useEffect(() => {
    if (selectedRecord?.id) {
      getDataCreditsChoices.fetchData();
    }
  }, [refreshKeyCr]);

  useEffect(() => {
    if (getDataCreditsChoices.data?.data) {
      const allCredits = getDataCreditsChoices.data?.data || [];

      const copyData: CreditDetailBargeEtebar[] = [];
      allCredits.forEach((x: CreditDetailBargeEtebar) => {
        if (x.credit_budget_id && x.credit_budget_id === selectedRecord!.id) {
          copyData.push(x);
        }
      });

      setDataSelected(copyData);
    }
  }, [getDataCreditsChoices.data?.data]);

  const showDataCredits = async (record: CreditEntry | null) => {
    setSelectedRecord(record);

    setRefreshKeyCr(Date.now());
  };
  // !!_______POST DATA AND ADD NEW ITEM

  const handleModalSubmit = async (
    newData: CreditEntry,
    type: "edit" | "add"
  ) => {
    let res;
    // NoeEtebar
    if (type === "add") {
      res = await sendReqBuildNewBudget.sendData({
        barname_id: Number(newData.barname_id),
        faaliat_id: Number(newData.faaliat_id),
        radif: newData.radif,
        madeh: newData.madeh,
        noe_etebar: newData.noe_etebar,
        payment_description: newData.payment_description,
      });
    } else {
      res = await sendUpdateBudget.sendData({
        barname_id: Number(newData.barname_id),
        faaliat_id: Number(newData.faaliat_id),
        radif: newData.radif,
        madeh: newData.madeh,
        noe_etebar: newData.noe_etebar,
        payment_description: newData.payment_description,
      });
    }

    if (res) {
      setRefreshKey(Date.now());
      type === "add"
        ? message.success("با موفقیت اضافه  شد")
        : message.info("با موفقیت ویرایش شد");
    } else {
      message.error("خطا در ارسال اطلاعات");
    }

    closeModal();
  };

  const handleModalSubmitAddCredit = async (
    newData: CreditDetailBargeEtebar,
    type: "edit" | "add"
  ) => {
    const date_etebar = newData.date_etebar
      ? new Date(newData.date_etebar).toISOString()
      : null;
    let res;

    if (type === "add") {
      res = await sendRequstBuildNewCredit.sendData({
        number_etebar: newData.number_etebar,

        yegan_vagozar_id: newData.yegan_vagozar_id,
        amount_etebar: Number(newData.amount_etebar),
        date_etebar,
        credit_budget_id: modalPropsAddCredit.id,
      });
    } else {
      res = await sendUpdateCreadit.sendData({
        number_etebar: newData.number_etebar,

        yegan_vagozar_id: newData.yegan_vagozar_id,
        amount_etebar: Number(newData.amount_etebar),
        date_etebar,
        credit_budget_id: modalPropsAddCredit.id,
      });
    }
    if (res) {
      setRefreshKeyCr(Date.now());
      type === "add"
        ? message.success("با موفقیت اضافه  شد")
        : message.info("با موفقیت ویرایش شد");
    } else {
      message.error("خطا در ارسال اطلاعات");
    }

    closeModalAddCredit();
  };

  //!!______DELETED ITEM CREDIT AND BUDGET

  const deleteDataSubmit = async (
    id: number | string,
    type: "credit" | "budget" = "budget"
  ) => {
    try {
      let res: any;
      res =
        type === "budget"
          ? await sendDeleteBudget.remove("/" + id.toString())
          : await sendDeleteCredit.remove("/" + id.toString());

      if (res?.success) {
        message.success("با موفقیت حذف شد");
        type === "budget"
          ? setRefreshKey(Date.now())
          : setRefreshKeyCr(Date.now());
      } else {
        message.error("خطا در حذف");
      }
    } catch (error) {
      message.error(
        error.status === "500" ? "خطا در ارتباط با سرور" : "خطایی رخ داده است"
      );
    }
  };
  // ??-----------------
  //  **____SHOW UI COMPONENT__________
  return (
    <>
      <CardHeader>
        <div
          className={
            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full "
          }
          style={{ direction: locale === "fa_IR" ? "rtl" : "ltr" }}
        >
          <div className="text-lg font-semibold text-right w-full sm:w-auto">
            {t("credits.credit_budget_origin.title_page")}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Search Box */}
            {can(resourceList.CREDITBUDGET, operationList.SEARCH) && (
              <div className="flex flex-col sm:flex-row gap-2 items-center border p-3 rounded-md bg-card text-card-foreground  w-full sm:w-auto">
                <div className="flex gap-1 items-center justify-start">
                  <Input
                    placeholder={t(
                      "credits.credit_budget_origin.search_placeholder"
                    )}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    allowClear
                    className="w-full sm:w-52"
                  />
                </div>
                <Select
                  value={searchField}
                  onChange={(value) => setSearchField(value)}
                  className="w-48"
                >
                  {dataHeaderForTheSearch(t).map((item, index) => (
                    <Option value={item.value} key={index}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </div>
            )}

            {/* Create Button */}
            {can(resourceList.CREDITBUDGET, operationList.CREATE) && (
              <Button
                onClick={openCreateModal}
                className="w-full sm:w-auto cursor-pointer whitespace-nowrap text-common-white"
              >
                {t("credits.credit_budget_origin.button_add_creadits_origin")}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CreditBudgetTable
        onEdit={openEditModal}
        data={filteredData}
        openCreateModalCredit={openCreateModalCredit}
        // showCreditModal={showCreditModal}
        showDataCredits={showDataCredits}
        // showCreditModal={showCreditModal}
        selectedRow={selectedRecord}
      />
      {selectedRecord && selectedRecord.id && (
        <ShowDataSelectedRecorded
          dataSelected={dataSelected}
          selectedRecord={selectedRecord}
          openCreateModalCredit={openCreateModalCredit}
          onDelete={deleteDataSubmit}
        />
      )}
      {modalProps.show && (
        <CreditModal
          title={modalProps.title}
          show={modalProps.show}
          formValue={modalProps.formValue}
          onOk={handleModalSubmit}
          onCancel={closeModal}
          dataBarname={dataBarname}
          dataFaaliat={dataFaaliat}
        />
      )}
      {modalPropsAddCredit.show && (
        <CreditModalPaymentBudget
          title={modalPropsAddCredit.title}
          show={modalPropsAddCredit.show}
          formValue={modalPropsAddCredit.formValue}
          onOk={handleModalSubmitAddCredit}
          onCancel={closeModalAddCredit}
          dataYegan={dataSettings.yegan}
        />
      )}
    </>
  );
}
