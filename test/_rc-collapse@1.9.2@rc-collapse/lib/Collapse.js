'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _openAnimationFactory = require('./openAnimationFactory');

var _openAnimationFactory2 = _interopRequireDefault(_openAnimationFactory);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function toArray(activeKey) {
  var currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }
  return currentActiveKey;
}

var Collapse = function (_Component) {
  _inherits(Collapse, _Component);

  function Collapse(props) {
    _classCallCheck(this, Collapse);

    var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

    var _this$props = _this.props,
        activeKey = _this$props.activeKey,
        defaultActiveKey = _this$props.defaultActiveKey;

    var currentActiveKey = defaultActiveKey;
    if ('activeKey' in _this.props) {
      currentActiveKey = activeKey;
    }

    _this.state = {
      openAnimation: _this.props.openAnimation || (0, _openAnimationFactory2['default'])(_this.props.prefixCls),
      activeKey: toArray(currentActiveKey)
    };
    return _this;
  }

  _createClass(Collapse, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('activeKey' in nextProps) {
        this.setState({
          activeKey: toArray(nextProps.activeKey)
        });
      }
      if ('openAnimation' in nextProps) {
        this.setState({
          openAnimation: nextProps.openAnimation
        });
      }
    }
  }, {
    key: 'onClickItem',
    value: function onClickItem(key) {
      var activeKey = this.state.activeKey;
      if (this.props.accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [].concat(_toConsumableArray(activeKey));
        var index = activeKey.indexOf(key);
        var isActive = index > -1;
        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }
      this.setActiveKey(activeKey);
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      var _this2 = this;

      var activeKey = this.state.activeKey;
      var _props = this.props,
          prefixCls = _props.prefixCls,
          accordion = _props.accordion,
          destroyInactivePanel = _props.destroyInactivePanel;

      var newChildren = [];

      _react.Children.forEach(this.props.children, function (child, index) {
        if (!child) return;
        // If there is no key provide, use the panel order as default key
        var key = child.key || String(index);
        var _child$props = child.props,
            header = _child$props.header,
            headerClass = _child$props.headerClass,
            disabled = _child$props.disabled;

        var isActive = false;
        if (accordion) {
          isActive = activeKey[0] === key;
        } else {
          isActive = activeKey.indexOf(key) > -1;
        }

        var props = {
          key: key,
          header: header,
          headerClass: headerClass,
          isActive: isActive,
          prefixCls: prefixCls,
          destroyInactivePanel: destroyInactivePanel,
          openAnimation: _this2.state.openAnimation,
          accordion: accordion,
          children: child.props.children,
          onItemClick: disabled ? null : function () {
            return _this2.onClickItem(key);
          }
        };

        newChildren.push(_react2['default'].cloneElement(child, props));
      });

      return newChildren;
    }
  }, {
    key: 'setActiveKey',
    value: function setActiveKey(activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({ activeKey: activeKey });
      }
      this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          className = _props2.className,
          style = _props2.style,
          accordion = _props2.accordion;

      var collapseClassName = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, !!className), _classNames));
      return _react2['default'].createElement(
        'div',
        { className: collapseClassName, style: style, role: accordion ? 'tablist' : null },
        this.getItems()
      );
    }
  }]);

  return Collapse;
}(_react.Component);

Collapse.propTypes = {
  children: _propTypes2['default'].any,
  prefixCls: _propTypes2['default'].string,
  activeKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
  defaultActiveKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
  openAnimation: _propTypes2['default'].object,
  onChange: _propTypes2['default'].func,
  accordion: _propTypes2['default'].bool,
  className: _propTypes2['default'].string,
  style: _propTypes2['default'].object,
  destroyInactivePanel: _propTypes2['default'].bool
};

Collapse.defaultProps = {
  prefixCls: 'rc-collapse',
  onChange: function onChange() {},

  accordion: false,
  destroyInactivePanel: false
};

Collapse.Panel = _Panel2['default'];

exports['default'] = Collapse;
module.exports = exports['default'];