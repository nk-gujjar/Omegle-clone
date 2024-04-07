"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.tsx
const react_1 = __importStar(require("react"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const socket = (0, socket_io_client_1.default)('http://localhost:3001'); // Assuming server is running on port 3001
const App = () => {
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [input, setInput] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, [messages]);
    const sendMessage = () => {
        socket.emit('message', input);
        setInput('');
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, messages.map((message, index) => (react_1.default.createElement("div", { key: index }, message)))),
        react_1.default.createElement("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value) }),
        react_1.default.createElement("button", { onClick: sendMessage }, "Send")));
};
exports.default = App;
