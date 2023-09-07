import { RouteError } from "@src/other/classes";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { parse, HTMLElement } from "node-html-parser";
import axios, { AxiosRequestConfig } from "axios";
import logger from "jet-logger";
import { IMetadata, MetadataKeys, OGKeys, TMetadataKey, TwitterKeys } from "@src/constants/metadata";

// **** Variables **** //

export const INVALID_URL_ERR = "Invalid URL";

// **** Functions **** //
const readMetadata = (el: HTMLElement, name: string) => {
    var prop = el.getAttribute("name") || el.getAttribute("property");
    return prop == name ? el.getAttribute("content") : null;
};

/**
 * Get metadata.
 */
async function getMetadata(url: string) {
    try {
        const config: AxiosRequestConfig = {
            headers: {
                "User-Agent": "WebCrawler",
            },
        };
        const { data } = await axios(url, config);

        const $ = parse(data);
        const og: IMetadata = {},
            twitter: IMetadata = {},
            meta: IMetadata = {};

        const title = $.querySelector("title");
        if (title) meta.title = title.text;

        const canonical = $.querySelector("link[rel=canonical]");
        if (canonical) {
            meta.url = canonical.getAttribute("href");
        }

        const metas = $.querySelectorAll("meta");

        for (let i = 0; i < metas.length; i++) {
            const el = metas[i];

            // const prop = el.getAttribute('property') || el.getAttribute('name');

            MetadataKeys.forEach((s) => {
                const val = readMetadata(el, s);
                if (val) meta[s as TMetadataKey] = val;
            });

            OGKeys.forEach((s) => {
                const val = readMetadata(el, s);
                const key = s.split(":")[1];
                if (val) og[key as TMetadataKey] = val;
            });

            TwitterKeys.forEach((s) => {
                const val = readMetadata(el, s);
                const key = s.split(":")[1];
                if (val) twitter[key as TMetadataKey] = val;
            });
        }

        return {
            meta,
            og,
            twitter,
        };
    } catch (err) {
        logger.err(err.message);
        throw new RouteError(
            HttpStatusCodes.INTERNAL_SERVER_ERROR,
            err.message || "Unexpected error, Please try again later."
        );
    }
}

export default {
    getMetadata,
} as const;
