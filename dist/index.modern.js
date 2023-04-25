import React, { createContext, useContext, useMemo, useState } from 'react';

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
  var StateContext = createContext({});
  var DispatchContext = createContext({});
  var useDispatch = function useDispatch(mutation) {
    var _useContext = useContext(DispatchContext),
      dispatch = _useContext.dispatch;
    return function (payload) {
      dispatch(function (state) {
        return mutation(state, payload);
      });
    };
  };
  var useSelector = function useSelector(selector, keys) {
    var state = useContext(StateContext);
    var memo = useMemo(function () {
      return selector(state);
    }, [keys]);
    return memo;
  };
  var Provider = function Provider(_ref2) {
    var children = _ref2.children,
      initialValues = _ref2.initialValues;
    var _useState = useState(_extends({}, initialState, initialValues)),
      state = _useState[0],
      setState = _useState[1];
    var valueDispatch = useMemo(function () {
      return {
        dispatch: function dispatch(setter) {
          setState(function (prevState) {
            return _extends({}, prevState, setter(prevState));
          });
        }
      };
    }, [setState]);
    return React.createElement(DispatchContext.Provider, {
      value: valueDispatch
    }, React.createElement(StateContext.Provider, {
      value: state
    }, children));
  };
  return {
    Provider: Provider,
    useDispatch: useDispatch,
    useSelector: useSelector
  };
};

export default createStore;
//# sourceMappingURL=index.modern.js.map
