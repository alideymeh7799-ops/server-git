import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Select, Table, message } from "antd";
import { Button } from "@/ui/button";
import { CardHeader, CardContent, Card } from "@/ui/card";
import { typeDataPersonal } from "#/entity";
import RewardModal from "./reward-modal";
import AllocationModal from "./AllocationModal";

const { Option } = Select;

interface Reward {
  personal: typeDataPersonal;
  amount: number;
  date: string;
  docNumber: string;
}

const users: typeDataPersonal[] = [
  {
    id: 1,
    name: "Ali",
    family: "Rezaei",
    firstName: "Ali",
    unitCode: "123",
    rank: "سرگرد",
    nationalId: "1234567890",
    accountNumber: "1111111",
    bankCode: "012",
    hsaSource: "src1",
    fmoSource: "src2",
    hsoSource: "src3",
    personnelId: "998877",
  },
  // ... سایر کاربران
];

export default function PersonalRewardTable() {
  const { t } = useTranslation();

  const [searchField, setSearchField] =
    useState<keyof typeDataPersonal>("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<typeDataPersonal | null>(
    null
  );
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const field = user[searchField];
      if (!field) return false;
      return field.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [users, searchQuery, searchField]);

  const handleOpenRewardModal = (user: typeDataPersonal) => {
    setSelectedUser(user);
    setEditingIndex(null);
    setShowModal(true);
  };

  const handleSubmitReward = (data: {
    amount: number;
    date: string;
    docNumber: string;
  }) => {
    if (!selectedUser) return;

    const newReward: Reward = {
      personal: selectedUser,
      ...data,
    };

    if (editingIndex !== null) {
      const updated = [...rewards];
      updated[editingIndex] = newReward;
      setRewards(updated);
      message.success("پاداش ویرایش شد");
    } else {
      setRewards((prev) => [...prev, newReward]);
      message.success("پاداش ثبت شد");
    }

    setShowModal(false);
  };

  const handleEditReward = (index: number) => {
    const reward = rewards[index];
    setSelectedUser(reward.personal);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDeleteReward = (index: number) => {
    const confirm = window.confirm("آیا مطمئن هستید که می‌خواهید حذف کنید؟");
    if (!confirm) return;
    const updated = [...rewards];
    updated.splice(index, 1);
    setRewards(updated);
    message.success("پاداش حذف شد");
  };

  const columns = [
    {
      title: t("نام"),
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: t("نام خانوادگی"),
      dataIndex: "family",
      key: "family",
    },
    {
      title: t("کد ملی"),
      dataIndex: "nationalId",
      key: "nationalId",
    },
    {
      title: t("شماره پرسنلی"),
      dataIndex: "personnelId",
      key: "personnelId",
    },
    {
      title: t("عملیات"),
      key: "actions",
      render: (_: any, record: typeDataPersonal) => (
        <Button
          className="bg-chart3 hover:bg-chart3/80 text-white rounded-2xl py-1 px-2 text-xs"
          onClick={() => handleOpenRewardModal(record)}
        >
          ثبت پاداش
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
          <div className="text-lg font-semibold text-right w-full sm:w-auto">
            {t("لیست کاربران")}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row gap-2 items-center border p-3 rounded-md bg-card text-card-foreground w-full sm:w-auto">
              <Input
                placeholder={t("جستجو...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                className="w-full sm:w-52"
              />
              <Select
                value={searchField}
                onChange={(value) => setSearchField(value)}
                className="w-48"
              >
                <Option value="name">نام</Option>
                <Option value="family">نام خانوادگی</Option>
                <Option value="nationalId">کد ملی</Option>
                <Option value="personnelId">شماره پرسنلی</Option>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="w-full">
        <Table rowKey="id" columns={columns} dataSource={filteredUsers} />
      </CardContent>

      {/* لیست پاداش‌ها */}
      {rewards.length > 0 && (
        <CardContent className="w-full mt-6 border-t pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="font-semibold text-lg">لیست پاداش‌های انتخاب شده</h2>
            <Button
              onClick={() => setShowAllocationModal(true)}
              className="bg-redStorm text-white px-4 py-1 rounded-md text-sm"
            >
              تخصیص اعتبار
            </Button>
          </div>
          <Table
            rowKey={(_, index) => index!.toString()}
            columns={[
              {
                title: "نام",
                dataIndex: ["personal", "firstName"],
                key: "firstName",
              },
              {
                title: "نام خانوادگی",
                dataIndex: ["personal", "family"],
                key: "family",
              },
              { title: "مبلغ پاداش", dataIndex: "amount", key: "amount" },
              { title: "تاریخ تنظیم", dataIndex: "date", key: "date" },
              { title: "شماره سند", dataIndex: "docNumber", key: "docNumber" },
              {
                title: "عملیات",
                key: "actions",
                render: (_: any, __: any, index: number) => (
                  <div className="flex gap-2">
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded"
                      onClick={() => handleEditReward(index)}
                    >
                      ویرایش
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                      onClick={() => handleDeleteReward(index)}
                    >
                      حذف
                    </Button>
                  </div>
                ),
              },
            ]}
            dataSource={rewards}
          />
        </CardContent>
      )}

      {showModal && selectedUser && (
        <RewardModal
          user={selectedUser}
          show={showModal}
          onCancel={() => {
            setShowModal(false);
            setEditingIndex(null);
          }}
          onOk={handleSubmitReward}
          defaultValues={
            editingIndex !== null
              ? {
                  amount: rewards[editingIndex].amount,
                  date: rewards[editingIndex].date,
                  docNumber: rewards[editingIndex].docNumber,
                }
              : undefined
          }
        />
      )}
      <AllocationModal
        open={showAllocationModal}
        onClose={() => setShowAllocationModal(false)}
      />
    </Card>
  );
}
