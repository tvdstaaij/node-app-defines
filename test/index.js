'use strict';

const {expect} = require('chai');
const defines = require('..');

const testPayload = {
  aString: 'abc',
  aNumber: 42,
  anArray: [1, 2, 3, 4],
  anObject: {
    aSubProperty: 3.14,
    anotherSubProperty: [1, 'www', {}]
  }
}

describe('defines', () => {
  
  it('should be writable before freeze', () => {
    Object.assign(defines, testPayload);
    for (const key in testPayload) {
      expect(testPayload[key]).to.deep.equal(defines[key]);
    }
  });

  it('should freeze and return the container', () => {
    expect(defines.freeze()).to.equal(defines);
  });

  it('should not be writable after freeze', () => {
    expect(() => defines.aNumber++)
      .to.throw(TypeError);
    expect(() => defines.badProperty = false)
      .to.throw(TypeError);
    expect(() => defines.anObject.aSubProperty = 1)
      .to.throw(TypeError);
    expect(() => defines.anObject.anotherSubProperty.push(10))
      .to.throw(TypeError);
    expect(() => defines.anObject.anotherSubProperty[0] = 10)
      .to.throw(TypeError);
    expect(() => delete defines.aString)
      .to.throw(TypeError);
  });

  it('should tolerate a second freeze', () => {
    expect(defines.freeze()).to.equal(defines);
    expect(() => defines.aNumber++)
      .to.throw(TypeError);
    expect(defines.aNumber).to.equal(testPayload.aNumber);
  });

});
