/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  captcha: string;
  checkKey: string;
}

export interface VerImageParams {
  key: Number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  access_token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  id: string | number;
  // 用户名
  username: string;
  // 真实名字
  realname: string;
  // 头像
  avatar: string;
}
