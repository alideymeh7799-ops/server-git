// import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/ui/button";
import { Card, CardHeader } from "@/ui/card";
// import YeganTable from "./yegan_table";
// import YeganModal from "./yegan_modal";
// import type { YeganEntry } from "#/entity";

// const defaultYeganValue: YeganEntry = {
//   name: "",
//   code: 0,
// };

export default function YeganPage() {
	const { t } = useTranslation();

	// const [modalProps, setModalProps] = useState<{
	//   show: boolean;
	//   title: string;
	//   formValue: YeganEntry;
	// }>({
	//   show: false,
	//   title: "ثبت اطلاعات یگان",
	//   formValue: defaultYeganValue,
	// });

	const openCreateModal = () => {
		// setModalProps({
		//   show: true,
		//   title: "ثبت اطلاعات یگان",
		//   formValue: defaultYeganValue,
		// });
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>{t("لیست یگان ها")}</div>
					<Button onClick={openCreateModal}>{t("ثبت یگان")}</Button>
				</div>
			</CardHeader>

			{/* <YeganTable onEdit={openEditModal} />

      <YeganModal
        title={modalProps.title}
        show={modalProps.show}
        formValue={modalProps.formValue}
        onOk={handleModalSubmit}
        onCancel={closeModal}
      /> */}
		</Card>
	);
}
