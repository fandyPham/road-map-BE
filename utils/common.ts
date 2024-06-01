import { IAuthPermission } from "../types/auth";
import { Permission } from "../types/enum";

export const pathPermission: IAuthPermission = {
  "/blogs": Permission.BLOG_VIEW_LIST,
};

export const jwtSecretKey = "Investidea_road_map";
