/// <reference types="node" />
/**
 * DeviceIDを使ってimagedataをアップロードする
 * @param {Buffer} imagedata
 * @param {string} title
 * @param {string} url
 * @param {string} desc
 * @param {number} created_at
 */
export declare const uploadToGyazoDeviceId: (imagedata: Buffer, title?: string | undefined, url?: string | undefined, desc?: string | undefined, created_at?: number) => Promise<string | undefined>;
