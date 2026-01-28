// src/parsers/pdf.ts
import pdf from "pdf-parse";
async function parsePdf(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF document");
  }
}

// src/parsers/docx.ts
import mammoth from "mammoth";
async function parseDocx(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    throw new Error("Failed to parse DOCX document");
  }
}

// src/parsers/xlsx.ts
import * as XLSX from "xlsx";
async function parseSpreadsheet(buffer) {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    let text = "";
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) return;
      const csv = XLSX.utils.sheet_to_csv(sheet);
      if (csv.trim()) {
        text += `
--- Sheet: ${sheetName} ---
${csv}
`;
      }
    });
    return text;
  } catch (error) {
    console.error("Error parsing spreadsheet:", error);
    throw new Error("Failed to parse spreadsheet");
  }
}

// src/parsers/pptx.ts
import { parseOfficeAsync } from "officeparser";
async function parsePptx(buffer) {
  try {
    const text = await parseOfficeAsync(buffer);
    return text;
  } catch (error) {
    console.error("Error parsing PPTX:", error);
    throw new Error("Failed to parse presentation");
  }
}

// src/parsers/image.ts
async function parseImage(buffer) {
  return buffer.toString("base64");
}

// src/index.ts
var SupportedMimeTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp"
];
async function parseDocument(buffer, mimeType) {
  switch (mimeType) {
    case "application/pdf":
      return {
        type: "document",
        content: await parsePdf(buffer),
        originalType: mimeType
      };
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/msword":
      return {
        type: "document",
        content: await parseDocx(buffer),
        originalType: mimeType
      };
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
    case "text/csv":
      return {
        type: "spreadsheet",
        content: await parseSpreadsheet(buffer),
        originalType: mimeType
      };
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.ms-powerpoint":
      return {
        type: "presentation",
        content: await parsePptx(buffer),
        originalType: mimeType
      };
    case "image/png":
    case "image/jpeg":
    case "image/gif":
    case "image/webp":
      return {
        type: "image",
        content: await parseImage(buffer),
        originalType: mimeType
      };
    default:
      throw new Error(`Unsupported MIME type: ${mimeType}`);
  }
}
export {
  SupportedMimeTypes,
  parseDocument
};
