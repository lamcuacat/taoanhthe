
/**
 * Converts a File object or a data URL string to a Base64 encoded string.
 * @param file The File object or data URL string to convert.
 * @param stripPrefix If true, removes the "data:mime/type;base64," prefix.
 * @returns A promise that resolves to the Base64 string or an object with details.
 */
export function fileToBase64(file: File | string): Promise<string>;
export function fileToBase64(file: File | string, getDetails: true): Promise<{ base64: string; mimeType: string }>;
export function fileToBase64(
    file: File | string,
    getDetails?: boolean
): Promise<string | { base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    if (typeof file === 'string') {
      const parts = file.split(',');
      if (parts.length !== 2) {
        reject(new Error("Invalid data URL string"));
        return;
      }
      const mimePart = parts[0].match(/:(.*?);/);
      if (!mimePart || mimePart.length < 2) {
        reject(new Error("Could not extract MIME type from data URL"));
        return;
      }
      const mimeType = mimePart[1];
      const base64 = parts[1];
      
      if (getDetails) {
        resolve({ base64, mimeType });
      } else {
        resolve(file); // Return the full data URL if details are not requested
      }
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      if (getDetails) {
        const parts = result.split(',');
        const base64 = parts[1];
        resolve({ base64, mimeType: file.type });
      } else {
        resolve(result);
      }
    };
    reader.onerror = error => reject(error);
  });
}
