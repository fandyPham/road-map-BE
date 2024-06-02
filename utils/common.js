"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecretKey = exports.pathPermission = void 0;
const enum_1 = require("../types/enum");
exports.pathPermission = {
    "/blogs": enum_1.Permission.BLOG_VIEW_LIST,
};
exports.jwtSecretKey = "Investidea_road_map";
