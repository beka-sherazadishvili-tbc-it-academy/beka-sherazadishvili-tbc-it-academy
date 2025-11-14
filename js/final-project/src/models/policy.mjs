class Policy {
  static #instance;

  #weightTolerance;
  #treatMissingAsZero;
  #lateAttendanceContribution;
  #minimumPassingLetter;
  #lateEnrollmentCutoff;
  #retakePolicy;
  #curve;
  #incompleteHandling;
  #rankingTiebreakers;

  constructor(properties = {}) {
    if (Policy.#instance) {
      return Policy.#instance;
    }

    this.#weightTolerance = 0.01;
    this.#treatMissingAsZero = false;
    this.#lateAttendanceContribution = 0.5;
    this.#minimumPassingLetter = "D-";
    this.#lateEnrollmentCutoff = 14;
    this.#retakePolicy = "latest";
    this.#curve = { type: "none" };
    this.#incompleteHandling = { expiresAfterDays: 14 };
    this.#rankingTiebreakers = [
      "GPA desc",
      "totalEarnedCredits desc",
      "lastName asc",
      "firstName asc",
      "id asc",
    ];

    Object.assign(this, properties);

    Policy.#instance = this;
  }

  get weightTolerance() {
    return this.#weightTolerance;
  }

  get treatMissingAsZero() {
    return this.#treatMissingAsZero;
  }

  get lateAttendanceContribution() {
    return this.#lateAttendanceContribution;
  }

  get minimumPassingLetter() {
    return this.#minimumPassingLetter;
  }

  get lateEnrollmentCutoff() {
    return this.#lateEnrollmentCutoff;
  }

  get retakePolicy() {
    return this.#retakePolicy;
  }

  get curve() {
    return this.#curve;
  }

  get incompleteHandling() {
    return this.#incompleteHandling;
  }

  get rankingTiebreakers() {
    return this.#rankingTiebreakers;
  }

  update(properties = {}) {
    for (const key in properties) {
      if (Object.hasOwn(this, `#${key}`)) {
        this[`#${key}`] = properties[key];
      }
    }
  }
}

export { Policy }
