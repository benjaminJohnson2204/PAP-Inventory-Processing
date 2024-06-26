import { InferSchemaType, Schema, model } from "mongoose";

/**
 * A schema for a single furniture item that a veteran can request
 */
export const furntitureInputSchema = new Schema({
  // ID of the furniture item being required (Object ID for an instance of the furniture item model)
  furnitureItemId: { type: String, required: true },

  // Quantity being requested by this veteran
  quantity: { type: Number, required: true },
});

/**
 * A model for a VSR (veteran service request), submitted by a veteran to request
 * furniture items from PAP.
 */
const vsrSchema = new Schema({
  /** Page 1 of VSR */
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  maritalStatus: { type: String, required: true },
  spouseName: { type: String },
  agesOfBoys: { type: [Number] },
  agesOfGirls: { type: [Number] },
  ethnicity: { type: [String], required: true },
  employmentStatus: { type: String, required: true },
  incomeLevel: { type: String, required: true },
  sizeOfHome: { type: String, required: true },

  /** Page 2 of VSR */
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  branch: { type: [String], required: true },
  conflicts: { type: [String], required: true },
  dischargeStatus: { type: String, required: true },
  serviceConnected: { type: Boolean, required: true },
  lastRank: { type: String, required: true },
  militaryID: { type: Number, required: true },
  petCompanion: { type: Boolean, required: true },
  hearFrom: { type: String, required: true },

  /** Page 3 of VSR */
  selectedFurnitureItems: { type: [furntitureInputSchema], required: true },
  additionalItems: { type: String, required: false },

  /** Fields that are created/updated automatically or on staff side */
  dateReceived: { type: Date, required: true },
  lastUpdated: { type: Date, required: true },
  status: { type: String, required: true },
});

export type FurnitureInput = InferSchemaType<typeof furntitureInputSchema>;
export type VSR = InferSchemaType<typeof vsrSchema>;

vsrSchema.index({ name: "text" });

export default model<VSR>("VSR", vsrSchema);
