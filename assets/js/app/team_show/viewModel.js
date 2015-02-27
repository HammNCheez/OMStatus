define(['jquery', 'knockout', 'knockout-mapping', 'app/header', 'knockout-date'], function($, ko, mapping, header, date){
	var teamInfoViewModel = function(teamId, tab) {
		var self = this;
		self.team = ko.observable();;
		self.header = new header(tab);

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
			.error(self.ajaxError);
		};

		self.teamInfoReceived = function(data) {
			//self.team = mapping.fromJS(data);
			self.team(mapping.fromJS(data));
		}

		self.ajaxError = function(data) {}

		self.showRow = function(rowName) {
			return self.team() !== undefined 
			&& self.team() !== null 
			&& self.team()[rowName] !== undefined 
			&& self.team()[rowName]() !== null;	
		};

		self.removeFlag = function(flag) {
			$.ajax({
				url: '/team/removeFlag',
				type: 'POST',
				data: { 
						id: self.team().id, 
						flag: flag
					  }
			})
			.success(self.removeFlagResult);
		};

		self.removeFlagResult = function(data) {
			//self.team = mapping.fromJS(data);
			//self.team(mapping.fromJS(data));
			delete self.team()[flag];
		}

		self.initialize(teamId);	
	};

	return teamInfoViewModel;
});
