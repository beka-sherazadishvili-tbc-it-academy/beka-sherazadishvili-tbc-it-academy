'use strict'

const premium = true;
const user = { name: "Ana" };

const result = {
  ...user,
  ...(premium ? { role: "premium" }: {})
};
