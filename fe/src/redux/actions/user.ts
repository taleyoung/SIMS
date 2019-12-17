import {Dispatch} from 'redux'

import {Res} from '../../types/api'
import myApi from '../../utils/api'
import {LOGIN} from '../action-types'

export interface loginSchema {
  account: string;
  password: string;
  choice: number
}

const loginSuccess = (type: typeof LOGIN, payload: Object) => ({type, payload})

const fetchLogin =
    (data: loginSchema) => async (dispatch: Dispatch) => {
      try {
        const res: Res = await myApi('/login/', 'POST', data)
        if (res.code === 0) {
          dispatch(loginSuccess(LOGIN, res.data));
          return res.data;
        }
      } catch (error) {
      }
    }

export {
  fetchLogin
}