'use strict'

const base = { profile: { name: "Ana", age: 22 } };
const update = { profile: { age: 23 } };

const merged = {
  ...base,
  profile: {
    ...base.profile,
    ...update.profile
  }
};
