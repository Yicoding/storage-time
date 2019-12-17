
import StoreBase from '../../lib/index';

// 声明用户信息
const userInfoStore = new StoreBase({
  key: 'USER_INFO',
  lifeTime: '30D'
});

// 存储用户信息
userInfoStore.set({
  name: 'Ecode',
  password: 123,
  mobile: 1000000000
});

// 读取用户信息
console.log('USER_INFO', userInfoStore.get());

// 合并信息
userInfoStore.assignObj({
  name: 'Yicoding',
  age: 20
});
console.log('USER_INFO', userInfoStore.get());

// 修改单个信息
userInfoStore.setAttrValue('password', 456);
console.log('USER_INFO', userInfoStore.get());