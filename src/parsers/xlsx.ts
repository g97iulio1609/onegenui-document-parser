import * as XLSX from "xlsx";

export async function parseSpreadsheet(buffer: Buffer): Promise<string> {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    let text = "";

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) return;
      const csv = XLSX.utils.sheet_to_csv(sheet);
      if (csv.trim()) {
        text += `\n--- Sheet: ${sheetName} ---\n${csv}\n`;
      }
    });

    return text;
  } catch (error) {
    console.error("Error parsing spreadsheet:", error);
    throw new Error("Failed to parse spreadsheet");
  }
}
