import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { IVerifyUserResponse } from "../types/auth";
import { createUser, getUserViaEmail, updateUser } from "../data-access/user";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../utils/common";
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET_KEY,
  process.env.GOOGLE_REDIRECT_URI
);
const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });

export const googleAuth = async (req: Request, res: Response) => {
  const body: any = req.body;

  try {
    oAuth2Client.setCredentials({ access_token: body.access_token });

    const userInfoGoogleResponse: any = await oauth2.userinfo.get();
    const userInfo: IVerifyUserResponse = userInfoGoogleResponse.data;
    if (!userInfo.verified_email) throw Error("email not verified");
    // check is user existed on application

    const userDBInfo = await getUserViaEmail(userInfo.email);

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
      const access_token = jwt.sign(sessionPayload, jwtSecretKey, {
        expiresIn: "1d",
      });
      res.status(200).json({
        access_token,
        email: userInfo.email,
        avatar: userInfo.picture || userDBInfo.avatar,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
      });
      return await updateUser(
        userInfo.email,
        userInfo.picture,
        userInfo.given_name,
        userInfo.family_name
      );
    } else {
      const sessionPayload = {
        email: userInfo.email,
        roleId: 1,
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        started_at: Date.now(),
        expired_at: Date.now() + 24 * 60 * 60 * 1000,
      };

      const access_token = jwt.sign(sessionPayload, jwtSecretKey, {
        expiresIn: "1d",
      });
      res.status(200).json({
        access_token,
        email: userInfo.email,
        avatar: userInfo.picture,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
      });
      return await createUser(
        userInfo.email,
        userInfo.picture,
        userInfo.given_name,
        userInfo.family_name
      );
    }
  } catch (error) {
    console.error("Google authentication error:", error);
    res.json({ error: "Google authentication failed" } as any);
  }
};

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
