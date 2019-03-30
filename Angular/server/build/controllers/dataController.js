"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class dataController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('SELECT * FROM coord ORDER BY id DESC LIMIT 1');
            res.json(data);
        });
    }
    dates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const date1 = req.body.date1;
            const hour1 = req.body.hour1;
            const date2 = req.body.date2;
            const hour2 = req.body.hour2;
            const type = "SELECT * FROM coord WHERE fecha >= '" + date1 + " " + hour1 + "' AND fecha <= '" + date2 + " " + hour2 + "'";
            const data = yield database_1.default.query(type);
            res.json(data);
        });
    }
}
exports.datacontroller = new dataController();
