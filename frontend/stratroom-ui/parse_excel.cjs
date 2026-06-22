const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/sibi/Desktop/poststratroom/Stratroom-Source/Stratroom-Source/import files';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.xlsx') && !f.startsWith('~$'));

for (const file of files) {
    console.log(`\n=== File: ${file} ===`);
    try {
        const workbook = XLSX.readFile(path.join(dir, file));
        for (const sheetName of workbook.SheetNames) {
            console.log(`  Sheet: ${sheetName}`);
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            if (data.length > 0) {
                console.log(`    Headers: ${JSON.stringify(data[0])}`);
                if (data.length > 1) {
                    console.log(`    Row 1: ${JSON.stringify(data[1])}`);
                }
            } else {
                console.log(`    (Empty Sheet)`);
            }
        }
    } catch (e) {
        console.error(`  Error reading file: ${e.message}`);
    }
}
