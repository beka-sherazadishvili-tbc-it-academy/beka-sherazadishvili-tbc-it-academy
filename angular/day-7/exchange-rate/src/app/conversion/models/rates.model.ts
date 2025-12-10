export interface IRates {
  currencyCode: string;
  currencyName: string;
  standard: {
    buy: number;
    sell: number;
  };
}
