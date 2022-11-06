type ZipType = "image/jpeg" | "image/webp";

export default async function zipimage(
  file: File,
  level: number = 1
): Promise<File> {
  const url = blobToObjectURL(file);
  const base64 = await canvasZip(url, level, getZipType(file.type));
  clearObjectURL(url);
  const binary = base64ToBinary(base64);
  const u8Arr = binaryToU8Arr(binary);
  const blob = u8ArrToBlob(u8Arr);
  return file.size > blob.size
    ? new File([blob], file.name, { type: file.type })
    : file;
}

function getZipType(type: string): ZipType {
  return type == "image/png" ? "image/webp" : "image/jpeg";
}

function base64ToBinary(base64: string): string {
  const [_, str] = base64.split(",");
  return window.atob(str);
}

function binaryToU8Arr(binary: string): Uint8Array {
  return new Uint8Array(Array.from(binary).map((item) => item.charCodeAt(0)));
}

function u8ArrToBlob(u8Arr: Uint8Array): Blob {
  return new Blob([u8Arr]);
}

function clearObjectURL(URL: string): void {
  window.URL.revokeObjectURL(URL);
}

function blobToObjectURL(blob: Blob): string {
  return window.URL.createObjectURL(blob);
}

function arrayBufferToU8Array(arrayBuffer: ArrayBuffer) {
  return new Uint8Array(arrayBuffer);
}

function loadCanvas(image, level) {
  const { width, height } = image;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width * level, height * level);
  return canvas;
}

async function canvasZip(src: string, level: number = 1, type) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const image = await loadImage(src);
  const { width, height } = image;
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);
  try {
    return canvas.toDataURL(type, level);
  } finally {
    canvas.remove();
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res) => {
    const image = document.createElement("img");
    image.src = src;
    image.onload = () => {
      res(image);
      image.remove();
    };
  });
}
