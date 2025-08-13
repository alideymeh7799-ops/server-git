import { resourceAndOperation } from "@/_mock/item-permission";
import { convertToShamsiIntl } from "@/hooks/converted-time";
import { usePermission } from "@/hooks/user";
import { CreditDetailBargeEtebar, CreditEntry } from "@/types/entity";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
interface PropsType {
  selectedRecord: CreditEntry;
  dataSelected: CreditDetailBargeEtebar[];
  openCreateModalCredit: (
    record: CreditDetailBargeEtebar | null,
    id: string | number | null
  ) => void;
  onDelete: (id: number | string, type: "credit" | "budget") => void;
}
const ShowDataSelectedRecorded = ({
  selectedRecord,
  dataSelected,
  openCreateModalCredit,
  onDelete,
}: PropsType) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const [allAmount, setAllAmount] = useState(0);

  useEffect(() => {
    const sum = dataSelected.reduce((total, item) => {
      return total + (item.amount_etebar || 0);
    }, 0);
    setAllAmount(sum);
  }, [dataSelected]);

  const handleDelete = (record: CreditDetailBargeEtebar) => {
    toast.warning(`آیا از حذف  مطمئن هستید؟`, {
      action: {
        label: "حذف",
        onClick: () => {
          if (record.id) onDelete(record.id, "credit");
        },
      },
      cancel: {
        label: "لغو",
        onClick: () => console.log("حذف لغو شد"),
      },
    });
  };
  return (
    <section className="w-full px-4">
      <div className="mt-6 space-y-6">
        <Card className="bg-background shadow-sm">
          <CardHeader>
            <div className="text-lg font-semibold">
              {t("credits.credit_budget_origin.credit_budget_origin_selcted")}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.radif"
                  )}:{" "}
                </span>
                <span className="text-primary">{selectedRecord.radif}</span>
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.program"
                  )}:{" "}
                </span>
                <span className="text-primary">
                  {" "}
                  {selectedRecord.barname?.description}
                </span>
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.faliat"
                  )}:{" "}
                </span>
                <span className="text-primary">
                  {selectedRecord.faaliat?.code}
                </span>
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.madeh"
                  )}:{" "}
                </span>

                <span className="text-primary">{selectedRecord.madeh}</span>
              </div>

              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.sharh_hazineh"
                  )}
                  :{" "}
                </span>

                <span className="text-primary">
                  {selectedRecord.payment_description}
                </span>
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.sharhe_program"
                  )}
                  :{" "}
                </span>

                <span className="text-primary">
                  {selectedRecord.barname?.description}
                </span>
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.sharh_faliat"
                  )}
                  :{" "}
                </span>
                <span className="text-primary">
                  {selectedRecord.faaliat?.description}
                </span>
              </div>
              <div>
                <span className="font-medium"> نوع اعتبار : </span>
                <span className="text-primary">
                  {selectedRecord.noe_etebar}
                </span>
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t("credits.credit_budget_origin.culoumns_header.kol")}:{" "}
                </span>
                <span className="text-primary">
                  {Number(allAmount).toLocaleString()}
                  {"  " + "ريال"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-lg font-semibold">
              {t(
                "credits.credit_budget_origin.credit_budget_origin_selcted_title"
              )}{" "}
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
                  render: (v) => v.toLocaleString("fa-IR"),
                },

                {
                  title: "  یگان واگذار ",
                  dataIndex: "yegan_vagozar_id",
                },
                {
                  title: t("non_credits.actions"),
                  render: (_, item) => (
                    <div className="flex gap-2">
                      {can(resourceList.CREDITBUDGET, operationList.UPDATE) && (
                        <Button
                          onClick={() =>
                            openCreateModalCredit(
                              item,
                              selectedRecord.id ? selectedRecord.id : null
                            )
                          }
                          className="flex items-center cursor-pointer justify-center px-4 py-1 text-sm font-medium font-iransans bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                        >
                          <EditOutlined />
                          {t("buttons.edit")}
                        </Button>
                      )}
                      {can(resourceList.CREDITBUDGET, operationList.DELETE) && (
                        <Popconfirm
                          title={t("buttons.confirm_deleted_item_messages")}
                          // onConfirm={() => deleteTakhsis(item.id)} // تابع حذف را باید پیاده‌سازی کنید
                          okText={t("buttons.okText")}
                          cancelText={t("buttons.cancelText")}
                          placement="topRight"
                        >
                          <Button
                            onClick={() => handleDelete(item)}
                            className="flex cursor-pointer items-center justify-center px-4 py-1 text-sm font-medium font-iransans bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                          >
                            <DeleteOutlined />
                            {t("buttons.delete")}
                          </Button>
                        </Popconfirm>
                      )}
                    </div>
                  ),
                },
              ]}
              dataSource={dataSelected}
              pagination={false}
              size="small"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ShowDataSelectedRecorded;
