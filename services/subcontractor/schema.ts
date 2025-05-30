import * as yup from "yup";

export const rejectSubContractorSchema = yup.object().shape({
  reason: yup.string().required("Please enter your reason"),
});

export type RejectSubContractorPayload = yup.InferType<
  typeof rejectSubContractorSchema
>;
