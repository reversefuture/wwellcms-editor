import React from 'react'
import {
  HomeOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  ScheduleOutlined,
  BarChartOutlined,
  FormOutlined,
  UserOutlined,
  InsertRowLeftOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'

export const HOME_SIDER_MENU_LIST = [
  {
    path: '/home/index',
    icon: <HomeOutlined />,
    name: 'Home',
  },
  {
    path: '',
    icon: <FormOutlined />,
    name: 'Instances',
    children: [
      {
        path: '/home/instance',
        name: 'Instances List',
      },
      {
        path: '/home/instance/create',
        name: 'Create',
      },
    ],
  },
  {
    path: '/home/setting/base',
    icon: <UserOutlined />,
    name: 'Setting',
  },
]

export const SETTING_SIDER_MENU_LIST = [
  {
    path: '/home/setting/base',
    name: '个人中心',
  },
  {
    path: '/home/setting/innerMessage',
    name: '消息中心',
  },
  {
    path: '/home/setting/notification',
    name: '消息通知',
  },
  {
    path: '/home/setting/account',
    name: '账号设置',
  },
]
