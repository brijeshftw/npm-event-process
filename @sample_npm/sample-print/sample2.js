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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.KafkaProvider = void 0;
var kafkajs_1 = require("kafkajs");
var KafkaProvider = /** @class */ (function () {
    function KafkaProvider(kafkaConfig) {
        this.kafkaConfig = kafkaConfig;
        this.brokers = [];
        this.clientId = kafkaConfig.clientId;
        this.brokers = kafkaConfig.brokers;
        this.ssl = kafkaConfig.ssl;
        this.retry = kafkaConfig.retry;
        this.requestTimeout = kafkaConfig.requestTimeout;
        this.kafka = kafkaConfig.kafka;
        this.consumer = kafkaConfig.consumer;
        this.producer = kafkaConfig.producer;
        this.topic = kafkaConfig.topic;
        this.fromBeginning = kafkaConfig.fromBeginning;
        this.groupId = kafkaConfig.groupId;
        this.username = kafkaConfig.username;
        this.password = kafkaConfig.password;
    }
    KafkaProvider.prototype.createKafkaInstance = function () {
        this.kafka = new kafkajs_1.Kafka({
            clientId: this.clientId,
            brokers: this.brokers,
            sasl: {
                mechanism: 'scram-sha-256',
                username: this.username,
                password: this.password
            },
            retry: {
                initialRetryTime: 100,
                retries: 10
            },
            requestTimeout: 120000
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: this.groupId });
    };
    KafkaProvider.prototype.saveProducer = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var mainData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.data.nodeProduceTime = new Date().toISOString();
                        mainData = [{ value: JSON.stringify(data) }];
                        return [4 /*yield*/, this.producer.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.producer.send({
                                topic: this.topic,
                                messages: mainData
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    KafkaProvider.prototype.getConsumer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consumer.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.consumer.subscribe({
                                topic: this.topic,
                                fromBeginning: false
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.consumer.run({
                                eachMessage: function (_a) {
                                    var message = _a.message;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var mainData;
                                        return __generator(this, function (_b) {
                                            mainData = JSON.parse(message.value.toString());
                                            return [2 /*return*/];
                                        });
                                    });
                                }
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return KafkaProvider;
}());
exports.KafkaProvider = KafkaProvider;
