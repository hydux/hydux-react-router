"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_1 = require("react-router");
var hydux_1 = require("hydux");
var prop_types_1 = require("prop-types");
var CHANGE_LOCATION = '@@hydux-react-router/CHANGE_LOCATION';
function ConnectedSwitch(props, _a) {
    var router = _a.router;
    return (react_1.default.createElement(react_router_1.Switch, __assign({ location: router.route.location }, props), props.children));
}
exports.ConnectedSwitch = ConnectedSwitch;
ConnectedSwitch.contextTypes = {
    router: prop_types_1.default.object.isRequired
};
function withReactRouter(history) {
    return function (app) { return function (props) {
        return app(__assign({}, props, { init: function () {
                var result = props.init();
                if (!(result instanceof Array)) {
                    result = [result, hydux_1.Cmd.none];
                }
                return [__assign({}, result[0], { location: history.location }), result[1]];
            }, actions: __assign({}, props.actions, (_a = { history: {
                        go: function (n) { return history.go(n); },
                        goBack: function () { return history.goBack(); },
                        goForward: function () { return history.goForward(); },
                        push: function (path, state) { return history.push(path, state); },
                        replace: function (path, state) { return history.replace(path, state); },
                    } }, _a[CHANGE_LOCATION] = function (location) { return function (state) { return (__assign({}, state, { location: location })); }; }, _a)), view: function (state) { return function (actions) {
                var view = props.view(state)(actions);
                return react_1.default.createElement(react_router_1.Router, { history: history }, view);
            }; }, subscribe: function (state) {
                var cmd = props.subscribe ? props.subscribe(state) : hydux_1.Cmd.none;
                return hydux_1.Cmd.batch(cmd, hydux_1.Cmd.ofSub(function (actions) {
                    history.listen(actions[CHANGE_LOCATION]);
                }));
            } }));
        var _a;
    }; };
}
exports.default = withReactRouter;
//# sourceMappingURL=index.js.map