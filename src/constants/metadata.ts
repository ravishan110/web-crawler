// Add keys below as needed
export interface IMetadata {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    site_name?: string;
}

export type TMetadataKey = keyof IMetadata;

// Add keys below to fetch that specific metadata
export const MetadataKeys = ["title", "description", "image", "author"];
export const OGKeys = ["og:title", "og:description", "og:image", "og:url", "og:site_name", "og:type", "og:author"];
export const TwitterKeys = [
    "twitter:title",
    "twitter:description",
    "twitter:image",
    "twitter:url",
    "twitter:site_name",
    "twitter:type",
    "twitter:author",
];
