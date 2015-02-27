define(['knockout'], function(ko) {
	var vm = function(tab) {
		var self = this;

		self.primary = ko.observable(false);
		self.problem1 = ko.observable(false);
		self.problem2 = ko.observable(false);
		self.problem3 = ko.observable(false);
		self.problem4 = ko.observable(false);
		self.problem5 = ko.observable(false);

		self[tab](true);
	};

	return vm;
});