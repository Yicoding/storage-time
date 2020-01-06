"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("./tools");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var storage = window.localStorage;

var StoreBase =
/*#__PURE__*/
function () {
  function StoreBase(props) {
    _classCallCheck(this, StoreBase);

    this.key = props.key;
    this.lifeTime = props.lifeTime;
  }

  _createClass(StoreBase, [{
    key: "isEmpty",
    value: function isEmpty() {
      return storage.getItem(this.key) ? false : true;
    } // 获取值

  }, {
    key: "get",
    value: function get() {
      var value = JSON.parse(storage.getItem(this.key));

      if (this.isEmpty()) {
        // 不存在的情况
        return null;
      } // 存在时，判断是否过期


      var currentTime = (0, _tools.ChangeDate)(Date.now(), 'yyyy-MM-dd HH:mm:ss');

      if (currentTime > value.validDate) {
        // 已过期
        this.remove();
        return null;
      }

      return value;
    } // 设置值

  }, {
    key: "set",
    value: function set(value) {
      var concat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var oldVal = JSON.parse(storage.getItem(this.key)); // 存储日期

      var saveDate = (0, _tools.ChangeDate)(Date.now(), 'yyyy-MM-dd HH:mm:ss');
      var day = parseFloat(this.lifeTime);
      var targetTime = Date.now() + day * 24 * 3600 * 1000; // 过期日期

      var validDate = (0, _tools.ChangeDate)(targetTime, 'yyyy-MM-dd HH:mm:ss'); // 存储对象

      var item = {
        saveDate: saveDate,
        validDate: validDate
      };

      if (concat) {
        // 合并
        if (this.isEmpty()) {
          // 不存在的情况，直接赋值
          item.value = value;
          storage.setItem(this.key, JSON.stringify(item));
        } else {
          // 存在时，合并值
          item.value = Object.assign({}, oldVal.value, value);
          storage.setItem(this.key, JSON.stringify(item));
        }
      } else {
        // 设置新的值
        item.value = value;
        storage.setItem(this.key, JSON.stringify(item));
      }
    } // 合并值

  }, {
    key: "merge",
    value: function merge(value) {
      this.set(value, true);
    } // 改变单个字段的值

  }, {
    key: "setAttr",
    value: function setAttr(name, value) {
      var oldVal = JSON.parse(storage.getItem(this.key)); // 存储日期

      var saveDate = (0, _tools.ChangeDate)(Date.now(), 'yyyy-MM-dd HH:mm:ss');
      var day = parseFloat(this.lifeTime);
      var targetTime = Date.now() + day * 24 * 3600 * 1000; // 过期日期

      var validDate = (0, _tools.ChangeDate)(targetTime, 'yyyy-MM-dd HH:mm:ss'); // 存储对象

      var item = {
        saveDate: saveDate,
        validDate: validDate
      };

      if (this.isEmpty()) {
        // 不存在的情况，直接赋值
        item.value = _defineProperty({}, name, value);
        storage.setItem(this.key, JSON.stringify(item));
      } else {
        // 存在时，设置对应项
        oldVal.value[name] = value;
        item.value = oldVal.value;
        storage.setItem(this.key, JSON.stringify(item));
      }
    } // 删除对应存储

  }, {
    key: "remove",
    value: function remove() {
      storage.removeItem(this.key);
    }
  }]);

  return StoreBase;
}();

var _default = StoreBase;
exports.default = _default;