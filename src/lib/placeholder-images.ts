import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

/**
 * Safely export the placeholder images, ensuring it's always an array.
 */
export const PlaceHolderImages: ImagePlaceholder[] = data?.placeholderImages || [];
