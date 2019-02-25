/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/practice/webpack/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/practice/webpack/BusinessMember.js":
/*!************************************************!*\
  !*** ./src/practice/webpack/BusinessMember.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BusinessMember; });\n/* harmony import */ var _member__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./member */ \"./src/practice/webpack/member.js\");\n\n\n\nclass BusinessMember extends _member__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(firstName, lastName, company) {\n    super(firstName, lastName); // 親クラスのコンストラクタは、コンストラクタの1行目で記載する必要がある\n\n    this.company = company;\n  }\n\n  get company() {\n    return this._company;\n  }\n\n  set company(value) {\n    this._company = value;\n  }\n\n  getName() {\n    return this.lastName + ' ' + this.firstName + '/' + this.company;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/practice/webpack/BusinessMember.js?");

/***/ }),

/***/ "./src/practice/webpack/index.js":
/*!***************************************!*\
  !*** ./src/practice/webpack/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _BusinessMember__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BusinessMember */ \"./src/practice/webpack/BusinessMember.js\");\n\n\n\nlet pro = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve('ok');\n  }, 500);\n});\npro.then(response => {\n  let user = new _BusinessMember__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('suzu', 'Nagano', 'maxmouse');\n  console.log(user.getName());\n});\n\n//# sourceURL=webpack:///./src/practice/webpack/index.js?");

/***/ }),

/***/ "./src/practice/webpack/member.js":
/*!****************************************!*\
  !*** ./src/practice/webpack/member.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Member; });\n\n\nclass Member {\n  constructor(firstName, lastName) {\n    this.firstName = firstName;\n    this.lastName = lastName;\n  }\n\n  getName() {\n    return this.lastName + ' ' + this.firstName;\n  }\n\n  get firstName() {\n    return this._firstName;\n  }\n\n  set firstName(value) {\n    this._firstName = value;\n  }\n\n  get lastName() {\n    return this._lastName;\n  }\n\n  set lastName(value) {\n    this._lastName = value;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/practice/webpack/member.js?");

/***/ })

/******/ });