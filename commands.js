module.exports = {
	CSAFE_GETSTATUS_CMD: 0x80,
	CSAFE_RESET_CMD: 0x81,
	CSAFE_GOIDLE_CMD: 0x82,
	CSAFE_GOHAVEID_CMD: 0x83,
	CSAFE_GOINUSE_CMD: 0x85,
	CSAFE_GOFINISHED_CMD: 0x86,
	CSAFE_GOREADY_CMD: 0x87,
	CSAFE_BADID_CMD: 0x88,
	CSAFE_GETVERSION_CMD: 0x91,
	CSAFE_GETID_CMD: 0x92,
	CSAFE_GETUNITS_CMD: 0x93,
	CSAFE_GETSERIAL_CMD: 0x94,
	CSAFE_GETODOMETER_CMD: 0x9B,
	CSAFE_GETERRORCODE_CMD: 0x9C,
	CSAFE_GETTWORK_CMD: 0xA0,
	CSAFE_GETHORIZONTAL_CMD: 0xA1,
	CSAFE_GETCALORIES_CMD: 0xA3,
	CSAFE_GETPROGRAM_CMD: 0xA4,
	CSAFE_GETPACE_CMD: 0xA6,
	CSAFE_GETCADENCE_CMD: 0xA7,
	CSAFE_GETUSERINFO_CMD: 0xAB,
	CSAFE_GETHRCUR_CMD: 0xB0,
	CSAFE_GETPOWER_CMD: 0xB4,
	CSAFE_AUTOUPLOAD_CMD: 0x01,
	CSAFE_IDDIGITS_CMD: 0x10,
	CSAFE_SETDATE_CMD: 0x12,
	CSAFE_SETTIMEOUT_CMD: 0x13,
	CSAFE_SETUSERCFG1_CMD: 0x1A,
	CSAFE_SETTWORK_CMD: 0x20,
	CSAFE_SETHORIZONTAL_CMD: 0x21,
	CSAFE_SETCALORIES_CMD: 0x23,
	CSAFE_SETPROGRAM_CMD: 0x24,
	CSAFE_SETPOWER_CMD: 0x34,
	CSAFE_GETCAPS_CMD: 0x70,
	CSAFE_SETPMCFG_CMD: 0x76,
	CSAFE_SETPMDATA_CMD: 0x77,
	CSAFE_GETPMCFG_CMD: 0x7E,
	CSAFE_GETPMDATA_CMD: 0x7F,
	CSAFE_GETWORKOUT_STATE: 0x8D,
	CSAFE_GET_RACEMODESTATUS: 0x98,
	CSAFE_PM_GET_WORKTIME: 0xA0,
	CSAFE_PM_GET_PROJECTED_WORKTIME: 0xA1,
	CSAFE_PM_GET_TOTAL_RESTTIME: 0xA2,
	CSAFE_PM_GET_WORKDISTANCE: 0xA3,
	CSAFE_PM_GET_TOTAL_WORKDISTANCE: 0xA4,
	CSAFE_PM_GET_PROJECTED_WORKDISTANCE: 0xA5,
	CSAFE_PM_GET_RESTDISTANCE: 0xA6,
	CSAFE_PM_GET_TOTAL_RESTDISTANCE: 0xA7,
	CSAFE_PM_GET_STROKE_500M_PACE: 0xA8,
	CSAFE_PM_GET_STROKE_POWER: 0xA9,
	CSAFE_PM_GET_STROKE_CALORICBURNRATE: 0xAA,
	CSAFE_PM_GET_SPLIT_AVG_500M_PACE: 0xAB,
	CSAFE_PM_SET_SCREENSTATE: 0x13,
	CSAFE_PM_CONFIGURE_WORKOUT: 0x14,
	CSAFE_PM_SET_WORKOUTTYPE: 0x01,
	CSAFE_PM_SET_STARTTYPE: 0x02,
	CSAFE_PM_SET_WORKOUTDURATION: 0x03,
	CSAFE_PM_SET_RESTDURATION: 0x04,
	CSAFE_PM_SET_SPLITDURATION: 0x05,
	CSAFE_PM_SET_TARGETPACETIME: 0x06,
	CSAFE_PM_SET_RACEOPERATIONTYPE: 0x1E,
	CSAFE_PM_GET_WORKOUTSTATE: 0x8D
}