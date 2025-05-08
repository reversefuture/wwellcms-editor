// Copyright 2018-present the xiejiahe. All rights reserved. MIT license.
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LOCAL_STORAGE } from '@/constants'
import { isPlainObject } from 'lodash'
import { serviceLoginByToken, serviceLoginByCode } from '@/services'
import type { AppDispatch } from '.'
import { formatDate } from '@/utils'

export interface UserProps {
  provider: string
  uid?: number
  username: string
  loginName: string
  avatarUrl: string
  email: string
  role: number
  token?: string
  bio: string
  location: string
  createdAt: string
}

export interface UserState {
  isLogin: boolean
  isLockScreen: boolean
  userInfo: UserProps
}
// TODO: 测试未登录
let localUser = {
  uid: 12498408,
  provider: 'github',
  loginName: 'reversefuture',
  username: 'reversefuture',
  token: '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',
  avatarUrl: 'https://avatars.githubusercontent.com/u/12498408?v=4',
  location: '',
  bio: "Don't be panic",
  email: '',
  ipAddr: '',
  role: 1,
  createdAt: '2025-05-07T07:30:46.747Z',
  updatedAt: '2025-05-07T07:30:46.747Z',
}
try {
  const r = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as string)
  if (isPlainObject(r)) {
    localUser = r
  }
} catch {
  /* empty */
}

const initialState: UserState = {
  isLogin: !!localUser,
  isLockScreen: false,
  userInfo: localUser || {
    provider: '', // github ?
    uid: undefined, // 用户ID
    createdAt: '', // 注册时间
    bio: '', // 简介
    username: '', // 昵称
    loginName: '', // 登录名
    avatarUrl: '', // 头像
    email: '',
    role: '',
    token: undefined, // 登录凭证
    location: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER_INFO: (state, action: PayloadAction<UserProps>) => {
      const userInfo = action.payload
      userInfo.createdAt &&= formatDate(userInfo.createdAt)
      state.isLogin = !!userInfo.token
      state.userInfo = userInfo
    },
  },
})

export const { SET_USER_INFO } = userSlice.actions

export const loginByToken = (token: string) => (dispatch: AppDispatch) => {
  return serviceLoginByToken(token).then(res => {
    return dispatch(SET_USER_INFO(res.user))
  })
}

export const loginByCode = (code: string) => (dispatch: AppDispatch) => {
  return serviceLoginByCode(code).then(res => {
    return dispatch(SET_USER_INFO(res.user))
  })
}

export default userSlice.reducer
