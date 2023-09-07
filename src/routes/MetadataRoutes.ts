import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import MetadataService from "@src/services/MetadataService";
import { IReq, IRes, INext } from "./types/express/misc";
import { RouteError } from "@src/other/classes";

type getMetadataReqType = {
    url: string;
};

// **** Functions **** //

/**
 * Get metadata.
 */
async function getMetadata(req: IReq<getMetadataReqType>, res: IRes, next: INext) {
    try {
        const { url } = req.body;
        if (!/(^http(s?):\/\/[^\s$.?#].[^\s]*)/i.test(url)) {
            next(new RouteError(HttpStatusCodes.BAD_REQUEST, "Invalid URL"));
        }

        const metadata = await MetadataService.getMetadata(url);
        return res.status(HttpStatusCodes.OK).json(metadata);
    } catch (err) {
        next(err);
    }
}

// *** Export default **** //

export default {
    getMetadata,
} as const;
