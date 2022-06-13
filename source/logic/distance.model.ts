import mongoose, { Schema } from "mongoose";
import { IDistance, IDistanceModel, IDistanceDocument } from "./distance.types";

const DistanceSchema = new Schema< IDistanceDocument, IDistanceModel, IDistance>({

    origin: { type: String, required: true},
    destination: {type: String, required: true},
    distance: { type: Number, required: true},
}
,);

const Distance = mongoose.model<IDistanceDocument, IDistanceModel>('Distance', DistanceSchema);

export default Distance