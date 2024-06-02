"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = void 0;
const google_auth_library_1 = require("google-auth-library");
const googleapis_1 = require("googleapis");
const user_1 = require("../data-access/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("../utils/common");
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_KEY, process.env.GOOGLE_REDIRECT_URI);
const oauth2 = googleapis_1.google.oauth2({ version: "v2", auth: oAuth2Client });
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        oAuth2Client.setCredentials({ access_token: body.access_token });
        const userInfoGoogleResponse = yield oauth2.userinfo.get();
        const userInfo = userInfoGoogleResponse.data;
        if (!userInfo.verified_email)
            throw Error("email not verified");
        // check is user existed on application
        const userDBInfo = yield (0, user_1.getUserViaEmail)(userInfo.email);
        if (userDBInfo) {
            const sessionPayload = {
                email: userDBInfo.email,
                roleId: userDBInfo.role_id,
                userId: userDBInfo.id,
                first_name: userDBInfo.first_name,
                last_name: userDBInfo.last_name,
                started_at: Date.now(),
                expired_at: Date.now() + 24 * 60 * 60 * 1000,
            };
            const access_token = jsonwebtoken_1.default.sign(sessionPayload, common_1.jwtSecretKey, {
                expiresIn: "1d",
            });
            res.status(200).json({
                access_token,
                email: userInfo.email,
                avatar: userInfo.picture || userDBInfo.avatar,
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
            });
            return yield (0, user_1.updateUser)(userInfo.email, userInfo.picture, userInfo.given_name, userInfo.family_name);
        }
        else {
            const sessionPayload = {
                email: userInfo.email,
                roleId: 1,
                first_name: userInfo.given_name,
                last_name: userInfo.family_name,
                started_at: Date.now(),
                expired_at: Date.now() + 24 * 60 * 60 * 1000,
            };
            const access_token = jsonwebtoken_1.default.sign(sessionPayload, common_1.jwtSecretKey, {
                expiresIn: "1d",
            });
            res.status(200).json({
                access_token,
                email: userInfo.email,
                avatar: userInfo.picture,
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
            });
            return yield (0, user_1.createUser)(userInfo.email, userInfo.picture, userInfo.given_name, userInfo.family_name);
        }
    }
    catch (error) {
        console.error("Google authentication error:", error);
        res.json({ error: "Google authentication failed" });
    }
});
exports.googleAuth = googleAuth;
function getAuthenticatedClient() {
    return new Promise((resolve, reject) => {
        // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
        // which should be downloaded from the Google Developers Console.
        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: "https://www.googleapis.com/auth/userinfo.profile",
        });
        // Open an http server to accept the oauth callback. In this simple example, the
        // only request to our webserver is to /oauth2callback?code=<code>
    });
}
