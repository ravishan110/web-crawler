import { Router } from "express";

import Paths from "../constants/Paths";
import MetadataRoutes from "./MetadataRoutes";
import { IReq, IRes } from "./types/express/misc";

// **** Variables **** //

const apiRouter = Router();

// Add APIs, must be after middleware
apiRouter.get(Paths.HealthCheck, (req: IReq, res: IRes) => {
    res.json({ status: "ok" });
});

// All the subsequent routes will go here
// ** TODO: Add separate MetadataRouter ** //

apiRouter.post(Paths.GetMetadata, MetadataRoutes.getMetadata);

// **** Export default **** //

export default apiRouter;
