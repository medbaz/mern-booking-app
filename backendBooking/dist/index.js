"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
// ROUTES
const user_routs_1 = __importDefault(require("./routs/user.routs"));
const auth_routs_1 = __importDefault(require("./routs/auth.routs"));
const hotels_routs_1 = __importDefault(require("./routs/hotels.routs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontendBooking/dist')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontendBooking/dist'));
});
app.use('/api/users', user_routs_1.default);
app.use('/api/auth', auth_routs_1.default);
app.use('/api/myHotels', hotels_routs_1.default);
mongoose_1.default.connect(process.env.DB_CONNECTION_SETUP).then(() => {
    console.log("connected", process.env.DB_CONNECTION_SETUP);
    app.listen(PORT);
}).catch(() => {
    console.log("not connected to te DB");
});
