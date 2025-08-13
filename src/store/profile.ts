import { ServerReqItem } from "@/types/entity";
import { create } from "zustand";

interface Profile {
  user: any;
  person: any;
  personal_info: any;
  role_permissions: any[];
  role: any;
  yegan: any;
  rank: any;
}

interface ProfileState extends Profile {
  keyItemMenu: string[];
  serverReq: ServerReqItem[];
  setProfile: (profile: Profile) => void;
}

const useProfile = create<ProfileState>((set) => ({
  user: {},
  person: {},
  personal_info: {},
  role_permissions: [],
  role: {},
  yegan: {},
  rank: {},
  keyItemMenu: [],
  serverReq: [],

  setProfile: (profile) => {
    const role_permissions = profile.role_permissions || [];

    const uniqueSet = new Set<string>();
    const serverReqMap: Record<string, Set<string>> = {};
    console.log("role_permissions", role_permissions);

    role_permissions.forEach((element) => {
      const resourceName = element?.permission?.resource?.name;
      const operationName = element?.permission?.operation?.name;

      if (resourceName) {
        uniqueSet.add(resourceName);

        if (!serverReqMap[resourceName]) {
          serverReqMap[resourceName] = new Set();
        }

        if (operationName) {
          serverReqMap[resourceName].add(operationName);
        }
      }
    });

    const serverReq: ServerReqItem[] = Object.entries(serverReqMap).map(
      ([name, operations]) => ({
        name,
        items: [...operations],
      })
    );

    set(() => ({
      user: profile.user ?? {},
      person: profile.person ?? {},
      personal_info: profile.personal_info ?? {},
      role: profile.role ?? {},
      yegan: profile.yegan ?? {},
      rank: profile.rank ?? {},
      role_permissions: [...role_permissions],
      keyItemMenu: [...uniqueSet, "my_profile"],
      serverReq: serverReq,
    }));
  },
  clearProfile: () =>
    set({
      user: {},
      person: {},
      personal_info: {},
      role_permissions: [],
      role: {},
      yegan: {},
      rank: {},
      keyItemMenu: [],
      serverReq: [],
    }),
}));

export default useProfile;
