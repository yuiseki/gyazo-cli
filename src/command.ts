import { promises as fs } from "fs";
import yargs from "yargs/yargs";
import { uploadToGyazoDeviceId } from ".";

const argv = yargs(process.argv.slice(2))
  .option("stdin", {
    alias: "i",
    description: "Read image data from stdin",
    type: "boolean",
  })
  .help()
  .parseSync();

const main = async () => {
  if (argv.stdin) {
    const buffers = [];
    for await (const chunk of process.stdin) buffers.push(chunk);
    const buffer = Buffer.concat(buffers);
    const result = await uploadToGyazoDeviceId(buffer);
    console.log(result);
  } else {
    for await (const filepath of argv._) {
      if (typeof filepath === "string") {
        const file = await fs.readFile(filepath);
        const result = await uploadToGyazoDeviceId(file);
        console.log(result);
      }
    }
  }
};

(async () => {
  try {
    await main();
  } catch (err) {
    console.error(err);
  }
})();
