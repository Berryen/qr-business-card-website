export const commonFields = [
  "salutation",
  "fullname",
  "email_address",
  "contact_number",
  "persona_type",
  "persona_type_others",
  "company_name"
];
export const aduanFields = ["fullname", "email_address", "contact_number"];
export const enquiryFields = [...commonFields];
export const jobApplicationFields = [
  "salutation",
  "fullname",
  "email_address",
  "contact_number"
];
export const techincalLibraryFields = [...commonFields];
export const chatbotFields = [...commonFields];
export const materialCalculationFields = [...commonFields];

export default {
  aduanFields,
  commonFields,
  chatbotFields,
  enquiryFields,
  techincalLibraryFields,
  materialCalculationFields
};
