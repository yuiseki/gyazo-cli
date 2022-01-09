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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yargs_1 = __importDefault(require("yargs/yargs"));
const _1 = require(".");
const argv = (0, yargs_1.default)(process.argv.slice(2))
    .option("stdin", {
    alias: "i",
    description: "Read image data from stdin",
    type: "boolean",
})
    .help()
    .parseSync();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a, e_2, _b;
    let result = undefined;
    if (argv.stdin) {
        const buffers = [];
        try {
            for (var _c = __asyncValues(process.stdin), _d; _d = yield _c.next(), !_d.done;) {
                const chunk = _d.value;
                buffers.push(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) yield _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const buffer = Buffer.concat(buffers);
        result = yield (0, _1.uploadToGyazoDeviceId)(buffer);
    }
    else {
        try {
            for (var _e = __asyncValues(argv._), _f; _f = yield _e.next(), !_f.done;) {
                const filepath = _f.value;
                if (typeof filepath === "string") {
                    const file = yield fs_1.promises.readFile(filepath);
                    result = yield (0, _1.uploadToGyazoDeviceId)(file);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    console.log(result);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield main();
    }
    catch (err) {
        console.error(err);
    }
}))();
