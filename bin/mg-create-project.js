#!/usr/bin/env node

require = require('esm')(module /*, options*/);
// import('esm')(module)
import('../src/cli').cli(process.argv);