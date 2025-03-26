import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

// Function to replace "export" with "declare" in a file
async function replaceExportWithDeclare(filePath) {
    try {
        const absolutePath = resolve(filePath);
        let data = await readFile(absolutePath, "utf8");

        // Replace "export" with "declare"
        const updatedData = data.replace(/\bexport\b/g, "declare");

        await writeFile(absolutePath, updatedData, "utf8");
        console.log("File updated successfully:", absolutePath);
    } catch (error) {
        console.error("Error processing file:", error);
    }
}

// Get the file path from command-line arguments
const filePath = process.argv[2];
if (!filePath) {
    console.error("Please provide a file path.");
    process.exit(1);
}

// Run the function
replaceExportWithDeclare(filePath);