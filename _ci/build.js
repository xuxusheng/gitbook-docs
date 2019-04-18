const fs = require("fs");
const { join } = require("path");
const { exec, exit, echo } = require("shelljs");

const entry = join(__dirname, "../src");
const out = join(__dirname, "../dist");

// 遍历 src 目录下文件夹
const list = fs.readdirSync(entry);

list.forEach(fileName => {
  const stats = fs.statSync(join(entry, fileName));

  if (stats.isDirectory()) {
    // 编译
    echo(`开始编译 ${fileName} 目录`);
    const r = exec(
      `gitbook build ${join(entry, fileName)} ${join(out, fileName)} `
    );

    if (r.code !== 0) {
      echo(`gitbook build error：${r.stderr}`);
      exit(1);
    }
  }
});

echo(`gitbook build success!`);
