class PairZip<A, B> {
  private pairs: [A, B][];

  constructor(pairs: [A, B][]) {
    this.pairs = pairs;
  }

  static fromArrays<A, B>(left: A[], right: B[]): PairZip<A, B> {
    if (left.length !== right.length) {
      throw new Error("length not equal");
    }

    let newArr = left.map((value, i) => [value, right[i]] as [A, B]);

    return new PairZip(newArr);
  }

  mapLeft<A2>(fn: (a: A) => A2): PairZip<A2, B>  {
    const newArr: [A2, B][] = this.pairs.map((item) => [fn(item[0]), item[1]]);

    return new PairZip(newArr);
  }

  mapRight<B2>(fn: (a: B) => B2): PairZip<A, B2>  {
    const newArr: [A, B2][] = this.pairs.map((item) => [item[0], fn(item[1])]);

    return new PairZip(newArr);
  }

  unzip(): [A[], B[]] {
    const arr1: A[] = this.pairs.map(item => item[0]);
    const arr2: B[] = this.pairs.map(item => item[1]);
    
    return [arr1, arr2]
  }
}
