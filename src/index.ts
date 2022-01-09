import { promises as fs } from "fs";
import path from "path";
import fetch from "node-fetch";
import FormData from "form-data";

/**
 * 各プラットフォームでGyazoのDeviceIDを取得する
 * @returns {string}
 */
const getDeviceID = async (): Promise<string> => {
  let appDataPath = "";
  let appDataFileName = "";
  switch (process.platform) {
    case "win32":
      appDataFileName = "id.txt";
      appDataPath = path.join(process.env.APPDATA || "", "Gyazo");
      break;
    case "darwin":
      appDataFileName = "id";
      appDataPath = path.join(process.env.HOME || "", "Library", "Gyazo");
      break;
    case "linux":
      appDataFileName = ".gyazo.id";
      appDataPath = process.env.HOME || "";
      break;
    default:
      break;
  }
  const filePath = path.join(appDataPath, appDataFileName);
  const deviceID = await fs.readFile(filePath, "utf-8");
  return deviceID;
};

/**
 * DeviceIDを使ってimagedataをアップロードする
 * @param {Buffer} imagedata
 * @param {string} title
 * @param {string} url
 * @param {string} desc
 * @param {number} created_at
 */
export const uploadToGyazoDeviceId = async (
  imagedata: Buffer,
  title: string | undefined = undefined,
  url: string | undefined = undefined,
  desc: string | undefined = undefined,
  created_at: number = new Date().getTime() / 1000
): Promise<string | undefined> => {
  const metadata = {
    app: "gyazo-cli",
    title: title,
    url: url,
    desc: desc,
  };

  const formData = new FormData();
  formData.append("imagedata", imagedata, {
    filename: "imagedata",
  });
  formData.append("id", await getDeviceID());
  formData.append("scale", "1.0");
  formData.append("created_at", created_at);
  formData.append("metadata", JSON.stringify(metadata));
  const res = await fetch("https://upload.gyazo.com/upload.cgi", {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const gyazoUrl = await res.text();
    return gyazoUrl;
  } else {
    console.error(await res.text());
    return undefined;
  }
};
