import React from "react";
import { Avatar, Typography, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Card } from "@/ui/card";
import useProfile from "@/store/profile";

const { Text } = Typography;

const UserProfile: React.FC = () => {
  const { person, rank, role, user, yegan, personal_info } = useProfile(
    (state) => state
  );

  console.log("user", user);

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl animate-bg-shift shadow-md rounded-3xl border border-primary/30 transform  transition-transform duration-300">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-text-primary font-irsans text-3xl font-bold">
            {person.name} {person.family}
          </h1>
        </div>

        <div className="flex flex-col items-center mb-10 animate-slide-up">
          <Avatar
            size={150}
            icon={<UserOutlined />}
            className="bg-gradient-to-r from-blue-500 to-purple-500 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
          />

          <h2 className="text-text-primary mt-2 font-irsans text-3xl font-bold">
            {role.name}
          </h2>
        </div>

        <Divider />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          <div className=" transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              نام
            </Text>
            <Text className="text-gray-700 font-medium">{person.name}</Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              نام خانوادگی
            </Text>
            <Text className="text-gray-700 font-medium">{person.family}</Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              شماره پرسنلی
            </Text>
            <Text className="text-gray-700 font-medium">
              {person.personnel_number}
            </Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              شماره ملی
            </Text>
            <Text className="text-gray-700 font-medium">
              {person.id_number}
            </Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              شماره حساب
            </Text>
            <Text className="text-gray-700 font-medium">
              {personal_info.number_hesab}
            </Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              MHSA
            </Text>
            <Text className="text-gray-700 font-medium">
              {personal_info.mhsa}
            </Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              MFMO
            </Text>
            <Text className="text-gray-700 font-medium">
              {personal_info.mfmo}
            </Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              MHSO
            </Text>
            <Text className="text-gray-700 font-medium">
              {personal_info.mhso}
            </Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              یگان
            </Text>
            <Text className="text-gray-700 font-medium">{yegan.name}</Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              کد یگان
            </Text>
            <Text className="text-gray-700 font-medium">{yegan.code}</Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              درجه
            </Text>
            <Text className="text-gray-700 font-medium">{rank.name}</Text>
          </div>
          <div className="  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              کد درجه
            </Text>
            <Text className="text-gray-700 font-medium">{rank.code}</Text>
          </div>
          <div className=" col-span-1 md:col-span-4  transition-colors duration-200 shadow-sm  rounded-lg border border-accent-foreground/20 px-3 py-4">
            <Text strong className="text-blue-600 block mb-1 text-sm">
              توضیحات نقش
            </Text>
            <Text className="text-gray-700 font-medium">
              {role.description}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
