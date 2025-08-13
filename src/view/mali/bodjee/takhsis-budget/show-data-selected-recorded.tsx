import { CreditDetailBargeEtebar, CreditEntry } from "@/types/entity";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Button, Popconfirm, Table } from "antd";
import { useTranslation } from "react-i18next";

interface PropsType {
  selectedRecord: CreditEntry;
  // dataSelected: CreditDetailBargeEtebar[];
  openCreateModalCredit: (record: CreditDetailBargeEtebar) => void;
}
const creditDetails: CreditDetailBargeEtebar[] = [
  {
    number_etebar: "CRD001",
    date_etebar: "1404/04/01",
    amount_etebar: 5000000,
    assigningUnit: "یگان الف",
  },
  {
    number_etebar: "CRD001",
    date_etebar: "1404/04/01",
    amount_etebar: 5000000,
    assigningUnit: "یگان الف",
  },
];
const ShowDataSelectedRecorded = ({
  selectedRecord,
  openCreateModalCredit,
}: PropsType) => {
  const { t } = useTranslation();
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
                {selectedRecord.radif}
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.program"
                  )}:{" "}
                </span>
                {selectedRecord.program}
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.faliat"
                  )}:{" "}
                </span>
                {selectedRecord.faliat}
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.madeh"
                  )}:{" "}
                </span>
                {selectedRecord.madeh}
              </div>

              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.sharh_hazineh"
                  )}
                  :{" "}
                </span>
                {selectedRecord.payment_description}
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.sharhe_program"
                  )}
                  :{" "}
                </span>
                {selectedRecord.sharhe_program}
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.sharh_faliat"
                  )}
                  :{" "}
                </span>
                {selectedRecord.sharhe_program}
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t("credits.credit_budget_origin.culoumns_header.kol")}:{" "}
                </span>
                {selectedRecord.sharhe_program}
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.baghimandeh"
                  )}
                  :{" "}
                </span>
                {selectedRecord.sharhe_program}
              </div>
              <div>
                <span className="font-medium">
                  {" "}
                  {t(
                    "credits.credit_budget_origin.culoumns_header.noeEtebar"
                  )}:{" "}
                </span>
                {selectedRecord.sharhe_program}
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
                  title: t(
                    "credits.credit_budget_origin.credit_budget_origin_selcted_table.mablagh"
                  ),
                  dataIndex: "amount",
                  render: (v) => v.toLocaleString("fa-IR"),
                },
                {
                  title: t(
                    "credits.credit_budget_origin.credit_budget_origin_selcted_table.creditNumber"
                  ),
                  dataIndex: "creditNumber",
                },
                {
                  title: t(
                    "credits.credit_budget_origin.credit_budget_origin_selcted_table.yegan"
                  ),
                  dataIndex: "assigningUnit",
                },
                {
                  title: t(
                    "credits.credit_budget_origin.credit_budget_origin_selcted_table.creditDate"
                  ),
                  dataIndex: "creditDate",
                },
                {
                  title: t(
                    "credits.credit_budget_origin.credit_budget_origin_selcted_table.actions"
                  ),
                  render: (_, item) => (
                    <div className="flex gap-2">
                      <Button onClick={() => openCreateModalCredit(item)}>
                        {t("buttons.edit")}
                      </Button>
                      <Popconfirm
                        title={t("buttons.confirm_deleted_item_messages")}
                        // onConfirm={() => deleteTakhsis(item.id)}
                        okText={t("buttons.okText")}
                        cancelText={t("buttons.cancelText")}
                      >
                        <Button> {t("buttons.delete")}</Button>
                      </Popconfirm>
                    </div>
                  ),
                },
              ]}
              dataSource={creditDetails}
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
