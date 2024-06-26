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
exports.decodeAuthToken = void 0;
const firebase_1 = require("../services/firebase");
const auth_1 = require("../errors/auth");
/**
 * Decodes a Firebase token and returns the user info for the user who the token is for,
 * or throws an error if the token is invalid.
 */
function decodeAuthToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInfo = yield firebase_1.firebaseAuth.verifyIdToken(token);
            return userInfo;
        }
        catch (e) {
            throw auth_1.AuthError.DECODE_ERROR;
        }
    });
}
exports.decodeAuthToken = decodeAuthToken;
