import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._allProducts = [];
    makeAutoObservable(this);
  }

  get allProducts() {
    return this._allProducts;
  }
  setAllProducts(value) {
    this._allProducts = value;
  }
}
