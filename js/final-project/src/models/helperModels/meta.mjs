import { emailFormValidator, stringValidator } from "../../utils/validations.mjs";

class Meta {
  constructor(guardianName = null, email = null) {
    if (guardianName === undefined || email === undefined) {
      throw new Error('Meta requires exactly guardianName and email');
    }

    stringValidator(guardianName, email);
    emailFormValidator(email);

    this.guardianName = guardianName;
    this.email = email;
  }
}

export { Meta }