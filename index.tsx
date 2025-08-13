import { Button } from "@/ui/button";
import { Card, CardHeader } from "@/ui/card";
import { Input, message } from "antd";
import { useMemo, useState } from "react";
import ActivityTable from "./ActivityTable";
import ActivityModal from "./ActivityModal";
import { usePermission } from "@/hooks/user";

export interface Activity {
  id: number;
  name: string;
  code: string;
  description: string;
}

const initialActivity: Activity = {
  id: 0,
  name: "",
  code: "",
  description: "",
};

export default function ActivityManager() {
  const { can } = usePermission();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const filteredActivities = useMemo(() => {
    return activities.filter((act) =>
      act.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, activities]);

  const openModal = (activity?: Activity) => {
    setSelectedActivity(activity || null);
    setModalVisible(true);
  };

  const handleModalSubmit = (activity: Activity) => {
    if (activity.id === 0) {
      const newActivity = { ...activity, id: Date.now() };
      setActivities((prev) => [...prev, newActivity]);
      message.success("فعالیت با موفقیت اضافه شد");
    } else {
      setActivities((prev) =>
        prev.map((a) => (a.id === activity.id ? activity : a))
      );
      message.success("فعالیت با موفقیت ویرایش شد");
    }
    setModalVisible(false);
  };

  const handleDelete = (id: number) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    message.success("حذف شد");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="text-lg font-semibold">مدیریت برنامه ها</div>
          <div className="flex gap-2">
            {can("barname", "search") && (
              <Input
                placeholder="جستجو..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-60"
                allowClear
              />
            )}
            {can("barname", "create") && (
              <Button
                className="text-white bg-primary/95 hover:bg-primary "
                onClick={() => openModal()}
              >
                افزودن برنامه
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <ActivityTable
        data={filteredActivities}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      {modalVisible && (
        <ActivityModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleModalSubmit}
          initialData={selectedActivity || initialActivity}
        />
      )}
    </Card>
  );
}
