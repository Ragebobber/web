import { makeAutoObservable } from "mobx";

export default class Subscription {
  constructor() {
    this._userSubs = [];
    makeAutoObservable(this);
  }

  get userSubs() {
    return this._userSubs;
  }

  setUserSubs(value) {
    return (this._userSubs = value);
  }
}
