import type { CreditEntry } from "#/entity";
import { Button } from "@/ui/button";
import { Card, CardHeader } from "@/ui/card";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CreditModal from "./credit-budget-modal";
import CreditBudgetTable from "./credit-budget-table";

const defaultCreditValue: CreditEntry = {
  program: null,
  sharhe_program: null,
  sharh_faliat: null,
  sharh_hazineh: null,
  faliat: null,
  radif: null,
  madeh: null,
  payment_description: null,
  noeEtebar: null,
};

export default function CreditBudgetPage() {
  const { t } = useTranslation();

  const [modalProps, setModalProps] = useState<{
    show: boolean;
    title: string;
    formValue: CreditEntry;
  }>({
    show: false,
    title: "New Credit",
    formValue: defaultCreditValue,
  });

  const openCreateModal = () => {
    setModalProps({
      show: true,
      title: " فرم ثبت اعتبار جدید",
      formValue: defaultCreditValue,
    });
  };

  const openEditModal = (formValue: CreditEntry) => {
    setModalProps({
      show: true,
      title: "ویرایش اعتبار",
      formValue,
    });
  };

  const closeModal = () => {
    setModalProps((prev) => ({ ...prev, show: false }));
  };

  const handleModalSubmit = (values: CreditEntry) => {
    console.log("Submitted credit:", values);
    // TODO: Save credit to backend or state
    closeModal();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>{t("لیست اعتبارات بودجه ای")}</div>
          <Button onClick={openCreateModal}>{t("ثبت اعتبار جدید")}</Button>
        </div>
      </CardHeader>

      <CreditBudgetTable onEdit={openEditModal} />

      <CreditModal
        title={modalProps.title}
        show={modalProps.show}
        formValue={modalProps.formValue}
        onOk={handleModalSubmit}
        onCancel={closeModal}
      />
    </Card>
  );
}
