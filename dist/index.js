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
exports.uploadToGyazoDeviceId = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const form_data_1 = __importDefault(require("form-data"));
/**
 * 各プラットフォームでGyazoのDeviceIDを取得する
 * @returns {string}
 */
const getDeviceID = () => __awaiter(void 0, void 0, void 0, function* () {
    let appDataPath = "";
    let appDataFileName = "";
    switch (process.platform) {
        case "win32":
            appDataFileName = "id.txt";
            appDataPath = path_1.default.join(process.env.APPDATA || "", "Gyazo");
            break;
        case "darwin":
            appDataFileName = "id";
            appDataPath = path_1.default.join(process.env.HOME || "", "Library", "Gyazo");
            break;
        case "linux":
            appDataFileName = ".gyazo.id";
            appDataPath = process.env.HOME || "";
            break;
        default:
            break;
    }
    const filePath = path_1.default.join(appDataPath, appDataFileName);
    const deviceID = yield fs_1.promises.readFile(filePath, "utf-8");
    return deviceID;
});
/**
 * DeviceIDを使ってimagedataをアップロードする
 * @param {Buffer} imagedata
 * @param {string} title
 * @param {string} url
 * @param {string} desc
 * @param {number} created_at
 */
const uploadToGyazoDeviceId = (imagedata, title = undefined, url = undefined, desc = undefined, created_at = new Date().getTime() / 1000) => __awaiter(void 0, void 0, void 0, function* () {
    const metadata = {
        app: "gyazo-cli",
        title: title,
        url: url,
        desc: desc,
    };
    const formData = new form_data_1.default();
    formData.append("imagedata", imagedata, {
        filename: "imagedata",
    });
    formData.append("id", yield getDeviceID());
    formData.append("scale", "1.0");
    formData.append("created_at", created_at);
    formData.append("metadata", JSON.stringify(metadata));
    const res = yield (0, node_fetch_1.default)("https://upload.gyazo.com/upload.cgi", {
        method: "POST",
        body: formData,
    });
    if (res.ok) {
        const gyazoUrl = yield res.text();
        return gyazoUrl;
    }
    else {
        console.error(yield res.text());
        return undefined;
    }
});
exports.uploadToGyazoDeviceId = uploadToGyazoDeviceId;
