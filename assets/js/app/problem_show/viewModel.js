define(['knockout', 'knockout-mapping'], function(ko, mapping){
	var teamInfoViewModel = function(teamId) {

		/*var self = this;
		self.team = ko.observable();

		self.initialize = function(teamId) {
			self.getTeamInfo(teamId);
		};

		self.getTeamInfo = function(teamId) {
			$.ajax({
				url: '/team/find',
				type: 'POST',
				data: { id: teamId }
			})
			.success(self.teamInfoReceived)
			.error(self.teamInfoReceived);
		};

		self.teamInfoReceived = function(data) {
			self.team(mapping.fromJS(data));
		}

		self.ajaxError = function(data) {
			
		}

		self.initialize(teamId);	*/
		
	};

	return teamInfoViewModel;
});
