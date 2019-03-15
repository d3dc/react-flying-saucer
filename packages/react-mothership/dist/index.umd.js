(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-router'), require('react-redux'), require('lodash/get'), require('lodash/merge'), require('lodash/trimStart'), require('lodash/trimEnd'), require('lodash/mapValues'), require('history'), require('@rematch/core'), require('@rematch/select'), require('lodash/partition'), require('react-router-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-router', 'react-redux', 'lodash/get', 'lodash/merge', 'lodash/trimStart', 'lodash/trimEnd', 'lodash/mapValues', 'history', '@rematch/core', '@rematch/select', 'lodash/partition', 'react-router-dom'], factory) :
  (global = global || self, factory(global['react-mothership'] = {}, global.React, global.reactRouter, global.reactRedux, global._get, global._merge, global._trimStart, global._trimEnd, global._mapValues, global.history, global.core, global.selectPlugin, global._partition, global.reactRouterDom));
}(this, function (exports, React, reactRouter, reactRedux, _get, _merge, _trimStart, _trimEnd, _mapValues, history, core, selectPlugin, _partition, reactRouterDom) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  _get = _get && _get.hasOwnProperty('default') ? _get['default'] : _get;
  _merge = _merge && _merge.hasOwnProperty('default') ? _merge['default'] : _merge;
  _trimStart = _trimStart && _trimStart.hasOwnProperty('default') ? _trimStart['default'] : _trimStart;
  _trimEnd = _trimEnd && _trimEnd.hasOwnProperty('default') ? _trimEnd['default'] : _trimEnd;
  _mapValues = _mapValues && _mapValues.hasOwnProperty('default') ? _mapValues['default'] : _mapValues;
  selectPlugin = selectPlugin && selectPlugin.hasOwnProperty('default') ? selectPlugin['default'] : selectPlugin;
  _partition = _partition && _partition.hasOwnProperty('default') ? _partition['default'] : _partition;

  function _objectWithoutPropertiesLoose(source,excluded){if(source==null)return {};var target={};var sourceKeys=Object.keys(source);var key,i;for(i=0;i<sourceKeys.length;i++){key=sourceKeys[i];if(excluded.indexOf(key)>=0)continue;target[key]=source[key];}return target;}

  function _objectWithoutProperties(source,excluded){if(source==null)return {};var target=_objectWithoutPropertiesLoose(source,excluded);var key,i;if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++){key=sourceSymbolKeys[i];if(excluded.indexOf(key)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(source,key))continue;target[key]=source[key];}}return target;}

  var context=React.createContext(null);var useApp=function useApp(){return React.useContext(context);};var Provider=context.Provider;

  function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

  function _typeof2(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof2=function _typeof2(obj){return typeof obj;};}else{_typeof2=function _typeof2(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof2(obj);}function _typeof(obj){if(typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"){_typeof=function _typeof(obj){return _typeof2(obj);};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":_typeof2(obj);};}return _typeof(obj);}

  function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}

  function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}

  function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}

  function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}

  function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}

  function _isNativeFunction(fn){return Function.toString.call(fn).indexOf("[native code]")!==-1;}

  function isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}function _construct(Parent,args,Class){if(isNativeReflectConstruct()){_construct=Reflect.construct;}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor();if(Class)_setPrototypeOf(instance,Class.prototype);return instance;};}return _construct.apply(null,arguments);}

  function _wrapNativeSuper(Class){var _cache=typeof Map==="function"?new Map():undefined;_wrapNativeSuper=function _wrapNativeSuper(Class){if(Class===null||!_isNativeFunction(Class))return Class;if(typeof Class!=="function"){throw new TypeError("Super expression must either be null or a function");}if(typeof _cache!=="undefined"){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper);}function Wrapper(){return _construct(Class,arguments,_getPrototypeOf(this).constructor);}Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:false,writable:true,configurable:true}});return _setPrototypeOf(Wrapper,Class);};return _wrapNativeSuper(Class);}

  var NotProvidedInScopeError=function(_Error){_inherits(NotProvidedInScopeError,_Error);function NotProvidedInScopeError(path,scope){var _this;_classCallCheck(this,NotProvidedInScopeError);_this=_possibleConstructorReturn(this,_getPrototypeOf(NotProvidedInScopeError).call(this,"Path \"".concat(path,"\" not provided by feature \"").concat(scope,"\"")));_this.name='ViewNotFoundError';return _this;}return NotProvidedInScopeError;}(_wrapNativeSuper(Error));var context$1=React.createContext({name:'root',views:{},provides:{}});var useScope=function useScope(){return React.useContext(context$1);};var useProvided=function useProvided(){var scope=React.useContext(context$1);for(var _len=arguments.length,deps=new Array(_len),_key=0;_key<_len;_key++){deps[_key]=arguments[_key];}return deps.map(function(path){var val=_get(scope.provides,path);if(val===undefined){throw new NotProvidedInScopeError(path,scope.name);}return val;});};

  function pathJoin(){var slash='/';for(var _len=arguments.length,parts=new Array(_len),_key=0;_key<_len;_key++){parts[_key]=arguments[_key];}return parts.reduce(function(acc,p){return p===slash?acc:[_trimEnd(acc,slash),_trimStart(p,slash)].join(slash);});}function addLinks(dest,basePath,views){views.forEach(function(view){if(view.name){dest[view.name]={exact:view.exact,resolve:view.resolve?function(){return pathJoin(basePath,view.resolve.apply(view,arguments));}:function(){return pathJoin(basePath,view.path);}};}});}

  function Scope(_ref){var basePath=_ref.basePath,hoist=_ref.hoist,children=_ref.children,rest=_objectWithoutProperties(_ref,["basePath","hoist","children"]);var parent=useScope();var views=useViews(basePath,hoist);var scope=_merge({views:views},parent,rest);useModels(hoist,scope);return React__default.createElement(context$1.Provider,{value:scope,children:children});}Scope.displayName='Scope';function useViews(basePath,hoisted){return React.useMemo(function(){var views={};React.Children.forEach(hoisted,function(child){var _child$type$featureCo,_child$type$featureCo2;var featureName=(_child$type$featureCo=child.type.featureConfig)===null||_child$type$featureCo===void 0?void 0:_child$type$featureCo.name;var featureViews=(_child$type$featureCo2=child.type.featureConfig)===null||_child$type$featureCo2===void 0?void 0:_child$type$featureCo2.views;var featurePath=pathJoin(basePath,child.props.path);if(featureName){addLinks(views,featurePath,[{name:featureName,exact:child.props.exact,path:'/'}]);}if(featureViews){addLinks(views,featurePath,featureViews);}});return views;},[basePath,hoisted]);}function useModels(hoisted,scope){var app=useApp();React.useMemo(function(){return React.Children.forEach(hoisted,function(child){var _child$type$featureCo3;var featureModels=(_child$type$featureCo3=child.type.featureConfig)===null||_child$type$featureCo3===void 0?void 0:_child$type$featureCo3.models;if(!featureModels){return;}app.registerModels(featureModels,scope);});},[app,hoisted]);}

  function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

  function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==='function'){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable;}));}ownKeys.forEach(function(key){_defineProperty(target,key,source[key]);});}return target;}

  var withDispatch=function withDispatch(_arg){return reactRedux.connect(null,_arg);};var useAppEffect=function useAppEffect(mapDispatch,watch){var app=useApp();React.useEffect(function(){mapDispatch(app.store.dispatch);},watch);};var sconnect=function sconnect(mapSelect,mapDispatch){return function(Base){var c=React.memo(function(props){var app=useApp();var enhance=reactRedux.connect(app.store.select(mapSelect),mapDispatch);return React.createElement(enhance(Base),props);});c.displayName="sconnect(".concat(Base.displayName||Base.name||'Component',")");return c;};};var $$=sconnect;var _$=withDispatch;

  var preset = {plugins:[selectPlugin()]};

  var createStore = (function(config){return core.init(_objectSpread({},preset,config));});

  function enhance(model,inject){return _objectSpread({},model,{effects:typeof model.effects==='function'?function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return model.effects.apply(model,args.concat([inject]));}:model.effects,selectors:typeof model.selectors==='function'?function(){for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}return model.selectors.apply(model,args.concat([inject]));}:model.selectors});}function createApp(){var config=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var registeredModels={};var store=createStore(config.rematch);var select=store.select,dispatch=store.dispatch,getState=store.getState;var history$1=history.createBrowserHistory();var inject=_objectSpread({},config.inject,{select:select,dispatch:dispatch,getState:getState});function navigate(views){return _mapValues(views,function(v){return function(){return history$1.push(v.resolve.apply(v,arguments));};});}function registerModels(models,scope){models.forEach(function(model){if(registeredModels[model.name]!==model){var injected=_objectSpread({},inject,{navigator:navigate(scope.views)});registeredModels[model.name]=model;store.model(enhance(model,injected));}});}return {store:store,history:history$1,registerModels:registerModels,navigate:navigate};}

  function Mothership(_ref){var _ref$app=_ref.app,app=_ref$app===void 0?createApp():_ref$app,children=_ref.children,rest=_objectWithoutProperties(_ref,["app","children"]);return React__default.createElement(Provider,{value:app},React__default.createElement(reactRedux.Provider,{store:app.store},React__default.createElement(Scope,{name:"root",basePath:"/",hoist:children,provides:rest},React__default.createElement(reactRouter.Router,{history:app.history},children))));}

  var useNavigator=function useNavigator(){var app=useApp();var _useScope=useScope(),views=_useScope.views;return React.useMemo(function(){return app.navigate(views);},[app,views]);};

  function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}

  var Boundary=function(_Component){_inherits(Boundary,_Component);function Boundary(){var _getPrototypeOf2;var _this;_classCallCheck(this,Boundary);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=_possibleConstructorReturn(this,(_getPrototypeOf2=_getPrototypeOf(Boundary)).call.apply(_getPrototypeOf2,[this].concat(args)));_this.state={hasError:false};return _this;}_createClass(Boundary,[{key:"render",value:function render(){if(this.state.hasError){var _this$props=this.props,_this$props$recovery=_this$props.recovery,recovery=_this$props$recovery===void 0?React__default.createElement("div",null,"Error!"):_this$props$recovery,rest=_objectWithoutProperties(_this$props,["recovery"]);return recovery;}else{var _this$props2=this.props,_this$props2$fallback=_this$props2.fallback,fallback=_this$props2$fallback===void 0?React__default.createElement("div",null,"Loading..."):_this$props2$fallback,_rest=_objectWithoutProperties(_this$props2,["fallback"]);return React__default.createElement(React.Suspense,Object.assign({fallback:fallback},_rest));}}}]);return Boundary;}(React.Component);Boundary.getDerivedStateFromError=function(error){return {hasError:true};};

  function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}

  function _iterableToArrayLimit(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}

  function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance");}

  function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest();}

  var _BaseLink,_BaseNavLink,_BaseRedirect;var ViewNotFoundError=function(_Error){_inherits(ViewNotFoundError,_Error);function ViewNotFoundError(view,scope){var _this;_classCallCheck(this,ViewNotFoundError);_this=_possibleConstructorReturn(this,_getPrototypeOf(ViewNotFoundError).call(this,"View \"".concat(view,"\" not provided by feature \"").concat(scope,"\"")));_this.name='ViewNotFoundError';return _this;}return ViewNotFoundError;}(_wrapNativeSuper(Error));var enhance$1=function enhance(Comp){return function(_ref){var view=_ref.view,params=_ref.params,rest=_objectWithoutProperties(_ref,["view","params"]);var scope=useScope();var _useMemo=React.useMemo(function(){if(view){var _scope$views;var config=scope===null||scope===void 0?void 0:(_scope$views=scope.views)===null||_scope$views===void 0?void 0:_scope$views[view];if(!config){throw new ViewNotFoundError(view,scope.name);}return [config.resolve(params),config.exact];}else{return [undefined,undefined];}},[scope,view,params]),_useMemo2=_slicedToArray(_useMemo,2),to=_useMemo2[0],exact=_useMemo2[1];return React.createElement(Comp,_objectSpread({to:to,exact:exact},rest));};};var Link=(_BaseLink=reactRouterDom.Link,enhance$1(_BaseLink));var NavLink=(_BaseNavLink=reactRouterDom.NavLink,enhance$1(_BaseNavLink));var Redirect=(_BaseRedirect=reactRouter.Redirect,enhance$1(_BaseRedirect));

  function createRoutes(basePath,views){return views.map(function(_ref){var path=_ref.path,component=_ref.component,effect=_ref.effect,redirect=_ref.redirect,rest=_objectWithoutProperties(_ref,["path","component","effect","redirect"]);var url=pathJoin(basePath,path);var render=renderHooks(effect&&reduxHook(effect),redirect&&redirectHook(redirect));return React__default.createElement(reactRouter.Route,Object.assign({key:url,path:url,render:render,component:component},rest));});}function renderHooks(){for(var _len=arguments.length,hooks=new Array(_len),_key=0;_key<_len;_key++){hooks[_key]=arguments[_key];}var used=hooks.filter(Boolean);if(!used.length){return undefined;}return function(){return used.map(function(_obj){return _obj.call();});};}function reduxHook(effect){return function(){return null;};}function redirectHook(payload){var view,params;if(typeof payload==='object'){var to=payload.to,rest=_objectWithoutProperties(payload,["to"]);view=to;params=rest;}else{view=payload;}return function(){return React__default.createElement(Redirect,{key:view,view:view,params:params});};}

  function createFeature(){var config=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return function(Base){var _ref,_Feature;var name=config.name||Base.displayName||Base.name;function Feature(props){var provides=props.provides,path=props.path,exact=props.exact,match=props.match,children=props.children;var basePath=pathJoin(match.path,path);var routes=useRoutes(name,basePath,config.views);var _usePartition=usePartition(children),_usePartition2=_slicedToArray(_usePartition,2),withPath=_usePartition2[0],nested=_usePartition2[1];var render=function render(){return React__default.createElement(Boundary,{fallback:config.placeholder,recovery:config.recovery},React__default.createElement(Scope,{name:name,basePath:basePath,provides:_objectSpread({},config.provides,provides),hoist:children},React__default.createElement(Base,props,React__default.createElement(reactRouter.Switch,null,routes,withPath),nested)));};return path?React__default.createElement(reactRouter.Route,{path:basePath,exact:exact,render:render}):render();}var Wrapper=(_ref=(_Feature=Feature,React.memo(_Feature)),reactRouter.withRouter(_ref));Wrapper.displayName="Feature(".concat(name||'Component',")");Wrapper.WrappedComponent=Base;Wrapper.featureConfig=_objectSpread({},config,{name:name});return Wrapper;};}function useRoutes(name,basePath){var views=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];return React.useMemo(function(){return createRoutes(basePath,views);},[basePath]);}function usePartition(children){return React.useMemo(function(){return _partition(React.Children.toArray(children),function(_obj){return _obj.props.path;});},[children]);}

  exports.Switch = reactRouter.Switch;
  exports.Route = reactRouter.Route;
  exports.withRouter = reactRouter.withRouter;
  exports.connect = reactRedux.connect;
  exports.createModel = core.createModel;
  exports.useApp = useApp;
  exports.Mothership = Mothership;
  exports.createApp = createApp;
  exports.useNavigator = useNavigator;
  exports.Boundary = Boundary;
  exports.createFeature = createFeature;
  exports.ViewNotFoundError = ViewNotFoundError;
  exports.Link = Link;
  exports.NavLink = NavLink;
  exports.Redirect = Redirect;
  exports.Scope = Scope;
  exports.useScope = useScope;
  exports.useProvided = useProvided;
  exports.createStore = createStore;
  exports.withDispatch = withDispatch;
  exports.useAppEffect = useAppEffect;
  exports.sconnect = sconnect;
  exports.$$ = $$;
  exports._$ = _$;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
