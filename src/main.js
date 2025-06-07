"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("./styles/index.scss");
var TodoListPage_jsx_1 = require("./pages/TodoListPage/TodoListPage.jsx");
(0, client_1.createRoot)(document.getElementById('root')).render(<react_1.StrictMode>
    <TodoListPage_jsx_1.default />
  </react_1.StrictMode>);
