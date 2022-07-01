const fs = require('fs');
const path = require('path');

//Path to the folder of databse folders
let PATH = "./test/"

const itemList = fs.readFileSync("./items", "utf8").split("\n");

let folders = fs.readdirSync(path.resolve(PATH));

let fileCount = 0;
let folderCount = 0;

folders.forEach(folder => {
    console.log(`Processing ${folder}`);
    let files = fs.readdirSync(path.resolve(PATH, folder));
    files.forEach(file => {
        let [name, ext] = file.split(".");
        if (ext !== "sfb") return
        let item = itemList.find(item => item.toLowerCase() === name.toLowerCase())
        if (!item || name.includes("RAINBOW")) return;
        let filePath = path.resolve(PATH, folder, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted ${filePath}`);
        fileCount++;
    })
    folderCount++;
})

console.log([
    `Done!`,
    `${fileCount} files deleted`,
    `${folderCount} folders processed`
].join("\n"));