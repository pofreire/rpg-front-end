import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { searchSuccess, searchFailure } from './actions';

export function* search({ payload }) {
  /*  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', search);

    toast.success('Perfil atualizado com sucesso! ');

    yield put(searchSuccess());
  } catch (err) {
    toast.error('Error!');
    yield put(searchFailure());
  } */
}

export default all([takeLatest('@search/SEARCH_REQUEST', search)]);
