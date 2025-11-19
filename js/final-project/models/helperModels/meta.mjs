import { isEmailFormValidator, isStringValidator } from "../../utils/validations.mjs";

class Meta {
  constructor(guardianName = null, email = null) {
    if (guardianName != null) {
      isStringValidator(guardianName);
    }
    if (email != null) {
      isStringValidator(email);
      isEmailFormValidator(email);
    }

    this.guardianName = guardianName;
    this.email = email;
  }
}

export { Meta }