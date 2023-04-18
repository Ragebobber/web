import { makeAutoObservable } from "mobx";
import { Roles } from "../util/Consts";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._userRole = Roles.USER;
    this._isAdmin = false;
    this._user = {};
    this._users = [];
    makeAutoObservable(this);
  }

  get isAuth() {
    return this._isAuth;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  setIsAuth(value) {
    this._isAuth = value;
  }

  get userRole() {
    return this._userRole;
  }

  setUserRole(value) {
    this._userRole = value;
  }

  get currentUser() {
    return this._user;
  }

  setUser(value) {
    this._user = value;
  }

  setIsAdmin(value) {
    this._isAdmin = this._isAuth && value;
  }
  get allUsers() {
    return this._users;
  }
  setAllUsers(value) {
    return (this._users = value);
  }
}
