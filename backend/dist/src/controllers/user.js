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
exports.getWhoAmI = void 0;
const user_1 = __importDefault(require("../models/user"));
/**
 * Retrieves data about the current user (their MongoDB ID, Firebase UID, and role).
 * Requires the user to be signed in.
 */
const getWhoAmI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userUid } = req;
        const user = yield user_1.default.findOne({ uid: userUid });
        const { _id, uid, role } = user;
        res.status(200).send({
            _id,
            uid,
            role,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getWhoAmI = getWhoAmI;
