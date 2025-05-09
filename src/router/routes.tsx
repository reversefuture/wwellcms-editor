import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import PrivateRoute from '@/components/private-route'
import Login from '@/views/login/index'
import NoMatch from '@/views/exception/404'
import MainEntry from '@/views/main'
import SettingIndex from '@/views/setting/index'
import HomeIndex from '@/views/index'
import Instance from '@/views/instance'
import InstanceCreate from '@/views/instance/CreatePage'
import InstanceDetail from '@/views/instance/DetailPage'

const Base = lazy(() => import('@/views/setting/base'))
const InnerMessage = lazy(() => import('@/views/setting/inner-message'))
const Notification = lazy(() => import('@/views/setting/notification'))
const Account = lazy(() => import('@/views/setting/account'))

export function MainRoutes() {
  const _Login = (
    <PrivateRoute
      element={Login}
      meta={{
        title: '登录',
      }}
    />
  )

  const elements = useRoutes([
    {
      path: '/',
      element: _Login,
    },
    {
      path: '/login',
      element: _Login,
    },
    {
      path: '/home',
      element: <MainEntry />,
      children: [
        {
          path: 'index',
          element: (
            <PrivateRoute
              element={HomeIndex}
              meta={{
                requiresAuth: true,
                title: '后台首页',
              }}
            />
          ),
        },
        {
          path: 'instance',
          element: (
            <PrivateRoute
              element={Instance}
              meta={{
                requiresAuth: true,
                title: '备忘录列表',
              }}
            />
          ),
        },
        {
          path: 'instance/create',
          element: (
            <PrivateRoute
              element={InstanceCreate}
              meta={{
                requiresAuth: true,
                title: '备忘录创建',
              }}
            />
          ),
        },
        {
          path: 'instance/detail/:id',
          element: (
            <PrivateRoute
              element={InstanceDetail}
              meta={{
                requiresAuth: true,
              }}
            />
          ),
        },

        // Setting
        {
          path: 'setting',
          element: <SettingIndex />,
          children: [
            {
              path: '/home/setting/base',
              element: (
                <PrivateRoute
                  element={Base}
                  meta={{
                    title: 'Account',
                    requiresAuth: true,
                  }}
                />
              ),
            },
            {
              path: '/home/setting/innerMessage',
              element: (
                <PrivateRoute
                  element={InnerMessage}
                  meta={{
                    title: 'Messages',
                    requiresAuth: true,
                  }}
                />
              ),
            },
            {
              path: '/home/setting/notification',
              element: (
                <PrivateRoute
                  element={Notification}
                  meta={{
                    title: 'Notification',
                    requiresAuth: true,
                  }}
                />
              ),
            },
            {
              path: '/home/setting/account',
              element: (
                <PrivateRoute
                  element={Account}
                  meta={{
                    title: 'Account settings',
                    requiresAuth: true,
                  }}
                />
              ),
            },
          ],
        },

        {
          path: '*',
          element: (
            <PrivateRoute
              element={NoMatch}
              meta={{
                requiresAuth: false,
                title: '404 Not Found',
              }}
            />
          ),
        },
      ],
    },
    {
      path: '*',
      element: (
        <PrivateRoute
          element={NoMatch}
          meta={{
            requiresAuth: false,
            title: '404 Not Found',
          }}
        />
      ),
    },
  ])

  return elements
}
