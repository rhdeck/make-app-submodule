#!/usr/bin/env node
const cwd = process.cwd();
const Path = require("path");
const msm = require("manage-submodules");
const fs = require("fs");
const packagePath = Path.resolve(cwd, "package.json");
if (!fs.existsSync(packagePath)) {
  console.log("No package in current path");
  process.exit();
}
const package = require(packagePath);
if (!(package.makeApp && package.makeApp.submodules)) {
  console.log("No submodules in current path");
  process.exit();
}
Object.keys(package.makeApp.submodules).forEach(k => {
  const v = package.makeApp.submodules[k];
  if (typeof v == "string") {
    msm.add(k, v);
  } else {
    const url = v.url;
    const branch = v.branch;
    const version = v.version;
    msm.add(k, v, branch, version);
  }
});
