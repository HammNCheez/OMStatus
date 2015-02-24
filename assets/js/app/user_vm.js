var userViewModel = function() {
	var self = this;

	self.users = ko.observableArray();
	self.roles = ko.observableArray();
	self.assignedRoles = ko.observableArray();
	self.availableRoles = ko.observableArray();
	self.selectedUser = ko.observable();

	self.initialize = function(){
		self.getUsers();
		self.getRoles();
	};

	self.getUsers = function() {
		$.ajax({
			url: '/user/getUsers'
		}).success(function(data){
			self.users.push.apply(self.users, data);
		});
	};

	self.getRoles = function() {
		$.ajax({
			url: '/role/getRoles'
		}).success(function(data){

			var mappedData = data.map(function(role) {
				return role.name;
			})
			self.roles.push.apply(self.roles, mappedData);
		});
	};

	self.getUserAssignedRoles = function (user) {
		self.selectedUser(user);

		self.assignedRoles.removeAll();
		self.assignedRoles.push.apply(self.assignedRoles, user.roles.map(function(role) { return role.toLowerCase();}));

		var diff = self.roles().filter(function(role) {
			return self.assignedRoles.indexOf(role.toLowerCase()) === -1;
		});
		
		self.availableRoles.removeAll();
		self.availableRoles.push.apply(self.availableRoles, diff);
	};

	self.addRole = function(role) {
		self.availableRoles.remove(role);
		self.assignedRoles.push(role);
		self.assignedRoles.sort();

		self.selectedUser().roles.push(role);

		$.ajax({
			url: '/user/update/' + self.selectedUser().id,
			data: self.selectedUser()
		})
	};

	self.removeRole = function(role) {
		self.assignedRoles.remove(role);
		self.availableRoles.push(role);
		self.availableRoles.sort(role);

		self.selectedUser().roles.splice(self.selectedUser().roles.indexOf(role));

		$.ajax({
			url: '/user/update/' + self.selectedUser().id,
			data: self.selectedUser()
		})
	};

	self.isActive = function(userName) {
		if (self.selectedUser() === null || self.selectedUser() === undefined) {
			return false;
		}

		return self.selectedUser().name === userName;
	};

	self.initialize();
}