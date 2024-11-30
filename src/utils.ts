import { Media, MEDIA_TYPES } from "./constants";

const videoExtensions = [
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".mkv",
  ".webm",
  ".m4v",
  ".mpg",
  ".mpeg",
  ".3gp",
  ".3g2",
  ".m2ts",
  ".ts",
  ".ogv",
];
const imageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".tiff",
  ".svg",
  ".webp",
  ".ico",
  ".heic",
  ".heif",
  ".raw",
  ".ppm",
  ".pgm",
  ".pbm",
  ".pnm",
];

export function getFileTypeFromExtension(url: string): Media | "UNKNOWN" {
  const extension = url.split(".").pop()!.toLowerCase();
  if (videoExtensions.includes(`.${extension}`)) {
    return MEDIA_TYPES.VIDEO;
  } else if (imageExtensions.includes(`.${extension}`)) {
    return MEDIA_TYPES.IMAGE;
  } else {
    return "UNKNOWN";
  }
}

export function truncateUrl(url: string) {
  if (url.length <= 29) return url;
  const start = url.slice(0, 20);
  const end = url.slice(-8);
  return `${start}...${end}`;
}

export function roundNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return "";
  const strNum = num.toString();
  const decimalIndex = strNum.indexOf(".");
  if (decimalIndex === -1) return strNum;
  return strNum.slice(0, decimalIndex + 3);
}
