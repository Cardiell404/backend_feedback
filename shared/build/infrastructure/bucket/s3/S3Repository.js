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
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Repository = void 0;
class S3Repository {
    constructor(_client) {
        this._client = _client;
    }
    client() {
        return this._client;
    }
    upload(image, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const type = image.split(';')[0].split('/')[1];
            yield this._client.upload({
                Bucket: this.bucketName,
                Key: key,
                Body: base64Data,
                ContentEncoding: 'base64',
                ContentType: `image/${type}`
            }).promise();
            return key;
        });
    }
    getObject(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield this._client.getObject({ Bucket: this.bucketName, Key: key }).promise();
                if (file.Body) {
                    return `data:${file.ContentType};base64,${Buffer.from(file.Body).toString("base64")}`;
                }
            }
            catch (err) {
                console.log("Error", err);
            }
        });
    }
}
exports.S3Repository = S3Repository;
