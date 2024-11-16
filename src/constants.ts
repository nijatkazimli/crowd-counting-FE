export const MEDIA_TYPES = {
  VIDEO: "VIDEO",
  IMAGE: "IMAGE",
} as const;

export type Media = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES];
