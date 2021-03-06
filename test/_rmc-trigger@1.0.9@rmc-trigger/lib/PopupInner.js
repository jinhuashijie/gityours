'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LazyRenderBox = require('./LazyRenderBox');

var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PopupInner = function (_Component) {
    (0, _inherits3['default'])(PopupInner, _Component);

    function PopupInner() {
        (0, _classCallCheck3['default'])(this, PopupInner);
        return (0, _possibleConstructorReturn3['default'])(this, (PopupInner.__proto__ || Object.getPrototypeOf(PopupInner)).apply(this, arguments));
    }

    (0, _createClass3['default'])(PopupInner, [{
        key: 'render',
        value: function render() {
            var props = this.props;
            var className = props.className;
            if (!props.visible) {
                className += ' ' + props.hiddenClassName;
            }
            return _react2['default'].createElement(
                'div',
                { className: className, style: props.style },
                _react2['default'].createElement(
                    _LazyRenderBox2['default'],
                    { className: props.prefixCls + '-content', visible: props.visible },
                    props.children
                )
            );
        }
    }]);
    return PopupInner;
}(_react.Component);

exports['default'] = PopupInner;
module.exports = exports['default'];