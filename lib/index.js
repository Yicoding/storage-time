/**
 * 
 * @param {*} 
 */

import { changeDate } from './tools';
const storage = window.localStorage;

class StoreBase {
  constructor(props) {
    this.key = props.key
    this.lifeTime = props.lifeTime
  }
  // 获取值
  get() {
    const value = JSON.parse(storage.getItem(this.key));
    if (Object.prototype.toString.call(value) === '[object Null]') { // 不存在的情况
      return null;
    }
    // 存在时，判断是否过期
    const currentTime = changeDate(Date.now(), 'yyyy-MM-dd HH:mm:ss');
    if (currentTime > value.validDate) { // 已过期
      return null;
    }
    return value;
  }
  // 设置值
  set(value, concat = false) {
    const oldVal = JSON.parse(storage.getItem(this.key));
    // 存储日期
    const saveDate = changeDate(Date.now(), 'yyyy-MM-dd HH:mm:ss');
    const day = parseFloat(this.lifeTime);
    const targetTime = Date.now() + day * 24 * 3600 * 1000;
    // 过期日期
    const validDate = changeDate(targetTime, 'yyyy-MM-dd HH:mm:ss');
    // 存储对象
    const item = {
      saveDate,
      validDate
    };
    if (concat) { // 合并
      if (Object.prototype.toString.call(oldVal) === '[object Null]') { // 不存在的情况，直接赋值
        item.value = value;
        storage.setItem(this.key, JSON.stringify(item));
      } else { // 存在时，合并值
        item.value = Object.assign({}, oldVal.value, value);
        storage.setItem(this.key, JSON.stringify(item));
      }
    } else { // 设置新的值
      item.value = value;
      storage.setItem(this.key, JSON.stringify(item));
    }
  }
  // 合并值
  merge(value) {
    this.set(value, true);
  }
  // 改变单个字段的值
  setAttr(name, value) {
    const oldVal = JSON.parse(storage.getItem(this.key));
    // 存储日期
    const saveDate = changeDate(Date.now(), 'yyyy-MM-dd HH:mm:ss');
    const day = parseFloat(this.lifeTime);
    const targetTime = Date.now() + day * 24 * 3600 * 1000;
    // 过期日期
    const validDate = changeDate(targetTime, 'yyyy-MM-dd HH:mm:ss');
    // 存储对象
    const item = {
      saveDate,
      validDate
    };
    if (Object.prototype.toString.call(oldVal) === '[object Null]') { // 不存在的情况，直接赋值
      item.value = {
        [name]: value
      };
      storage.setItem(this.key, JSON.stringify(item));
    } else { // 存在时，设置对应项
      oldVal.value[name] = value;
      item.value = oldVal.value;
      storage.setItem(this.key, JSON.stringify(item));
    }
  }
  // 删除对应存储
  remove() {
    storage.removeItem(this.key);
  }
}

export default StoreBase;