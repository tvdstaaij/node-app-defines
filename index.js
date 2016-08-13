'use strict';

// Adapted from the public domain function published at
// https://github.com/substack/deep-freeze
function freezeDeep(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach((prop) => {
    if (o.hasOwnProperty(prop) &&
        o[prop] !== null &&
        (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
        !Object.isFrozen(o[prop])) {
      freezeDeep(o[prop]);
    }
  });
}

const defines = {};

defines.freeze = () => {
  defines.freeze = () => {};
  freezeDeep(defines);
  return defines;
};

module.exports = defines;
