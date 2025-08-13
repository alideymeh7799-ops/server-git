import { Table, Popconfirm, Space } from "antd";
import type { Activity } from "./index";
import { usePermission } from "@/hooks/user";
import { Button } from "@/ui/button";

interface Props {
  data: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

export default function ActivityTable({ data, onEdit, onDelete }: Props) {
  const { can } = usePermission();
  const getColumns = () => {
    const actionsEnabled = {
      canEdit: can("barname", "update"),
      canDelete: can("barname", "delete"),
    };

    const baseColumns: any[] = [
      {
        title: "نام برنامه",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "کد برنامه",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "توضیحات",
        dataIndex: "description",
        key: "description",
      },
    ];

    const actionColumn = {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          {actionsEnabled.canEdit && (
            <Button onClick={() => onEdit(record)}>ویرایش</Button>
          )}
          {actionsEnabled.canDelete && (
            <Popconfirm
              title="آیا مطمئن هستید؟"
              onConfirm={() => onDelete(record.id)}
              okText="بله"
              cancelText="خیر"
            >
              <button className="text-red-500 hover:underline">حذف</button>
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
