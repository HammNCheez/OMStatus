define(['knockout', 'moment'], function(ko, moment) {
	ko.bindingHandlers.date = {
		update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			try {
				var value = valueAccessor();

				if (value === undefined) { return; }

				var valueUnwrapped = ko.unwrap(value);

				var format = allBindings.get('format') || 'MM/DD/YYYY';

				var formattedDate = moment(valueUnwrapped).format(format);

				$(element).html(formattedDate);
			} 
			catch(e) { }
		}
	};
});