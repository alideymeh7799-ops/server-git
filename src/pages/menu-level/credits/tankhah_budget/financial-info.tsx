import { Button } from "@/ui/button";

interface FinancialInfoProps {
	selectedUnit: string | undefined;
	remainingBudget: number | null;
	// sendDataForm: boolean;
	onToggleForm: () => void;
}

const FinancialInfo: React.FC<FinancialInfoProps> = ({ selectedUnit, remainingBudget, onToggleForm }) => {
	return (
		<div className="mb-6 space-y-4 bg-muted/40 p-6 rounded-2xl shadow-sm border">
			<div className="flex flex-col md:flex-row justify-between gap-4">
				<div className="w-full flex items-center justify-between gap-2">
					<div className="flex items-center gap-4">
						<div className="font-bold text-primary text-2xl">
							مانده اعتبار:
							<span style={{ fontWeight: 900 }}>{" " + remainingBudget?.toLocaleString() + " "}</span>
							ریال
						</div>
						<div className="font-bold mr-6 text-destructive text-2xl">یگان انتخاب شده: {selectedUnit}</div>
					</div>
					<Button onClick={onToggleForm} className="font-bold text-white cursor-pointer">
						ثبت تنخواه جدید
					</Button>
				</div>
			</div>
		</div>
	);
};

export default FinancialInfo;
