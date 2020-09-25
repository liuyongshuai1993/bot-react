import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ASYNC_SET_USER, SET_USER, User } from '../constants/user';
import { GET_USER_INFO } from '../../services/user.service';

export function setUser(user: User): BaseAction<User> {
  return { type: SET_USER, payload: user };
}

export function logout(): BaseAction<User> {
  return { type: SET_USER, payload: { isLogin: false, permissions: [], roles: [], user: {} } };
}

export function* asyncSetUser(): any {
  const { code, data } = yield call<any>(GET_USER_INFO);
  if (code === 0) {
    yield put({ type: SET_USER, payload: { user: data, isLogin: true } });
  }
}

export default function* root() {
  yield all([takeLatest(ASYNC_SET_USER, asyncSetUser)]);
}
