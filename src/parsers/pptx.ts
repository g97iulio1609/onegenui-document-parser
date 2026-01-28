import { parseOfficeAsync } from "officeparser";

export async function parsePptx(buffer: Buffer): Promise<string> {
  try {
    // officeparser expects a file path or buffer
    const text = await parseOfficeAsync(buffer);
    return text;
  } catch (error) {
    console.error("Error parsing PPTX:", error);
    throw new Error("Failed to parse presentation");
  }
}
