"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_validation_1 = __importDefault(require("../middlewares/auth_validation"));
const router = express_1.default.Router();
router.post('/sign_up', auth_controllers_1.addUser);
router.post('/login', auth_controllers_1.login);
router.post('/logout', auth_controllers_1.logout);
router.get('/validation', auth_validation_1.default, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
exports.default = router;
