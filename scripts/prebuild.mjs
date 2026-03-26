import { exec as _exec } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(_exec);

async function runCommand(cmd) {
  try {
    const { stdout, stderr } = await exec(cmd);
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    return true;
  } catch (err) {
    return false;
  }
}

async function main() {
  console.log("prebuild: generating thumbnails");
  await runCommand("node scripts/generate-thumbs.mjs");

  console.log("prebuild: checking for git-lfs");
  const hasLfs = await runCommand("git lfs version");
  if (!hasLfs) {
    console.warn("prebuild: git-lfs not available — skipping git lfs pull");
    return;
  }

  console.log("prebuild: running git lfs pull (this may require credentials)");
  const pulled = await runCommand("git lfs pull");
  if (!pulled) {
    console.warn("prebuild: git lfs pull failed — continuing without LFS pull");
  } else {
    await runCommand("git lfs checkout");
  }
}

main().catch((err) => {
  console.error("prebuild: unexpected error", err);
  // Do not fail the build — prebuild should be best-effort on CI
  process.exit(0);
});
