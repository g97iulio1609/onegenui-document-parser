# AGENTS.md - @onegenui/document-parser

Document parsing utilities for OneGenUI. Extracts text and structure from various file formats.

## Purpose

This package provides:
- **PDF Parsing**: Extract text from PDF files
- **DOCX Parsing**: Extract text from Word documents
- **Excel Parsing**: Extract data from spreadsheets
- **Office Parsing**: General Office document support

## File Structure

```
src/
├── index.ts              # Public exports
├── pdf-parser.ts         # PDF extraction
├── docx-parser.ts        # Word document extraction
├── xlsx-parser.ts        # Excel extraction
└── office-parser.ts      # Generic Office support
```

## Key Exports

```typescript
export { parsePDF } from './pdf-parser';
export { parseDOCX } from './docx-parser';
export { parseXLSX } from './xlsx-parser';
export { parseDocument } from './office-parser';
export type { ParsedDocument, ParseOptions } from './types';
```

## Development Guidelines

- Handle large files efficiently (streaming when possible)
- Preserve document structure (headings, paragraphs, tables)
- Support multiple file encodings
- Provide progress callbacks for large files
- Handle corrupt/malformed files gracefully

## Testing

```bash
pnpm --filter @onegenui/document-parser build
```

## Dependencies

- `mammoth` ^1.6.0 (DOCX parsing)
- `pdf-parse` ^1.1.1 (PDF parsing)
- `xlsx` ^0.18.5 (Excel parsing)
- `officeparser` ^4.1.1 (General Office support)
