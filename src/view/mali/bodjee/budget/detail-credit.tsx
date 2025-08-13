import { CreditDetailBargeEtebar } from "@/types/entity";
import { Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function CreditDetailsModal({
	open,
	onClose,
	data,
}: {
	open: boolean;
	onClose: () => void;
	data: CreditDetailBargeEtebar | null;
}) {
	const [searchText, setSearchText] = useState("");

	if (!data) return null;

	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-40 z-[999]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>

					<motion.div
						className="fixed bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-3xl max-h-[70vh] shadow-lg p-6 overflow-auto"
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						<h2 className="text-lg font-bold mb-4 text-right">جزئیات اعتبار</h2>

						{/* هدر بالای جدول (خلاصه) */}
						<div className="grid grid-cols-4 gap-4 mb-6 text-right font-semibold text-sm border-b pb-2">
							<div>
								شماره برگه اعتبار: <span className="font-normal">{data.number_etebar || "-"}</span>
							</div>
							<div>
								تاریخ برگه اعتبار: <span className="font-normal">{data.date_etebar || "-"}</span>
							</div>
							<div>
								مبلغ: <span className="font-normal">{data.amount_etebar?.toLocaleString() || "-"}</span>
							</div>
							<div>
								کد یگان واگذار شده: <span className="font-normal">{data.yegan_vagozar_id || "-"}</span>
							</div>
						</div>

						{/* فیلتر جزییات */}
						<Input
							placeholder="جستجو بر اساس شماره برگه، تاریخ، مبلغ یا کد یگان"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="mb-4"
							dir="rtl"
						/>

						{/* جدول */}
						{/* <Table
              columns={detailColumns}
              dataSource={filteredDetails}
              pagination={{ pageSize: 5 }}
              size="small"
              bordered
              className="rtl"
              rowKey="key"
            /> */}

						<button onClick={onClose} className="mt-6 w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
							بستن
						</button>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

export default CreditDetailsModal;
