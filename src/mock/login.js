import { param2Obj } from 'utils';

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    name: 'Super Admin',
    uid: '001'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    name: 'Normal Editor',
    uid: '002'


  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    name: '工程师小王',
    uid: '003'
  }
}

export default {
  loginByEmail: config => {
    console.log(config)
    console.log('loginByEmail')
    const { email } = JSON.parse(config.body);
      return userMap[email.split('@')[0]];

  },
  getInfo: config => {
    console.log('getInfo')
    console.log(config)
    const { token } = param2Obj(config.url);
    console.log(param2Obj(config.url)+'param20bj')
    if (userMap[token]) {
      console.log(userMap[token])

      return userMap[token];
    } else {
      return Promise.reject('a');
    }
    console.log(config)
  },
  logout: () => 'success'
};
