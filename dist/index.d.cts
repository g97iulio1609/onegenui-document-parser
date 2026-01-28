type SupportedMimeType = "application/pdf" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/msword" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.ms-excel" | "text/csv" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "application/vnd.ms-powerpoint" | "image/png" | "image/jpeg" | "image/gif" | "image/webp";
interface ParsedDocument {
    type: "document" | "spreadsheet" | "presentation" | "image";
    content: string;
    originalType: string;
}
declare const SupportedMimeTypes: string[];
declare function parseDocument(buffer: Buffer, mimeType: string): Promise<ParsedDocument>;

export { type ParsedDocument, type SupportedMimeType, SupportedMimeTypes, parseDocument };
