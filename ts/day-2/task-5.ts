type Maybe<T> =
  | { kind: "some"; value: T }
  | { kind: "none" };

function isSome<T>(input: Maybe<T>) {
  return input.kind === "some";
}

function mapMaybe<T, U>(input: Maybe<T>, fn: (value: T) => U): Maybe<U> {
  if (input.kind === "none") {
    return input;
  }

  return { kind: "some", value: fn(input.value) };
}

function flatMapMaybe<T, U>(
  input: Maybe<T>,
  fn: (value: T) => Maybe<U>
): Maybe<U> {
  if (input.kind === "none") {
    return input;
  }

  return fn(input.value);
}

function getOrElse<T>(input: Maybe<T>, fallback: T): T {
  if (input.kind === "none") {
    return fallback;
  }

  return input.value;
}