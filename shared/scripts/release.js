var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { readFileSync, writeFileSync } = require('fs');
const simpleGit = require('simple-git/promise');
const inquirer = require('inquirer');
const semver = require('semver');
const execSync = require('child_process').execSync;
const rootDir = __dirname + '/../../';
const git = simpleGit(rootDir);
const SEMVER_INCREMENTS = [
    { value: 'patch', name: 'Patch: bugfixes only' },
    { value: 'minor', name: 'Minor: new features + bugfixes(optional)' },
    { value: 'major', name: 'Major: epic release with additional description' },
    { value: 'custom', name: 'Custom: Specify version manually' },
];
const run = () => __awaiter(this, void 0, void 0, function* () {
    yield checkIsOnMaster();
    yield checkWorkingTreeIsClean();
    const level = yield getReleaseLevel();
    const version = yield getVersion(level);
    yield updatePackageVersion(version);
    yield generateChangelog();
    yield commitAndTag(version);
});
const checkIsOnMaster = () => __awaiter(this, void 0, void 0, function* () {
    const branch = (yield git.status()).current;
    if (branch === 'master') {
        return true;
    }
    else {
        console.error(`Your current branch is "${branch}". Release is allowed from master branch only.`);
        process.exit(1);
    }
});
const checkWorkingTreeIsClean = () => __awaiter(this, void 0, void 0, function* () {
    const files = (yield git.status()).files;
    if (files && files.length > 0) {
        console.error('Unclean working tree. Commit or stash changes first');
        process.exit(1);
    }
});
const getReleaseLevel = () => __awaiter(this, void 0, void 0, function* () {
    const level = (yield inquirer.prompt([
        {
            type: 'list',
            name: 'releaseLevel',
            message: `Please select release Level`,
            choices: SEMVER_INCREMENTS,
        },
    ])).releaseLevel;
    return level;
});
const getVersion = (releaseLevel) => __awaiter(this, void 0, void 0, function* () {
    const oldVersion = JSON.parse(readFileSync(rootDir + 'package.json')).version;
    if (releaseLevel !== 'custom') {
        return semver.inc(oldVersion, releaseLevel);
    }
    else {
        const version = (yield inquirer.prompt([
            {
                type: 'input',
                name: 'version',
                message: `Version`,
                validate: (input) => {
                    if (!Boolean(semver.valid(input))) {
                        return 'Please specify a valid semver, for example, `1.2.3`. See http://semver.org';
                    }
                    return true;
                },
            },
        ])).version;
        return version;
    }
});
const updatePackageVersion = (version) => __awaiter(this, void 0, void 0, function* () {
    const packageJson = JSON.parse(readFileSync(rootDir + 'package.json', 'utf8'));
    packageJson.version = version;
    writeFileSync(rootDir + 'package.json', JSON.stringify(packageJson, null, 2) + '\n');
    const packageLockJson = JSON.parse(readFileSync(rootDir + 'package-lock.json', 'utf8'));
    packageLockJson.version = version;
    writeFileSync(rootDir + 'package-lock.json', JSON.stringify(packageLockJson, null, 2) + '\n');
});
const generateChangelog = () => __awaiter(this, void 0, void 0, function* () {
    const changelog = execSync(`conventional-changelog -p angular -i CHANGELOG.md -r 1`);
    writeFileSync(rootDir + 'CHANGELOG.md', changelog);
    return changelog;
});
const commitAndTag = (version) => __awaiter(this, void 0, void 0, function* () {
    yield git.add([rootDir + 'package.json', rootDir + 'package-lock.json', rootDir + 'CHANGELOG.md']);
    yield git.commit(version);
    yield git.addTag(version);
    yield git.push('origin', 'master');
    yield git.pushTags('origin');
});
run();
//# sourceMappingURL=release.js.map