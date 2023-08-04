import mongoose from "mongoose";

export const checkMongoID = (mongoId) => {
  return mongoose.Types.ObjectId.isValid(mongoId);
};
