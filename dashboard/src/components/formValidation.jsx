export const validateForm = (formData, validationRules) => {
  let errors = {};

  // Iterate over the fields in the formData object
  for (let fieldName in formData) {
    if (formData.hasOwnProperty(fieldName)) {
      const fieldValue = formData[fieldName];

      // Check if a validation rule exists for the field
      if (validationRules.hasOwnProperty(fieldName)) {
        const rules = validationRules[fieldName];

        // Apply the validation rules to the field value
        for (let rule in rules) {
          if (rules.hasOwnProperty(rule)) {
            if (rule === "required" && rules[rule] && !fieldValue) {
              errors[fieldName] = `${fieldName} is required`;
            }
            // Add more validation rules as needed
          }
        }
      }
    }
  }

  return errors;
};
