# storage-time
一款带时间存储的JavaScript本地存储插件  
a local storage plugin with time for JavaScript  
github：https://github.com/Yicoding/storage-time

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
/*
  {
    saveDate: "2019-12-18 15:06:22",
    validDate: "2020-01-17 15:06:22",
    value: {
      name: "Ecode",
      password: 123,
      mobile: 1000000000
    }
  }
*/

// merge field
userInfoStore.merge({
  name: 'Yicoding',
  age: 20
});
/*
  {
    saveDate: "2019-12-18 15:06:22",
    validDate: "2020-01-17 15:06:22",
    value: {
      name: "Yicoding",
      password: 123,
      mobile: 1000000000,
      age: 20
    }
  }
*/

// edit single field
userInfoStore.setAttr('password', 456);
/*
  {
    saveDate: "2019-12-18 15:06:22",
    validDate: "2020-01-17 15:06:22",
    value: {
      name: "Yicoding",
      password: 456,
      mobile: 1000000000,
      age: 20
    }
  }
*/

// remove userInfo
userInfoStore.remove();

```
