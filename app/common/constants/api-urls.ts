export const apiUrls = {
	host: "https://balancepositiondemo.com/",
	urls: {
		focusDatumResource: {
			createMetricDatum: "api/metric-data"
		},
		moodDatumResource: {
			createMoodDatum: "api/metric-data"
		},
		performanceDatumResource: {
			createPerformanceDatum: "api/metric-data"
		},
		injuryDatumResource: {
			createInjuryDatum: "api/metric-data"
		},
		interestDatumResource: {
			createInterestDatum: "api/metric-data"
		},
		appetiteDatumResource: {
			createAppetiteDatum: "api/metric-data"
		},
		energyDatumResource: {
			createEnergyDatum: "api/metric-data"
		},
		sleepDatumResource: {
			createSleepDatum: "api/sleep-data"
		},
		stressDatumResource: {
			createStressDatum: "api/metric-data"
		},
		bodyDatumResource: {
			createBodyDatum: "api/body-data"
		},
		metricDatumResource : {
			getAllMetricData: "api/metric-data"
		},
		dataPointResource: {
			createUserDataPoint: "api/data-points"
		},
		dataPointResourceGet: {
			getAllDataPoints: "api/data-points"
		},
		userInfoResourcePut:{
			updateUserInfo: "/api/user-infos"
		},
		forgotPassword:
		{

			requestPasswordReset: "/api/account/reset_password/init"

		},
		changePasswordPost:
		{
			changePassword: "/api/account/change_password"

		},
		userDataGet: {
           
			getAllUserInfos: "/api/user-infos"
		
	}

	}
}