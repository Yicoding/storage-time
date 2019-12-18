# storage-time
一款带时间存储的JavaScript本地存储插件
a local storage plugin with time for JavaScript

```
import StoreBase from 'storage-time';

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

// edit single field
userInfoStore.setAttrValue('password', 456);

// remove userInfo
userInfoStore.remove();

```
