# app-defines

[![npm version](https://img.shields.io/npm/v/app-defines.svg)](https://www.npmjs.com/package/app-defines)
[![npm license](https://img.shields.io/npm/l/app-defines.svg)](https://www.npmjs.com/package/app-defines)

```javascript
const defines = require('app-defines');

// Set all defines once for the lifetime of the process
defines.someConstant = 42;
defines.someOtherConstant = {luck: 'good'};

// Finalize the defines
defines.freeze();

// Defines are now irreversibly read-only (including nested properties)
defines.someOtherProperty.luck = 'bad'; // Throws TypeError

// The read-only defines object can now be required from anywhere in the app
```

The object is frozen with the technique used in [deep-freeze][1].

This module is rather trivial, but useful to have as an external module, so that
the defines can be required from any file in the project without the need of
relative requires.

This module is intended for use in application code only and should *not*
be used in dependencies!

[1]: https://github.com/substack/deep-freeze
