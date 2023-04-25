function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var createStore = function createStore(_ref) {
  var initialState = _ref.initialState;
  var StateContext = React.createContext({});
  var DispatchContext = React.createContext({});
  var useDispatch = function useDispatch(mutation) {
    var _useContext = React.useContext(DispatchContext),
      dispatch = _useContext.dispatch;
    return function (payload) {
      dispatch(function (state) {
        return mutation(state, payload);
      });
    };
  };
  var useSelector = function useSelector(selector) {
    var state = React.useContext(StateContext);
    return selector(state);
  };
  var Provider = function Provider(_ref2) {
    var children = _ref2.children,
      initialValues = _ref2.initialValues;
    var _useState = React.useState(_extends({}, initialState, initialValues)),
      state = _useState[0],
      setState = _useState[1];
    var valueDispatch = React.useMemo(function () {
      return {
        dispatch: function dispatch(setter) {
          setState(function (prevState) {
            return _extends({}, prevState, setter(prevState));
          });
        }
      };
    }, [setState]);
    return React__default.createElement(DispatchContext.Provider, {
      value: valueDispatch
    }, React__default.createElement(StateContext.Provider, {
      value: state
    }, children));
  };
  return {
    Provider: Provider,
    useDispatch: useDispatch,
    useSelector: useSelector
  };
};

module.exports = createStore;
//# sourceMappingURL=index.js.map
