"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  SupportedMimeTypes: () => SupportedMimeTypes,
  parseDocument: () => parseDocument
});
module.exports = __toCommonJS(index_exports);

// src/parsers/pdf.ts
var import_pdf_parse = __toESM(require("pdf-parse"), 1);
async function parsePdf(buffer) {
  try {
    const data = await (0, import_pdf_parse.default)(buffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF document");
  }
}

// src/parsers/docx.ts
var import_mammoth = __toESM(require("mammoth"), 1);
async function parseDocx(buffer) {
  try {
    const result = await import_mammoth.default.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    throw new Error("Failed to parse DOCX document");
  }
}

// src/parsers/xlsx.ts
var XLSX = __toESM(require("xlsx"), 1);
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
var import_officeparser = require("officeparser");
async function parsePptx(buffer) {
  try {
    const text = await (0, import_officeparser.parseOfficeAsync)(buffer);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SupportedMimeTypes,
  parseDocument
});
