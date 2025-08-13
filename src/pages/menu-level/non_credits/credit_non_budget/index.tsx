import type {
  CreditDetailBargeEtebar,
  CreditEntryNonBudget,
  stateModalPayment,
  TypeGetDataCredit,
} from "#/entity";
import { Button } from "@/ui/button";
import { Card, CardHeader } from "@/ui/card";
import { Input, message, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { dataHeaderForTheSearch } from "./api";

import useCustomAxios, { Authorization } from "@/hooks/use-request";
import CreditModalPaymentBudget from "../../common/credit-budget-add-payment";
import CreditModal from "./credit-budget-modal";
import CreditBudgetTable from "./credit-budget-table";
import ShowDataSelectedRecorded from "./show-data-selected-recorded";

const { Option } = Select;

const defaultCreditValue: CreditEntryNonBudget = {
  sarfasl: "",
  payment_description: "",
  mojavez: "",
  credit_origin: "",
};

interface TypeGetData {
  data?: CreditEntryNonBudget[];
  message: string;
  success: boolean;
}

export default function CreditBudgetPage() {
  const { t } = useTranslation();

  const [modalProps, setModalProps] = useState({
    show: false,
    title: t("non_credits.title_modal_add_payment"),
    formValue: defaultCreditValue,
  });

  const [selectedRecord, setSelectedRecord] = useState<CreditEntryNonBudget>({
    mojavez: "",
    credit_origin: "",
    payment_description: "",
    sarfasl: "",
  });

  const [modalPropsAddCredit, setModalPropsAddCredit] =
    useState<stateModalPayment>({
      show: false,
      title: t("non_credits.title_modal_add_payment"),
      formValue: {
        number_etebar: null,
        date_etebar: new Date().toLocaleString(),
        amount_etebar: null,
        assigningUnit: null,
      },
    });

  const [searchField, setSearchField] = useState<
    "sarfasl" | "mojavez" | "payment_description"
  >("sarfasl");
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchApplied, setSearchApplied] = useState(false);
  const [data, setData] = useState<CreditEntryNonBudget[]>([]);
  const [dataSelected, setDataSelected] = useState<CreditDetailBargeEtebar[]>(
    []
  );
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const [refreshKeyCr, setRefreshKeyCr] = useState<number>(Date.now());

  const axiosHook = useCustomAxios();
  // !!________GET DATA
  const getDataNonBudget = axiosHook.useGetData<TypeGetData>(
    "api/credit-origin-nonbudget",
    {
      Authorization: Authorization,
    }
  );
  const getDataCreditsChoices = axiosHook.useGetData<TypeGetDataCredit>(
    "api/addcredit",
    // "api/addcredit/" + selectedRecord.id,
    {
      Authorization: Authorization,
    }
  );

  // !!_______POST DATA AND ADD NEW ITEM
  const sendReqBuildNewBudget = axiosHook.usePostData(
    "api/credit-origin-nonbudget",
    {
      "content-type": "application/json",
      Authorization: Authorization,
    }
  );
  const sendRequstBuildNewCredit = axiosHook.usePostData("api/addcredit", {
    "content-type": "application/json",
    Authorization: Authorization,
  });
  // !!_____UPDATE DATA
  const sendUpdateBudget = axiosHook.useUpdateData(
    "api/credit-origin-nonbudget/" + modalProps.formValue.id,
    {
      "content-type": "application/json",
      Authorization: Authorization,
    }
  );
  const sendUpdateCreadit = axiosHook.useUpdateData(
    "api/addcredit/" + modalPropsAddCredit.id,
    {
      "content-type": "application/json",
      Authorization: Authorization,
    }
  );
  //!!______DELETED ITEM
  const sendDeleteBudget = axiosHook.useDeleteData(
    "api/credit-origin-nonbudget/",
    {
      "content-type": "application/json",
      Authorization: Authorization,
    }
  );
  const sendDeleteCredit = axiosHook.useDeleteData("api/addcredit/", {
    "content-type": "application/json",
    Authorization: Authorization,
  });

  useEffect(() => {
    getDataNonBudget.fetchData();
  }, [refreshKey]);

  useEffect(() => {
    const res = getDataNonBudget.data;
    if (res?.success && res.data) {
      setData(res.data);
    }
  }, [getDataNonBudget.data]);

  const openCreateModal = () => {
    setModalProps({
      show: true,
      title: t("non_credits.title_modal_add_payment"),
      formValue: defaultCreditValue,
    });
  };

  const openEditModal = (formValue: CreditEntryNonBudget) => {
    setModalProps({
      show: true,
      title: t("non_credits.title_modal_edit_payment"),
      formValue,
    });
  };

  const closeModal = () => {
    setModalProps((prev) => ({ ...prev, show: false }));
  };

  const handleModalSubmit = async (
    newData: CreditEntryNonBudget,
    type: "edit" | "add"
  ) => {
    let res;
    if (type === "add") {
      res = await sendReqBuildNewBudget.sendData({
        credit_origin: newData.credit_origin,
        payment_description: newData.payment_description,
        sarfasl: newData.sarfasl,
        mojavez: newData.mojavez,
      });
    } else {
      res = await sendUpdateBudget.sendData({
        credit_origin: newData.credit_origin,
        payment_description: newData.payment_description,
        sarfasl: newData.sarfasl,
        mojavez: newData.mojavez,
      });
    }

    if (res) {
      setRefreshKey(Date.now());
    }

    closeModal();
  };

  const deleteDataSubmit = async (
    id: number | string,
    type: "credit" | "budget" = "budget"
  ) => {
    try {
      let res: any;
      res =
        type === "budget"
          ? await sendDeleteBudget.remove(id.toString())
          : await sendDeleteCredit.remove(id.toString());

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

  const openCreateModalCredit = (
    record: CreditDetailBargeEtebar | null,
    id: string | number | null
  ) => {
    if (record?.amount_etebar) {
      setModalPropsAddCredit({
        show: true,
        title: t("credits.credit_budget_origin.title_modal_add"),
        formValue: {
          number_etebar: record.number_etebar,
          date_etebar: record.date_etebar ?? new Date().toLocaleString(),
          amount_etebar: record.amount_etebar ?? null,
          assigningUnit: record.assigningUnit ?? null,
          yegan_vagozar_id: record.yegan_vagozar_id,
        },
        id,
      });
    } else {
      setModalPropsAddCredit({
        show: true,
        title: t("credits.credit_budget_origin.title_modal_add"),
        formValue: {
          number_etebar: null,
          date_etebar: new Date().toString(),
          amount_etebar: null,
          assigningUnit: null,
          yegan_vagozar_id: undefined,
        },
        id,
      });
    }
  };

  // !!ADD NEW CREDIT NON BUDGET
  const closeModalAddCredit = () => {
    setModalPropsAddCredit((prev) => ({ ...prev, show: false }));
  };

  const handleModalSubmitAddCredit = async (
    newData: CreditDetailBargeEtebar,
    type: "edit" | "add"
  ) => {
    const date_etebar = newData.date_etebar
      ? new Date(newData.date_etebar).toISOString()
      : null; // یا مقدار پیش‌فرض مثلاً new Date().toISOString().split("T")[0]
    let res;
    if (type === "add") {
      res = await sendRequstBuildNewCredit.sendData({
        number_etebar: newData.number_etebar,

        yegan_vagozar_id: 2,
        amount_etebar: Number(newData.amount_etebar),
        date_etebar,
        credit_non_budget_id: modalPropsAddCredit.id,
      });
    } else {
      res = await sendUpdateCreadit.sendData({
        number_etebar: newData.number_etebar,

        yegan_vagozar_id: 2,
        amount_etebar: Number(newData.amount_etebar),
        date_etebar,
        credit_non_budget_id: modalPropsAddCredit.id,
      });
    }

    if (res) {
      setRefreshKeyCr(Date.now());
    }

    closeModalAddCredit();
  };

  const showCreditModal = (record: CreditEntryNonBudget) => {
    setSelectedRecord(record);
  };
  //!! GET ALL DATA CREADIT
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
        if (
          x.credit_non_budget_id &&
          x.credit_non_budget_id === selectedRecord!.id
        ) {
          copyData.push(x);
        }
      });

      setDataSelected(copyData);
    }
  }, [getDataCreditsChoices.data?.data]);
  const showDataCredits = async (record: CreditEntryNonBudget) => {
    setSelectedRecord(record);

    // await getDataCreditsChoices.fetchData();
    setRefreshKeyCr(Date.now());
  };
  const filteredData = useMemo(() => {
    // if (!searchApplied || !searchQuery) return data;

    return data.filter((item: any) => {
      const field = item[searchField];
      if (field === undefined || field === null) return false;
      return field.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [data, searchQuery, searchField]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
          <div className="text-lg font-semibold text-right w-full sm:w-auto">
            {t("non_credits.title_page")}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row gap-2 items-center border p-3 rounded-md bg-card text-card-foreground  w-full sm:w-auto">
              <Input
                placeholder={t("non_credits.search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                className="w-full sm:w-52"
              />
              <Select
                value={searchField}
                onChange={(value) => setSearchField(value)}
                className="w-full sm:w-56"
              >
                {dataHeaderForTheSearch(t).map((item, index) => (
                  <Option value={item.value} key={index}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </div>

            <Button
              onClick={openCreateModal}
              className="w-full sm:w-auto  bg-chart1 text-common-white font-bold whitespace-nowrap"
            >
              {t("non_credits.button_add")}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CreditBudgetTable
        onEdit={openEditModal}
        setData={setData}
        onDelete={deleteDataSubmit}
        data={filteredData}
        openCreateModalCredit={openCreateModalCredit}
        showCreditModal={showCreditModal}
        showDataCredits={showDataCredits}
      />

      {selectedRecord.id && (
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
        />
      )}
      {modalPropsAddCredit.show && (
        <CreditModalPaymentBudget
          title={modalPropsAddCredit.title}
          show={modalPropsAddCredit.show}
          formValue={modalPropsAddCredit.formValue}
          onOk={handleModalSubmitAddCredit}
          onCancel={closeModalAddCredit}
        />
      )}
    </Card>
  );
}
