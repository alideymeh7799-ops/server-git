import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { message, Table } from "antd";

import useCustomAxios from "@/hooks/use-request";
import {
  CreditDetailBargeEtebar,
  CreditEntry,
  TakhsisItem,
  TypeGetDataCredit,
  TypeGetDataTakhsis,
  YeganTypeData,
} from "@/types/entity";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import { resourceAndOperation } from "@/_mock/item-permission";

import { convertToShamsiIntl } from "@/hooks/converted-time";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { TypeGetDataYegan } from "@/view/settings/amele-kharid";
import { useTranslation } from "react-i18next";
import ModalAddTakhsisItem from "./modal-build-takhsis";
import { navItemClasses } from "./styles";
import TakhsisTableInCard from "./table-takhsis";

const defaulttValueTakhsis: TakhsisItem = {
  add_credit_id: null,
  amount_takhsis: null,
  date_takhsis: null,
  sharh_takhsis: null,
  yegan_id: null,
};
interface TypeGetDataBudget {
  data?: CreditEntry[];
  message: string;
  success: boolean;
}
export interface stateModalTakhsisItem {
  show: boolean;
  title: string;
  formValue: TakhsisItem;
  id?: number | string | null;
  kol?: number;
  kharj_shode?: number;
  baghi_mande?: number;
  dataItem?: any;
}

