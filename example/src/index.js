
import StoreBase from '../../lib/index';

// create userInfo
const userInfoStore = new StoreBase({
  key: 'USER_INFO',
  lifeTime: '30D' // D: day, eg: 0.5D
});

// save userInfo
userInfoStore.set({
  name: 'Ecode',
  password: 123,
  mobile: 1000000000
});

// read userInfo
console.log('USER_INFO', userInfoStore.get());

// merge field
userInfoStore.merge({
  name: 'Yicoding',
  age: 20
});
console.log('USER_INFO', userInfoStore.get());

// edit single field
userInfoStore.setAttr('password', 456);
console.log('USER_INFO', userInfoStore.get());