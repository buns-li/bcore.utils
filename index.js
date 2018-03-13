const bcore = require("bcore");

const time = require("./lib/time/index");
const valid = require("./lib/valid/index");

bcore.on("utils", function() {
  this.__init = function() {};
  this.time = time;
  this.valid = valid;
});
