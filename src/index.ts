import { parsePdf } from "./parsers/pdf.js";
import { parseDocx } from "./parsers/docx.js";
import { parseSpreadsheet } from "./parsers/xlsx.js";
import { parsePptx } from "./parsers/pptx.js";
import { parseImage } from "./parsers/image.js";

export type SupportedMimeType =
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" /* docx */
  | "application/msword" /* doc */
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /* xlsx */
  | "application/vnd.ms-excel" /* xls */
  | "text/csv"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation" /* pptx */
  | "application/vnd.ms-powerpoint" /* ppt */
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "image/webp";

export interface ParsedDocument {
  type: "document" | "spreadsheet" | "presentation" | "image";
  content: string; // Text content or base64 for images
  originalType: string;
}

export const SupportedMimeTypes: string[] = [
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
  "image/webp",
];

export async function parseDocument(
  buffer: Buffer,
  mimeType: string,
): Promise<ParsedDocument> {
  switch (mimeType) {
    case "application/pdf":
      return {
        type: "document",
        content: await parsePdf(buffer),
        originalType: mimeType,
      };

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/msword":
      return {
        type: "document",
        content: await parseDocx(buffer),
        originalType: mimeType,
      };

    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
    case "text/csv":
      return {
        type: "spreadsheet",
        content: await parseSpreadsheet(buffer),
        originalType: mimeType,
      };

    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.ms-powerpoint":
      return {
        type: "presentation",
        content: await parsePptx(buffer),
        originalType: mimeType,
      };

    case "image/png":
    case "image/jpeg":
    case "image/gif":
    case "image/webp":
      return {
        type: "image",
        content: await parseImage(buffer),
        originalType: mimeType,
      };

    default:
      throw new Error(`Unsupported MIME type: ${mimeType}`);
  }
}
