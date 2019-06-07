(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/objectWithoutProperties'), require('react'), require('react-router'), require('react-redux'), require('lodash/get'), require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('@babel/runtime/helpers/inherits'), require('@babel/runtime/helpers/wrapNativeSuper'), require('lodash/merge'), require('lodash/trimStart'), require('lodash/trimEnd'), require('lodash/mapValues'), require('@babel/runtime/helpers/objectSpread'), require('history'), require('@rematch/core'), require('@rematch/select'), require('@babel/runtime/helpers/createClass'), require('lodash/partition'), require('@babel/runtime/helpers/slicedToArray'), require('react-router-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/objectWithoutProperties', 'react', 'react-router', 'react-redux', 'lodash/get', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', '@babel/runtime/helpers/inherits', '@babel/runtime/helpers/wrapNativeSuper', 'lodash/merge', 'lodash/trimStart', 'lodash/trimEnd', 'lodash/mapValues', '@babel/runtime/helpers/objectSpread', 'history', '@rematch/core', '@rematch/select', '@babel/runtime/helpers/createClass', 'lodash/partition', '@babel/runtime/helpers/slicedToArray', 'react-router-dom'], factory) :
  (global = global || self, factory(global['react-mothership'] = {}, global._objectWithoutProperties, global.React, global.reactRouter, global.reactRedux, global._get, global._classCallCheck, global._possibleConstructorReturn, global._getPrototypeOf, global._inherits, global._wrapNativeSuper, global._merge, global._trimStart, global._trimEnd, global._mapValues, global._objectSpread, global.history, global.core, global.selectPlugin, global._createClass, global._partition, global._slicedToArray, global.reactRouterDom));
}(this, function (exports, _objectWithoutProperties, React, reactRouter, reactRedux, _get, _classCallCheck, _possibleConstructorReturn, _getPrototypeOf, _inherits, _wrapNativeSuper, _merge, _trimStart, _trimEnd, _mapValues, _objectSpread, history, core, selectPlugin, _createClass, _partition, _slicedToArray, reactRouterDom) { 'use strict';

  _objectWithoutProperties = _objectWithoutProperties && _objectWithoutProperties.hasOwnProperty('default') ? _objectWithoutProperties['default'] : _objectWithoutProperties;
  var React__default = 'default' in React ? React['default'] : React;
  _get = _get && _get.hasOwnProperty('default') ? _get['default'] : _get;
  _classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
  _possibleConstructorReturn = _possibleConstructorReturn && _possibleConstructorReturn.hasOwnProperty('default') ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
  _getPrototypeOf = _getPrototypeOf && _getPrototypeOf.hasOwnProperty('default') ? _getPrototypeOf['default'] : _getPrototypeOf;
  _inherits = _inherits && _inherits.hasOwnProperty('default') ? _inherits['default'] : _inherits;
  _wrapNativeSuper = _wrapNativeSuper && _wrapNativeSuper.hasOwnProperty('default') ? _wrapNativeSuper['default'] : _wrapNativeSuper;
  _merge = _merge && _merge.hasOwnProperty('default') ? _merge['default'] : _merge;
  _trimStart = _trimStart && _trimStart.hasOwnProperty('default') ? _trimStart['default'] : _trimStart;
  _trimEnd = _trimEnd && _trimEnd.hasOwnProperty('default') ? _trimEnd['default'] : _trimEnd;
  _mapValues = _mapValues && _mapValues.hasOwnProperty('default') ? _mapValues['default'] : _mapValues;
  _objectSpread = _objectSpread && _objectSpread.hasOwnProperty('default') ? _objectSpread['default'] : _objectSpread;
  selectPlugin = selectPlugin && selectPlugin.hasOwnProperty('default') ? selectPlugin['default'] : selectPlugin;
  _createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
  _partition = _partition && _partition.hasOwnProperty('default') ? _partition['default'] : _partition;
  _slicedToArray = _slicedToArray && _slicedToArray.hasOwnProperty('default') ? _slicedToArray['default'] : _slicedToArray;

  var context=React.createContext(null);var useApp=function useApp(){return React.useContext(context);};var Provider=context.Provider;

  var NotProvidedInScopeError=function(_Error){_inherits(NotProvidedInScopeError,_Error);function NotProvidedInScopeError(path,scope){var _this;_classCallCheck(this,NotProvidedInScopeError);_this=_possibleConstructorReturn(this,_getPrototypeOf(NotProvidedInScopeError).call(this,"Path \"".concat(path,"\" not provided by feature \"").concat(scope,"\"")));_this.name='ViewNotFoundError';return _this;}return NotProvidedInScopeError;}(_wrapNativeSuper(Error));var context$1=React.createContext({name:'root',views:{},provides:{}});function useScope(){return React.useContext(context$1);}function useProvided(){var scope=React.useContext(context$1);for(var _len=arguments.length,deps=new Array(_len),_key=0;_key<_len;_key++){deps[_key]=arguments[_key];}return deps.map(function(path){var val=_get(scope.provides,path);if(val===undefined){throw new NotProvidedInScopeError(path,scope.name);}return val;});}

  function pathJoin(){var slash='/';for(var _len=arguments.length,parts=new Array(_len),_key=0;_key<_len;_key++){parts[_key]=arguments[_key];}return parts.reduce(function(acc,p){return p===slash?acc:[_trimEnd(acc,slash),_trimStart(p,slash)].join(slash);});}function addLinks(dest,basePath,views){views.forEach(function(view){if(view.name){dest[view.name]={exact:view.exact,resolve:view.resolve?function(){return pathJoin(basePath,view.resolve.apply(view,arguments));}:function(){return pathJoin(basePath,view.path);}};}});}

  function Scope(_ref){var basePath=_ref.basePath,hoist=_ref.hoist,children=_ref.children,rest=_objectWithoutProperties(_ref,["basePath","hoist","children"]);var parent=useScope();var views=useViews(basePath,hoist);var scope=_merge({views:views},parent,rest);useModels(hoist,scope);return React__default.createElement(context$1.Provider,{value:scope,children:children});}Scope.displayName='Scope';function useViews(basePath,hoisted){return React.useMemo(function(){var views={};React.Children.forEach(hoisted,function(child){var _child$type$featureCo,_child$type$featureCo2;var featureName=(_child$type$featureCo=child.type.featureConfig)===null||_child$type$featureCo===void 0?void 0:_child$type$featureCo.name;var featureViews=(_child$type$featureCo2=child.type.featureConfig)===null||_child$type$featureCo2===void 0?void 0:_child$type$featureCo2.views;var featurePath=pathJoin(basePath,child.props.path);if(featureName){addLinks(views,featurePath,[{name:featureName,exact:child.props.exact,path:'/'}]);}if(featureViews){addLinks(views,featurePath,featureViews);}});return views;},[basePath,hoisted]);}function useModels(hoisted,scope){var app=useApp();React.useMemo(function(){return React.Children.forEach(hoisted,function(child){var _child$type$featureCo3;var featureModels=(_child$type$featureCo3=child.type.featureConfig)===null||_child$type$featureCo3===void 0?void 0:_child$type$featureCo3.models;if(!featureModels){return;}app.registerModels(featureModels,scope);});},[app,hoisted]);}

  var withStore=reactRedux.connect;var withDispatch=function withDispatch(_arg){return reactRedux.connect(null,_arg);};var useAppEffect=function useAppEffect(mapDispatch,watch){var store=reactRedux.useStore();React.useEffect(function(){mapDispatch(store.dispatch);},watch);};var useAppSelector=function useAppSelector(mapSelect,payload){var store=reactRedux.useStore();return reactRedux.useSelector(function(state){return mapSelect(store.select)(state,payload);});};var sconnect=function sconnect(mapSelect,mapDispatch){return function(Base){var c=React.memo(function(props){var store=reactRedux.useStore();var enhance=reactRedux.connect(store.select(mapSelect),mapDispatch);return React.createElement(enhance(Base),props);});c.displayName="sconnect(".concat(Base.displayName||Base.name||'Component',")");return c;};};var withStoreSelection=sconnect;var $$=sconnect;var _$=withDispatch;

  var preset = {plugins:[selectPlugin()]};

  var createStore = (function(config){return core.init(_objectSpread({},preset,config));});

  function enhance(model,inject){return _objectSpread({},model,{effects:typeof model.effects==='function'?function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return model.effects.apply(model,args.concat([inject]));}:model.effects,selectors:typeof model.selectors==='function'?function(){for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}return model.selectors.apply(model,args.concat([inject]));}:model.selectors});}function createApp(){var config=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var registeredModels={};var store=createStore(config.rematch);var select=store.select,dispatch=store.dispatch,getState=store.getState;var history$1=history.createBrowserHistory();var inject=_objectSpread({},config.inject,{select:select,dispatch:dispatch,getState:getState});function navigate(views){return _mapValues(views,function(v){return function(){return history$1.push(v.resolve.apply(v,arguments));};});}function registerModels(models,scope){models.forEach(function(model){if(registeredModels[model.name]!==model){var injected=_objectSpread({},inject,{navigator:navigate(scope.views)});registeredModels[model.name]=model;store.model(enhance(model,injected));}});}return {store:store,history:history$1,registerModels:registerModels,navigate:navigate};}

  function Mothership(_ref){var _ref$app=_ref.app,app=_ref$app===void 0?createApp():_ref$app,children=_ref.children,rest=_objectWithoutProperties(_ref,["app","children"]);return React__default.createElement(Provider,{value:app},React__default.createElement(reactRedux.Provider,{store:app.store},React__default.createElement(Scope,{name:"root",basePath:"/",hoist:children,provides:rest},React__default.createElement(reactRouter.Router,{history:app.history},children))));}

  var useNavigator=function useNavigator(){var app=useApp();var _useScope=useScope(),views=_useScope.views;return React.useMemo(function(){return app.navigate(views);},[app,views]);};

  var Boundary=function(_Component){_inherits(Boundary,_Component);function Boundary(){var _getPrototypeOf2;var _this;_classCallCheck(this,Boundary);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=_possibleConstructorReturn(this,(_getPrototypeOf2=_getPrototypeOf(Boundary)).call.apply(_getPrototypeOf2,[this].concat(args)));_this.state={hasError:false};return _this;}_createClass(Boundary,[{key:"render",value:function render(){if(this.state.hasError){var _this$props=this.props,_this$props$recovery=_this$props.recovery,recovery=_this$props$recovery===void 0?React__default.createElement("div",null,"Error!"):_this$props$recovery,rest=_objectWithoutProperties(_this$props,["recovery"]);return recovery;}else{var _this$props2=this.props,_this$props2$fallback=_this$props2.fallback,fallback=_this$props2$fallback===void 0?React__default.createElement("div",null,"Loading..."):_this$props2$fallback,_rest=_objectWithoutProperties(_this$props2,["fallback"]);return React__default.createElement(React.Suspense,Object.assign({fallback:fallback},_rest));}}}]);return Boundary;}(React.Component);Boundary.getDerivedStateFromError=function(error){return {hasError:true};};

  var _BaseLink,_BaseNavLink,_BaseRedirect;var ViewNotFoundError=function(_Error){_inherits(ViewNotFoundError,_Error);function ViewNotFoundError(view,scope){var _this;_classCallCheck(this,ViewNotFoundError);_this=_possibleConstructorReturn(this,_getPrototypeOf(ViewNotFoundError).call(this,"View \"".concat(view,"\" not provided by feature \"").concat(scope,"\"")));_this.name='ViewNotFoundError';return _this;}return ViewNotFoundError;}(_wrapNativeSuper(Error));var enhance$1=function enhance(Comp){return function(_ref){var view=_ref.view,params=_ref.params,rest=_objectWithoutProperties(_ref,["view","params"]);var scope=useScope();var _useMemo=React.useMemo(function(){if(view){var _scope$views;var config=scope===null||scope===void 0?void 0:(_scope$views=scope.views)===null||_scope$views===void 0?void 0:_scope$views[view];if(!config){throw new ViewNotFoundError(view,scope.name);}return [config.resolve(params),config.exact];}else{return [undefined,undefined];}},[scope,view,params]),_useMemo2=_slicedToArray(_useMemo,2),to=_useMemo2[0],exact=_useMemo2[1];return React.createElement(Comp,_objectSpread({to:to,exact:exact},rest));};};var Link=(_BaseLink=reactRouterDom.Link,enhance$1(_BaseLink));var NavLink=(_BaseNavLink=reactRouterDom.NavLink,enhance$1(_BaseNavLink));var Redirect=(_BaseRedirect=reactRouter.Redirect,enhance$1(_BaseRedirect));

  function createRoutes(basePath,views){return views.map(function(_ref){var path=_ref.path,component=_ref.component,effect=_ref.effect,redirect=_ref.redirect,rest=_objectWithoutProperties(_ref,["path","component","effect","redirect"]);var url=pathJoin(basePath,path);var render=renderHooks(effect&&reduxHook(effect),redirect&&redirectHook(redirect));return React__default.createElement(reactRouter.Route,Object.assign({key:url,path:url,component:component||render},rest));});}function renderHooks(){for(var _len=arguments.length,hooks=new Array(_len),_key=0;_key<_len;_key++){hooks[_key]=arguments[_key];}var used=hooks.filter(Boolean);if(!used.length){return undefined;}return function(){return used.map(function(_it){return _it.call();});};}function reduxHook(effect){return function(){useAppEffect(effect,[]);return null;};}function redirectHook(payload){var view,params;if(typeof payload==='object'){var to=payload.to,rest=_objectWithoutProperties(payload,["to"]);view=to;params=rest;}else{view=payload;}return function(){return React__default.createElement(Redirect,{key:view,view:view,params:params});};}

  function createFeature(){var config=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return function(Base){var _ref,_Feature;var name=config.name||Base.displayName||Base.name;function Feature(props){var provides=props.provides,path=props.path,exact=props.exact,match=props.match,children=props.children;var basePath=pathJoin(match.path,path);var routes=useRoutes(name,basePath,config.views);var _usePartition=usePartition(children),_usePartition2=_slicedToArray(_usePartition,2),withPath=_usePartition2[0],nested=_usePartition2[1];var render=function render(){return React__default.createElement(Boundary,{fallback:config.placeholder,recovery:config.recovery},React__default.createElement(Scope,{name:name,basePath:basePath,provides:_objectSpread({},config.provides,provides),hoist:children},React__default.createElement(Base,props,React__default.createElement(reactRouter.Switch,null,routes,withPath),nested)));};return path?React__default.createElement(reactRouter.Route,{path:basePath,exact:exact,render:render}):render();}var Wrapper=(_ref=(_Feature=Feature,React.memo(_Feature)),reactRouter.withRouter(_ref));Wrapper.displayName="Feature(".concat(name||'Component',")");Wrapper.WrappedComponent=Base;Wrapper.featureConfig=_objectSpread({},config,{name:name});return Wrapper;};}function useRoutes(name,basePath){var views=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];return React.useMemo(function(){return createRoutes(basePath,views);},[basePath]);}function usePartition(children){return React.useMemo(function(){return _partition(React.Children.toArray(children),function(_it){return _it.props.path;});},[children]);}

  Object.defineProperty(exports, 'Route', {
    enumerable: true,
    get: function () {
      return reactRouter.Route;
    }
  });
  Object.defineProperty(exports, 'Switch', {
    enumerable: true,
    get: function () {
      return reactRouter.Switch;
    }
  });
  Object.defineProperty(exports, 'withRouter', {
    enumerable: true,
    get: function () {
      return reactRouter.withRouter;
    }
  });
  Object.defineProperty(exports, 'connect', {
    enumerable: true,
    get: function () {
      return reactRedux.connect;
    }
  });
  Object.defineProperty(exports, 'useDispatch', {
    enumerable: true,
    get: function () {
      return reactRedux.useDispatch;
    }
  });
  Object.defineProperty(exports, 'useSelector', {
    enumerable: true,
    get: function () {
      return reactRedux.useSelector;
    }
  });
  Object.defineProperty(exports, 'useStore', {
    enumerable: true,
    get: function () {
      return reactRedux.useStore;
    }
  });
  Object.defineProperty(exports, 'createModel', {
    enumerable: true,
    get: function () {
      return core.createModel;
    }
  });
  exports.$$ = $$;
  exports.Boundary = Boundary;
  exports.Link = Link;
  exports.Mothership = Mothership;
  exports.NavLink = NavLink;
  exports.Redirect = Redirect;
  exports.Scope = Scope;
  exports.ViewNotFoundError = ViewNotFoundError;
  exports._$ = _$;
  exports.createApp = createApp;
  exports.createFeature = createFeature;
  exports.createStore = createStore;
  exports.sconnect = sconnect;
  exports.useApp = useApp;
  exports.useAppEffect = useAppEffect;
  exports.useAppSelector = useAppSelector;
  exports.useNavigator = useNavigator;
  exports.useProvided = useProvided;
  exports.useScope = useScope;
  exports.withDispatch = withDispatch;
  exports.withStore = withStore;
  exports.withStoreSelection = withStoreSelection;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
