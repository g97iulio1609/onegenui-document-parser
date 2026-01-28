export async function parseImage(buffer: Buffer): Promise<string> {
  // For images, we return the base64 string directly
  // The consumer (API route) needs to handle this appropriate for the LLM
  return buffer.toString("base64");
}
