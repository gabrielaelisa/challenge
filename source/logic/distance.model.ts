import mongoose, { Schema } from "mongoose";
import { IDistance, IDistanceModel, IDistanceDocument } from "./distance.types";

const DistanceSchema = new Schema< IDistanceDocument, IDistanceModel, IDistance>({

    origin: { type: String, required: true},
    destination: {type: String, required: true},
    distance: { type: Number, required: true},
},
{ timestamps : true}
);

DistanceSchema.statics.getDocuments = async function(pageNumber:number) : Promise<IDistance[]>{
    return this.find().skip((pageNumber-1)*10).limit(10).exec();
}
const Distance = mongoose.model<IDistanceDocument, IDistanceModel>('Distance', DistanceSchema);

export default Distance