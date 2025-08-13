import { resourceAndOperation } from "@/_mock/item-permission";
import { usePermission } from "@/hooks/user";
import { FaaliatTypeData } from "@/types/entity";
import { Button } from "@/ui/button";
import { Popconfirm, Space, Table } from "antd";

interface Props {
  data: FaaliatTypeData[];
  onEdit: (activity: FaaliatTypeData) => void;
  onDelete: (id: number) => void;
}

export default function ActivityTable({ data, onEdit, onDelete }: Props) {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const getColumns = () => {
    const actionsEnabled = {
      canEdit: can(resourceList.FAALIAT, operationList.UPDATE),
      canDelete: can(resourceList.FAALIAT, operationList.DELETE),
    };

    const baseColumns: any[] = [
      {
        title: "نام",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "کد فعالیت",
        dataIndex: "code",
        key: "code",
      },
    ];

    const actionColumn = {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          {actionsEnabled.canEdit && (
            <Button
              onClick={() => onEdit(record)}
              className="bg-chart3 text-white font-bold hover:bg-primary cursor-pointer "
            >
              ویرایش
            </Button>
          )}
          {actionsEnabled.canDelete && (
            <Popconfirm
              title="آیا مطمئن هستید؟"
              onConfirm={() => onDelete(record.id)}
              okText="بله"
              cancelText="خیر"
            >
              <Button className="bg-error-light hover:bg-error cursor-pointer text-white">
                حذف
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    };

    if (actionsEnabled.canEdit || actionsEnabled.canDelete) {
      baseColumns.push(actionColumn);
    }

    return baseColumns;
  };

  // const columns = [
  //   {
  //     title: "نام برنامه",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "کد فعالیت",
  //     dataIndex: "code",
  //     key: "code",
  //   },
  //   {
  //     title: "توضیحات",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  //   {
  //     title: "عملیات",
  //     key: "actions",
  //     render: (_: any, record: Activity) => (
  //       <div className="flex gap-2">
  //         <button
  //           className="text-blue-500 hover:underline"
  //           onClick={() => onEdit(record)}
  //         >
  //           ویرایش
  //         </button>
  //         <Popconfirm
  //           title="آیا مطمئن هستید؟"
  //           onConfirm={() => onDelete(record.id)}
  //           okText="بله"
  //           cancelText="خیر"
  //         >
  //           <button className="text-red-500 hover:underline">حذف</button>
  //         </Popconfirm>
  //       </div>
  //     ),
  //   },
  // ];

  return <Table dataSource={data} columns={getColumns()} rowKey="id" />;
}
