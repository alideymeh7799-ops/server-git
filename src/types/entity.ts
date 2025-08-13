import type { BasicStatus, PermissionType } from "./enum";
export interface ServerReqItem {
  name: string;
  items: string[];
}

export interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}
export interface CreditDetail {
  creditNumber: string;
  creditDate: string;
  amount: number;
  unit: string;
}
export interface UserInfo {
  id: string;
  email: string;
  username: string;
  password?: string;
  avatar?: string;
  roles?: Role[];
  status?: BasicStatus;
  permissions?: Permission[];
  menu?: MenuTree[];
}

export interface Permission_Old {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: PermissionType;
  route: string;
  status?: BasicStatus;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  hideTab?: boolean;
  frameSrc?: URL;
  newFeature?: boolean;
  children?: Permission_Old[];
}

export interface AddCredit_Old {
  id?: number;
  numberEtebar?: string;
  dateEtebar?: Date;
  yeganVagozarID?: number;
  creditsID?: number;
  amountEtebar: number;
  deletedAt?: Date;
}

export interface Role_Old {
  id: string;
  name: string;
  code: string;
  status?: BasicStatus;
  order?: number;
  desc?: string;
  permission?: Permission_Old[];
}

export interface CommonOptions {
  status?: BasicStatus;
  desc?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface User extends CommonOptions {
  id: string; // uuid
  username: string;
  password: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Role extends CommonOptions {
  id: string; // uuid
  name: string;
  code: string;
}

export interface Permission extends CommonOptions {
  id: string; // uuid
  name: string;
  code: string; // resource:action  example: "user-management:read"
}

export interface Menu extends CommonOptions, MenuMetaInfo {
  id: string; // uuid
  parentId: string;
  name: string;
  code: string;
  order?: number;
  type: PermissionType;
}

export type MenuMetaInfo = {
  path?: string; // nav path
  icon?: string; // nav icon
  caption?: string; // nav caption
  info?: string; // nav info
  disabled?: boolean; // nav disabled
  externalLink?: URL;
  auth?: string[];
  hidden?: boolean;

  // type: MENU
  component?: string;
};

export type MenuTree = Menu & {
  children?: MenuTree[];
};

////////////////////////////////////// Our Entities ///////////////////////////////////////////////////////////
export interface stateModalPayment {
  show: boolean;
  title: string;
  formValue: CreditDetailBargeEtebar;
  id?: number | string | null;
}
export interface TypeGetDataCredit {
  data?: CreditDetailBargeEtebar[];
  message: string;
  success: boolean;
}
export interface TypeGetDataTakhsis {
  data?: TakhsisItem[];
  message: string;
  success: boolean;
}
export type Barname = {
  id?: number | string | null;
  code: string;
  description: string;
};
export type Faaliat = {
  id?: number | string | null;
  code: string;
  description: string;
};
export type CreditEntry = {
  program: string | null;
  sharhe_program: string | null;
  sharh_faliat: string | null;
  sharh_hazineh: string | null;
  faliat: string | null;
  barname_id?: number;
  faaliat_id?: number;
  radif: string | null;
  madeh: string | null;
  id?: number | string | null;
  payment_description: string | null;
  noeEtebar?: string | null;
  barname?: Barname;
  faaliat?: Faaliat;
  noe_etebar?: string;

  // id?:number|string|null;
  // status: BasicStatus;
  // deletedAt?: Date;
  // paymentData: CreditFormData[];
};
export type CreditEntryNonBudget = {
  sarfasl: string;
  id?: number;
  mojavez: string;
  payment_description: string;
  credit_origin: string;
};
export type CreditFormData = {
  creditNumber?: string | null;
  creditDate?: string | null; // formatted like "1403/05/04"
  amount?: string | null;
  unit?: string | null;
};
export type YeganEntry = {
  id?: number;
  code: number;
  name: string;
  deletedAt?: Date;
};
export type CreditRow = {
  radif?: string;
  madeh: string;
  payment_description: string;
  barname: string;
  faaliat: string;
  sharh_takhsis: string;
  id: string;
  creditDate: string;
};
export type CreditDetailBargeEtebar = {
  number_etebar: string | null;
  date_etebar: string | null;
  amount_etebar: number | null;
  assigningUnit: string | null;
  yegan_vagozar_id?: string | number;
  credit_non_budget_id?: number | string;
  credit_budget_id?: number | string;
  id?: string | number;
};
export type CreditTakhsis = {
  creditPayment: CreditPayment;
  dataRecorder: CreditRow;
};
export type CreditPayment = {
  sheetNumber: string;
  accountType: string;
  creditType: string;
  amount: string;
};

export type TakhsisItem = {
  id?: string | null;
  amount_takhsis: number | null;
  sharh_takhsis: string | null;
  add_credit_id: number | null;
  date_takhsis: string | null;
  yegan_id: number | null;
  yegan?: any | null;
};
export type TakhsisItemSend = {
  id?: string | null;
  amele_kharid_id: number | null;
  amount: number | string | null;
  date_tankhah: string | null;
  takhsis_etebar_id: number | null;
  description: string;
};

// !!_________TAKHSIS__CREDITS_____TYPES_______
export type TakhsisItemCreditsOrigin = {
  id: string;
  sheetNumber: string;
  accountType: string;
  creditType: string;
  creditDate: string;
  articles: string;
  activity: string;
  program: string;
  costDescription: string;
  amount: number;
};
// !!_________DATA_______USER
export interface PersonDataForThePublic {
  key: string;
  personnelId: string;
  firstName: string;
  unitCode: string;
  rank: string;
  nationalId: string;
  accountNumber: string;
  bankCode: string;
  hsaSource: string;
  fmoSource: string;
  hsoSource: string;
  dispatchDate: string;
  role: string;
  permissions: string[];
}
// !!_______DATA TANKHA______
export type TankhahTypeData = {
  amel_kharid_id?: number;
  amount: number | null;
  description: string | null;
  date_tankhah: string | null;
  takhsis_etebar_id?: number | null;
  id?: number | string;
};
export type TankhahNaghdPardakhtTypeData = {
  peymankar_id?: number;
  amount: number | null;
  description: string | null;
  date_pardakht: string | null;
  takhsis_etebar_id?: number | null;
  id?: number | string;
};
// !!______DATA TYPE AMELE KHARID
export type AmeleKharidTypeData = {
  person_id: number | null;
  yegan_id: number | null;
  number_hesab: string | null;
  onvan_hesab: string | null;
  id?: string | number;
};
// !!______DATA TYPE YEGAN

export type YeganTypeData = {
  code: number | string | null;
  name: string | null;
  id?: string | number;
};
// !!______DATA TYPE PeymanKar

export type PeymanKarTypeData = {
  number_hesab: number | string | null;
  name: string | null;
  id?: string | number;
};
// !!______TYPE DATA PERSONAL
export interface stateModalPersonal {
  show: boolean;
  title: string;
  formValue: CreditDetailBargeEtebar;
  id?: number | string | null;
}
export type typeDataPersonal = {
  id?: number;
  name: string | null;
  family: string | null;
  firstName: string | null;
  unitCode: string | null;
  rank: string | null;
  nationalId: string | null;
  accountNumber: string | null;
  bankCode: string | null;
  hsaSource: string | null;
  fmoSource: string | null;
  hsoSource: string | null;
  personnelId: string | null;
};
export type PersonalType = {
  id?: number;
  name: string | null;
  family: string | null;
  id_number: string | null;
  personnel_number: string | null;
  nationalId?: string | null;
  accountNumber?: string | null;
  bankCode?: string | null;
  hsaSource?: string | null;
  fmoSource?: string | null;
  hsoSource?: string | null;
  personnelId?: string | null;
};

// !!______DATA TYPE AMELE KHARID
export type FaaliatTypeData = {
  code: string | null;
  description: string | null;
  id?: string | number;
};
// !!_____DATA TYPE Activity
export interface Activity {
  id: number;
  name: string;
  code: string;
  description: string;
}
// !!_________DATA TYPE ROLES
export type RolesType = {
  id?: number | string;
  description: string | null;
  name: string | null;
};
// !!______DATA TYPE EMZAE TANKHAH
export interface Data_EMZAE_TANKHAH {
  r_hesab_dari_daraei?: string;
  r_momayezi?: string;
  r_sandogh?: string;
  r_daraei?: string;
  m_tanzim_padash?: string;
  m_tanzim_ezafekar?: string;
  m_tanzim_etebar_budget?: string;
  m_tanzim_etebar_non_budget?: string;
  r_hesab_dari_cont?: string;
  r_cont?: string;
  az_name?: string;
  be_name?: string;
  mozo_name?: string;
  tel?: string;
  niro_khedmati?: string;
  yegan_omdeh?: string;
  f_yegan_omdeh?: string;
}
export type TypeServer = {
  success: boolean;
  message: string;
};