export default function TakhsisEtebarBudget() {
  const serverAllowed = usePermission();

  const { t } = useTranslation();
  const { operationList, resourceList } = resourceAndOperation;
  const [modalPropsAddTakhsisItemt, setModalPropsAddTakhsisItem] =
    useState<stateModalTakhsisItem>({
      show: false,
      title: "ثبت تخصیص جدید",
      formValue: defaulttValueTakhsis,
    });

  const [dataBudget, setDataBudget] = useState<CreditEntry[]>([]);
  const [dataBudgetCr, setDataBudgetCr] = useState<CreditDetailBargeEtebar[]>(
    []
  );
  const [takhsisList, setTakhsisList] = useState<TakhsisItem[]>([]);
  const [dataTakhsis, setDataTakhsis] = useState<TakhsisItem[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<CreditEntry | null>(
    null
  );

  const [selectedTakhsisItem, setSelectedTakhsisItem] =
    useState<CreditDetailBargeEtebar | null>(null);

  const [refreshTakhsisItem, setRefreshTakhsisItem] = useState<number>(
    Date.now()
  );
  const [dataYegan, setDataYegan] = useState<YeganTypeData[]>([]);

  const [paymentAmount, setPaymentAmount] = useState({
    kol: 0,
    baghi_mande: 0,
    kharj_shode: 0,
  });

  const axiosHook = useCustomAxios();
  // !!________GET DATA
  const getDataBudget = axiosHook.useGetData<TypeGetDataBudget>(
    buildApiRoute(resourceList.CREDITBUDGET, operationList.GETALL)
  );
  const getDataYegan = axiosHook.useGetData<TypeGetDataYegan>(
    buildApiRoute(resourceList.YEGAN, operationList.GETALL)
  );
  const getDataCreditsChoices = axiosHook.useGetData<TypeGetDataCredit>(
    buildApiRoute(resourceList.ADDCREDITS, operationList.GETALL)
  );
  const getDataTakhsis = axiosHook.useGetData<TypeGetDataTakhsis>(
    buildApiRoute(resourceList.TAKHSISETEBAR, operationList.GETALL)
  );

  //   !!____STATE GET DATA FOR THE NOW

  useEffect(() => {
    let called = false;
    if (
      !called &&
      serverAllowed.can(resourceList.YEGAN, operationList.GETALL)
    ) {
      getDataYegan.fetchData();

      called = true;
    }
  }, []);

  useEffect(() => {
    const res = getDataYegan.data;
    if (res?.success && res.data) {
      setDataYegan(res.data);
    }
  }, [getDataYegan.data]);
  // !!_____GET DATA FOR THE USE_Effect
  useEffect(() => {
    if (serverAllowed.can(resourceList.CREDITBUDGET, operationList.GETALL)) {
      getDataBudget.fetchData();
      getDataCreditsChoices.fetchData();
    }
  }, []);

  const handleModalAddTakhsisItem = async (
    newData: TakhsisItem,
    type: "edit" | "add"
  ) => {
    let res;

    const date_etebar = newData.date_takhsis
      ? new Date(newData.date_takhsis).toISOString()
      : null;
    if (type === "add") {
      res = await senNewItemTakhsis.sendData({
        add_credit_id: Number(modalPropsAddTakhsisItemt.dataItem.id),
        amount_takhsis: Number(newData.amount_takhsis),
        date_takhsis: date_etebar ?? null,
        sharh_takhsis: newData.sharh_takhsis ?? null,
        yegan_id: Number(newData.yegan_id) ?? null,
      });
    } else {
      res = await sendUpdateTakhsis.sendData({
        add_credit_id: Number(modalPropsAddTakhsisItemt.dataItem.id),
        amount_takhsis: Number(newData.amount_takhsis),
        date_takhsis: date_etebar ?? null,
        sharh_takhsis: newData.sharh_takhsis ?? null,
        yegan_id: Number(newData.yegan_id) ?? null,
      });
    }

    if (res) {
      type === "add"
        ? message.success("با موفقیت اضافه  شد")
        : message.info("با موفقیت ویرایش شد");

      setRefreshTakhsisItem(Date.now());
    } else {
      message.error("خطا در ارسال اطلاعات");
    }

    setModalPropsAddTakhsisItem((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    if (serverAllowed.can(resourceList.TAKHSISETEBAR, operationList.GETALL)) {
      getDataTakhsis.fetchData();
    }
  }, [refreshTakhsisItem, selectedTakhsisItem]);

  useEffect(() => {
    const res = getDataBudget.data;
    if (res?.success && res.data) {
      setDataBudget(res.data);
    }
    const resCr = getDataCreditsChoices.data;
    if (resCr?.success && resCr.data) {
      setDataBudgetCr(resCr.data);
    }
  }, [getDataBudget.data, getDataCreditsChoices]);

  useEffect(() => {
    const res = getDataTakhsis.data;
    if (res?.success && res.data) {
      setTakhsisList(res.data);
      if (selectedTakhsisItem) {
        setDataTakhsis(
          res.data.filter(
            (item: TakhsisItem) => item.add_credit_id === selectedTakhsisItem.id
          )
        );
      }
    }
  }, [selectedTakhsisItem, refreshTakhsisItem]);

  // !!________UPDATE DATA
  const sendUpdateTakhsis = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.TAKHSISETEBAR,
      operationList.UPDATE,
      modalPropsAddTakhsisItemt.id
    )
  );

  // !!_______SEND DATA
  const senNewItemTakhsis = axiosHook.usePostData(
    buildApiRoute(resourceList.TAKHSISETEBAR, operationList.CREATE)
  );

  const baseColumns: any[] = [
    {
      title: t("credits.credit_budget_origin.culoumns_header.radif"),
      dataIndex: "radif",
      key: "radif",
    },
    {
      title: t("credits.credit_budget_origin.culoumns_header.program"),
      key: "barname",
      render: (_: any, record: CreditEntry) => record.barname?.code ?? "-",
    },
    {
      title: t("credits.credit_budget_origin.culoumns_header.faliat"),
      key: "faaliat",
      render: (_: any, record: CreditEntry) => record.faaliat?.code ?? "-",
    },
    {
      title: t("credits.credit_budget_origin.culoumns_header.madeh"),
      dataIndex: "madeh",
      key: "madeh",
    },
    {
      title: t("credits.credit_budget_origin.culoumns_header.sharh_hazineh"),
      dataIndex: "payment_description",
      key: "payment_description",
    },
    {
      title: t("credits.credit_budget_origin.culoumns_header.sharhe_program"),
      key: "sharhe_program",
      render: (_: any, record: CreditEntry) => record.barname?.code ?? "-",
    },
    {
      title: t("credits.credit_budget_origin.culoumns_header.sharh_faliat"),
      key: "sharh_faliat",
      render: (_: any, record: CreditEntry) => record.faaliat?.code ?? "-",
    },
    {
      title: t("credits.credit_budget_origin.culoumns_header.noeEtebar"),
      dataIndex: "noe_etebar",
      key: "noe_etebar",
    },
  ];

  const actionColumn: ColumnsType<CreditEntry>[number] = {
    title: "عملیات",
    key: "action",
    render: (_, record) => (
      <div className="flex gap-1 items-center justify-center">
        <Button
          onClick={() => {
            setSelectedRecord(record);
            setSelectedTakhsisItem(null);
          }}
          className="bg-chart2/50 hover:bg-chart2 text-white font-bold "
          variant="outline"
        >
          مشاهده
        </Button>
      </div>
    ),
  };

  const columns: ColumnsType<CreditEntry> = serverAllowed.can(
    resourceList.CREDITBUDGET,
    operationList.GETALL
  )
    ? [...baseColumns, actionColumn]
    : baseColumns;

  // !!FIX SELCTED DATA
  useEffect(() => {
    if (dataBudgetCr) {
      const allCredits = dataBudgetCr || [];

      const copyData: CreditDetailBargeEtebar[] = [];
      allCredits.forEach((x: CreditDetailBargeEtebar) => {
        if (x.credit_budget_id && x.credit_budget_id === selectedRecord!.id) {
          copyData.push(x);
        }
      });

      copyData.forEach((element: CreditDetailBargeEtebar) => {
        if (element && element.credit_budget_id === selectedRecord?.id) {
          setPaymentAmount((prev) => ({
            ...prev,
            kol: element.amount_etebar ? prev.kol + element?.amount_etebar : 0,
            baghi_mande: element.amount_etebar
              ? prev.kol + element?.amount_etebar
              : 0,
          }));
        }
      });
    }
  }, [selectedRecord]);

  useEffect(() => {
    if (takhsisList) {
      const allCredits = takhsisList || [];

      const copyData: TakhsisItem[] = [];
      allCredits.forEach((x: TakhsisItem) => {
        if (
          x.add_credit_id &&
          selectedTakhsisItem?.credit_budget_id === selectedRecord!.id
        ) {
          copyData.push(x);
        }
      });

      copyData.forEach((element: TakhsisItem) => {
        if (
          element &&
          element.add_credit_id === selectedTakhsisItem?.id &&
          selectedRecord?.id === selectedTakhsisItem.credit_budget_id
        ) {
          setPaymentAmount((prev) => ({
            ...prev,

            baghi_mande: element.amount_takhsis
              ? prev.kol - element?.amount_takhsis
              : prev.kol,
            kharj_shode: element.amount_takhsis
              ? prev.kharj_shode + element?.amount_takhsis
              : 0,
          }));
        }
      });
    }
  }, [takhsisList, selectedTakhsisItem, refreshTakhsisItem]);

  // !!UPDATE DATA TAKHSIS
  const handlerEditTakhsis = (
    itemSelcted: CreditDetailBargeEtebar | null,
    record: TakhsisItem
  ) => {
    setModalPropsAddTakhsisItem((prev) => ({
      ...prev,
      dataItem: itemSelcted,
      show: true,
      id: record.id,
      baghi_mande: paymentAmount.kol - paymentAmount.kharj_shode,
      kol: paymentAmount.kol,
      kharj_shode: paymentAmount.kharj_shode,
      formValue: record,
    }));
  };
  // !!_________DELETE DATA
  const sendDeleteTakhsis = axiosHook.useDeleteData(
    buildApiRoute(resourceList.TAKHSISETEBAR, operationList.DELETE)
  );

  const deleteDataTakhsis = async (id: number | string) => {
    try {
      let res: any;
      res = await sendDeleteTakhsis.remove("/" + id.toString());

      if (res?.success) {
        message.success("با موفقیت حذف شد");
        setRefreshTakhsisItem(Date.now());
      } else {
        message.error("خطا در حذف");
      }
    } catch (error) {
      message.error(
        error.status === "500" ? "خطا در ارتباط با سرور" : "خطایی رخ داده است"
      );
    }
  };
  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">تخصیص اعتبارات بودجه ای</h1>
        </div>
      </CardHeader>
      <CardContent>
        <Table
          rowKey="id"
          size="middle"
          rowClassName={(record) =>
            selectedRecord?.id === record.id ? navItemClasses.active : ""
          }
          columns={columns}
          dataSource={dataBudget}
          scroll={{ x: "max-content" }}
        />

        {selectedRecord && (
          <div className="mt-6 space-y-6">
            <Card className="bg-background shadow-sm">
              <CardHeader>
                <div className="text-lg font-semibold">
                  اطلاعات ردیف اعتبار
                  {"  " + selectedRecord.radif}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <span className="font-medium">ردیف اعتبار : </span>
                    {selectedRecord.radif}
                  </div>
                  <div>
                    <span className="font-medium"> تاریخ برگه اعتبار: </span>
                    {convertToShamsiIntl(new Date().toISOString(), "date")}
                  </div>
                  <div>
                    <span className="font-medium">نوع اعتبار</span>
                    {selectedRecord.noe_etebar}
                  </div>
                  <div>
                    <span className="font-medium">ماده اعتبار</span>
                    {selectedRecord.madeh}
                  </div>
                  <div>
                    <span className="font-medium">برنامه اعتبار</span>
                    {selectedRecord.barname?.code +
                      "  " +
                      selectedRecord.barname?.description}
                  </div>
                  <div>
                    <span className="font-medium">فعالیت اعتبار</span>
                    {selectedRecord.faaliat?.code +
                      "  " +
                      selectedRecord.faaliat?.description}
                  </div>
                  <div>
                    <span className="font-medium">نوع اعتبار</span>
                    {selectedRecord.noe_etebar}
                  </div>
                  {selectedTakhsisItem?.id && (
                    <div>
                      <span className="font-medium">مبلغ اعتبار: </span>
                      {Number(paymentAmount.kol).toLocaleString()} ریال
                    </div>
                  )}
                  {selectedTakhsisItem?.id && (
                    <div>
                      <span className="font-medium">خرج شده اعتبار: </span>
                      {Number(paymentAmount.kharj_shode).toLocaleString()} ریال
                    </div>
                  )}
                  {selectedTakhsisItem?.id && (
                    <div>
                      <span className="font-medium">باقی‌مانده اعتبار: </span>
                      {Number(
                        paymentAmount.kol - paymentAmount.kharj_shode
                      ).toLocaleString()}{" "}
                      ریال
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-lg font-semibold">
                  لیست برگ های اعتبار {"  " + selectedRecord.radif}
                </div>
              </CardHeader>
              <CardContent>
                <Table<CreditDetailBargeEtebar>
                  rowKey="id"
                  columns={[
                    {
                      title: "شماره برگ اعتبار",
                      dataIndex: "number_etebar",
                    },
                    {
                      title: "تاریخ برگ اعتبار",
                      dataIndex: "date_etebar",
                      render: (v) => convertToShamsiIntl(v, "date"),
                    },
                    {
                      title: t("non_credits.mablagh"),
                      dataIndex: "amount_etebar",
                      render: (v) => Number(v).toLocaleString() + " ریال  ",
                    },

                    {
                      title: "  یگان واگذار ",
                      dataIndex: "yegan_vagozar_id",
                    },
                    {
                      title: t("non_credits.actions"),
                      render: (_, item) => (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              setModalPropsAddTakhsisItem((prev) => ({
                                ...prev,
                                dataItem: item,
                                show: true,
                                // id: item.id,
                                baghi_mande:
                                  paymentAmount.kol - paymentAmount.kharj_shode,
                                kol: paymentAmount.kol,
                                kharj_shode: paymentAmount.kharj_shode,
                              }));
                              setSelectedTakhsisItem(item);
                            }}
                            className="flex items-center cursor-pointer justify-center px-4 py-1 text-sm font-medium font-iransans bg-chart4/50 hover:bg-chart4 text-white rounded-md transition-colors"
                          >
                            تخصیص اعتبار
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedTakhsisItem(item);
                            }}
                            className="flex items-center cursor-pointer justify-center px-4 py-1 text-sm font-medium font-iransans bg-primary/50 hover:bg-primary text-white rounded-md transition-colors"
                          >
                            تخصیص یافته ها
                          </Button>
                        </div>
                      ),
                    },
                  ]}
                  dataSource={dataBudgetCr.filter(
                    (item) => item.credit_budget_id === selectedRecord.id
                  )}
                  pagination={false}
                  size="small"
                />
              </CardContent>
            </Card>
            {selectedTakhsisItem && (
              <Card>
                <CardHeader>
                  <div className="text-lg font-semibold">
                    اعتبارات تخصیص یافته برای برگ اعتبار
                    {" شماره :  " + selectedTakhsisItem.number_etebar}
                  </div>
                </CardHeader>
                <CardContent>
                  <TakhsisTableInCard
                    dataSource={dataTakhsis}
                    onDelete={deleteDataTakhsis}
                    onEdit={handlerEditTakhsis}
                    selectedTakhsisItem={selectedTakhsisItem}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
      {modalPropsAddTakhsisItemt.show && (
        <ModalAddTakhsisItem
          formValue={modalPropsAddTakhsisItemt.formValue}
          onCancel={() =>
            setModalPropsAddTakhsisItem((prev) => ({ ...prev, show: false }))
          }
          dataPayment={{
            baghi_mande: paymentAmount.baghi_mande,
            dataItem: modalPropsAddTakhsisItemt.dataItem,
            kharj_shode: paymentAmount.kharj_shode,
            kol: paymentAmount.kol,
            formValue: modalPropsAddTakhsisItemt.formValue,
            title: modalPropsAddTakhsisItemt.title,
            show: modalPropsAddTakhsisItemt.show,
          }}
          onOk={handleModalAddTakhsisItem}
          show={modalPropsAddTakhsisItemt.show}
          title={modalPropsAddTakhsisItemt.title}
          dataYegan={dataYegan}
        />
      )}
    </>
  );
}
