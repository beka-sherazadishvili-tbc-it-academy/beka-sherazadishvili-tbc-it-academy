import { Policy } from "../models/policy.mjs";

class PolicyService {
  #policy;

  constructor() {
    this.#policy = new Policy(); 
  }

  updatePolicy(data) {
    try {
      this.#policy.update(data);
      return this.#policy;
    } catch (err) {
      return err.message;
    }
  }
}

export { PolicyService };
