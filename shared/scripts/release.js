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
var _this = this;
var _a = require('fs'), readFileSync = _a.readFileSync, writeFileSync = _a.writeFileSync;
var simpleGit = require('simple-git/promise');
var inquirer = require('inquirer');
var semver = require('semver');
var execSync = require('child_process').execSync;
var rootDir = __dirname + '/../../';
var git = simpleGit(rootDir);
var SEMVER_INCREMENTS = [
    { value: 'patch', name: 'Patch: bugfixes only' },
    { value: 'minor', name: 'Minor: new features + bugfixes(optional)' },
    { value: 'major', name: 'Major: epic release with additional description' },
    { value: 'custom', name: 'Custom: Specify version manually' },
];
var run = function () { return __awaiter(_this, void 0, void 0, function () {
    var level, version;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkIsOnMaster()];
            case 1:
                _a.sent();
                return [4 /*yield*/, checkWorkingTreeIsClean()];
            case 2:
                _a.sent();
                return [4 /*yield*/, getReleaseLevel()];
            case 3:
                level = _a.sent();
                return [4 /*yield*/, getVersion(level)];
            case 4:
                version = _a.sent();
                return [4 /*yield*/, updatePackageVersion(version)];
            case 5:
                _a.sent();
                return [4 /*yield*/, generateChangelog(version)];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var checkIsOnMaster = function () { return __awaiter(_this, void 0, void 0, function () {
    var branch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, git.status()];
            case 1:
                branch = (_a.sent()).current;
                if (branch === 'master') {
                    return [2 /*return*/, true];
                }
                else {
                    console.error("Your current branch is \"" + branch + "\". Release is allowed from master branch only.");
                    process.exit(1);
                }
                return [2 /*return*/];
        }
    });
}); };
var checkWorkingTreeIsClean = function () { return __awaiter(_this, void 0, void 0, function () {
    var files;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, git.status()];
            case 1:
                files = (_a.sent()).files;
                if (files && files.length > 0) {
                    console.error('Unclean working tree. Commit or stash changes first');
                    process.exit(1);
                }
                return [2 /*return*/];
        }
    });
}); };
var getReleaseLevel = function () { return __awaiter(_this, void 0, void 0, function () {
    var level;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer.prompt([
                    {
                        type: 'list',
                        name: 'releaseLevel',
                        message: "Please select release Level",
                        choices: SEMVER_INCREMENTS
                    },
                ])];
            case 1:
                level = (_a.sent()).releaseLevel;
                return [2 /*return*/, level];
        }
    });
}); };
var getVersion = function (releaseLevel) { return __awaiter(_this, void 0, void 0, function () {
    var oldVersion, version;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                oldVersion = JSON.parse(readFileSync(rootDir + 'package.json')).version;
                if (!(releaseLevel !== 'custom')) return [3 /*break*/, 1];
                return [2 /*return*/, semver.inc(oldVersion, releaseLevel)];
            case 1: return [4 /*yield*/, inquirer.prompt([
                    {
                        type: 'input',
                        name: 'version',
                        message: "Version",
                        validate: function (input) {
                            if (!Boolean(semver.valid(input))) {
                                return 'Please specify a valid semver, for example, `1.2.3`. See http://semver.org';
                            }
                            return true;
                        }
                    },
                ])];
            case 2:
                version = (_a.sent()).version;
                return [2 /*return*/, version];
        }
    });
}); };
var updatePackageVersion = function (version) { return __awaiter(_this, void 0, void 0, function () {
    var packageJson, packageLockJson;
    return __generator(this, function (_a) {
        packageJson = JSON.parse(readFileSync(rootDir + 'package.json', 'utf8'));
        packageJson.version = version;
        writeFileSync(rootDir + 'package.json', JSON.stringify(packageJson, null, 2) + '\n');
        packageLockJson = JSON.parse(readFileSync(rootDir + 'package-lock.json', 'utf8'));
        packageLockJson.version = version;
        writeFileSync(rootDir + 'package-lock.json', JSON.stringify(packageLockJson, null, 2) + '\n');
        return [2 /*return*/];
    });
}); };
var generateChangelog = function (version) { return __awaiter(_this, void 0, void 0, function () {
    var changelog, jsonChangelog;
    return __generator(this, function (_a) {
        changelog = execSync("conventional-changelog -p angular -i CHANGELOG.md -r 1");
        writeFileSync(rootDir + 'CHANGELOG.md', changelog);
        jsonChangelog = JSON.parse(readFileSync(rootDir + 'CHANGELOG.json').toString());
        jsonChangelog[version] = execSync("conventional-changelog -p angular -r 1").toString();
        writeFileSync(rootDir + 'CHANGELOG.json', JSON.stringify(jsonChangelog));
        return [2 /*return*/, changelog];
    });
}); };
var commitAndTag = function (version) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, git.add([rootDir + 'package.json', rootDir + 'package-lock.json', rootDir + 'CHANGELOG.md'])];
            case 1:
                _a.sent();
                return [4 /*yield*/, git.commit(version)];
            case 2:
                _a.sent();
                return [4 /*yield*/, git.addTag(version)];
            case 3:
                _a.sent();
                return [4 /*yield*/, git.push('origin', 'master')];
            case 4:
                _a.sent();
                return [4 /*yield*/, git.pushTags('origin')];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
run();
