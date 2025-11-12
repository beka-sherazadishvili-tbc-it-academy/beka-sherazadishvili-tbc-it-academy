import { isEmailFormValidator, isStringValidator } from "../../utils/validations.mjs";

class Meta {
  constructor(guardianName = null, email = null) {
    if (guardianName === undefined || email === undefined) {
      throw new Error('Meta requires exactly guardianName and email');
    }

    isStringValidator(guardianName, email);
    isEmailFormValidator(email);

    this.guardianName = guardianName;
    this.email = email;
  }
}

export { Meta }