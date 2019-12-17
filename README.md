# storage-time
一款带时间存储的js本地存储插件

```
import StoreBase from 'storage-time';

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

// 合并字段
userInfoStore.assignObj({
  name: 'Yicoding',
  age: 20
});

// 修改单个信息
userInfoStore.setAttrValue('password', 456);

// 删除用户信息
userInfoStore.remove();

```
