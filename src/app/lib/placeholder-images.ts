import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

/**
 * Safely export the placeholder images, ensuring it's always an array even if the JSON 
 * import behaves unexpectedly during server-side rendering.
 */
export const PlaceHolderImages: ImagePlaceholder[] = data?.placeholderImages || [];
