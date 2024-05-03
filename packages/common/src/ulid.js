"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
var ulid_workers_1 = require("ulid-workers");
var ulid = (0, ulid_workers_1.ulidFactory)();
function generateId() {
    return ulid();
}
exports.generateId = generateId;
