import { YeganTypeData } from "@/types/entity";

interface FinancialInfoProps {
  yegan: YeganTypeData[];
}

const FinancialInfo: React.FC<FinancialInfoProps> = ({ yegan }) => {
  // const serverAllowed = usePermission();
  // const { operationList, resourceList } = resourceAndOperation;
  return (
    <div className="mb-6 space-y-4 bg-muted/40 p-6 rounded-2xl shadow-sm border">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            {/* <div className="font-bold text-primary text-2xl">
              مانده اعتبار:
              <span style={{ fontWeight: 900 }}>
                {" " + remainingBudget?.toLocaleString() + " "}
              </span>
              ریال
            </div> */}
            <div className="font-bold mr-6 text-destructive text-2xl">
              یگان انتخاب شده: {yegan[0].name + " " + yegan[0].code}
            </div>
          </div>
          {/* {serverAllowed.can(resourceList.TANKHAH, operationList.CREATE) && (
            <Button
              onClick={onToggleForm}
              className="font-bold text-white cursor-pointer"
            >
              ثبت تنخواه جدید
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default FinancialInfo;
