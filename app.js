const native = require(__dirname + '/build/Release/concept2.node');

module.exports = native;

module.exports.PMtypes = {
	PM3_PRODUCT_NAME: "Concept II PM3",
    PM3_PRODUCT_NAME2: "Concept2 Performance Monitor 3 (PM3)",
    PM3TESTER_PRODUCT_NAME: "Concept 2 PM3 Tester",
    PM4_PRODUCT_NAME: "Concept2 Performance Monitor 4 (PM4)",
    PM5_PRODUCT_NAME: "Concept2 Performance Monitor 5 (PM5)",
};

var workTypes = {
	Programmed: 0x00,
    TwoKm500Split: 0x01,
    FiveKm1000Split: 0x02,
    TenKm2000Split: 0x03,
    ThirdyMin6minSplit: 0x04,
    FiftyMetersIntMinuteRest: 0x05
}

module.exports.workTypes = workTypes;

module.exports.units = {
	Meters: 0x24,
    Kilometers: 0x21
}

var commands = require("./commands.js");
module.exports.commands = commands;

var PM = function(deviceNumber) {
	this.deviceNumber = deviceNumber;
};

PM.prototype.reset = function() {
	native.executeCommand(this.deviceNumber, [
		commands.CSAFE_GOFINISHED_CMD,
		commands.CSAFE_GOIDLE_CMD,
		commands.CSAFE_RESET_CMD,
	]);
};

PM.prototype.start = function() {
	native.executeCommand(this.deviceNumber, [
		commands.CSAFE_GOHAVEID_CMD,
		commands.CSAFE_GOINUSE_CMD
	]);
};

PM.prototype.goInUse = function() {
	native.executeCommand(this.deviceNumber, [
		commands.CSAFE_GOINUSE_CMD
	]);
};

PM.prototype.setWorkout = function(workType) {
	native.executeCommand(this.deviceNumber, [
		commands.CSAFE_SETPROGRAM_CMD,
		0x02,
		workType,
		0x00
	]);
};

PM.prototype.setTimeWork = function(hours,minutes,seconds) {
	native.executeCommand(this.deviceNumber, [
		commands.CSAFE_SETTWORK_CMD,
		0x03,
		hours,
		minutes,
		seconds,

	]);
};

function toBytesInt32 (num) {
    arr = new Uint8Array([
         (num & 0xff000000) >> 24,
         (num & 0x00ff0000) >> 16,
         (num & 0x0000ff00) >> 8,
         (num & 0x000000ff)
    ]);
    return arr;
}

PM.prototype.setSplitDuration = function(type, duration) {
	var t = toBytesInt32(duration);
	var command = [
		//0xF1,
		commands.CSAFE_SETUSERCFG1_CMD,
		0x07,
		commands.CSAFE_PM_SET_SPLITDURATION,
		0x05,
		type,
		t[3],
		t[2],
		0x00,
		0x00,
	];
	console.log(command);
	native.executeCommand(this.deviceNumber, command);
};

PM.prototype.setDistance = function(distance, type) {
	var t = toBytesInt32(distance);
	var command = [
		commands.CSAFE_SETHORIZONTAL_CMD,
		0x03,
		t[3],
		t[2],
		type,
	];
	native.executeCommand(this.deviceNumber, command);
};


PM.prototype.getTimeWork = function() {
  var command = [
  	0xF1,
    commands.CSAFE_SETUSERCFG1_CMD,
    0x01,
    commands.CSAFE_PM_GET_WORKTIME,
    0xBB,
    0xF2
  ];
  var b = native.executeCommand(this.deviceNumber, command);
  console.log(b);
  var i =
  	  (b[7] << 24)
  	| (b[6] << 16)
  	| (b[5] << 8)
  	| (b[4])
  	| (b[8]);
  return i;
};

PM.prototype.getHorizontalDistance = function() {
	var command = [
		commands.CSAFE_GETHORIZONTAL_CMD
	];
	var data = native.executeCommand(this.deviceNumber, command);
	return (data[3] * 256) + data[2];
}


module.exports.PM = PM;