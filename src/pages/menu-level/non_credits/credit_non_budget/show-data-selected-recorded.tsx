import { convertToShamsiIntl } from "@/hooks/converted-time";
import { CreditDetailBargeEtebar, CreditEntryNonBudget } from "@/types/entity";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // آیکون‌های Ant Design
import { Popconfirm, Table } from "antd";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface PropsType {
  selectedRecord: CreditEntryNonBudget;
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

  const handleDelete = (record: CreditDetailBargeEtebar) => {
    toast.warning(`آیا از حذف ${record.number_etebar} مطمئن هستید؟`, {
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
              {t("non_credits.selcted")}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <span className="font-medium font-iransans">
                  {t("non_credits.culoumns_header.sarfasl")}:{" "}
                </span>
                {selectedRecord.sarfasl}
              </div>
              <div>
                <span className="font-medium font-iransans">
                  {t("non_credits.culoumns_header.sharh_hazineh")}:{" "}
                </span>
                {selectedRecord.payment_description}
              </div>
              <div>
                <span className="font-medium font-iransans">
                  {t("non_credits.culoumns_header.no_etebar")}:{" "}
                </span>
                {selectedRecord.credit_origin}
              </div>
              <div>
                <span className="font-medium font-iransans">
                  {t("non_credits.culoumns_header.mojavez")}:{" "}
                </span>
                {selectedRecord.mojavez}
              </div>
              <div>
                <span className="font-medium font-iransans">
                  {t("non_credits.culoumns_header.baghimandeh")}:{" "}
                </span>
                10000
              </div>
              <div>
                <span className="font-medium font-iransans">
                  {t("non_credits.culoumns_header.kol")}:{" "}
                </span>
                20000
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-lg font-semibold">
              {t("non_credits.selcted_title")}
            </div>
          </CardHeader>
          <CardContent>
            <Table<CreditDetailBargeEtebar>
              rowKey="id"
              columns={[
                {
                  title: t("non_credits.mablagh"),
                  dataIndex: "amount_etebar",
                  render: (v) => v.toLocaleString("fa-IR"),
                },
                {
                  title: t("non_credits.creditNumber"),
                  dataIndex: "number_etebar",
                },
                {
                  title: t("non_credits.creditDate"),
                  dataIndex: "date_etebar",
                  render: (v) => convertToShamsiIntl(v, "date"),
                },
                {
                  title: t("non_credits.actions"),
                  render: (_, item) => (
                    <div className="flex gap-2">
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
