$(document).ready(function() {
  $("#longtermTimePicker").datetimepicker();
  $("#sponTimePicker").datetimepicker();

  $('#problem').change(function() {
    if ($(this).val() != 'P') {
      $("#division option[value='P']").prop({
        'disabled': true
      });
      $("#division option[value='1']").prop({
        'disabled': false
      });
      $("#division option[value='2']").prop({
        'disabled': false
      });
      $("#division option[value='3']").prop({
        'disabled': false
      });
      $("#division option[value='4']").prop({
        'disabled': false
      });
    } else {
      $("#division option[value='P']").prop({
        'disabled': false
      });
      $("#division option[value='1']").prop({
        'disabled': true
      });
      $("#division option[value='2']").prop({
        'disabled': true
      });
      $("#division option[value='3']").prop({
        'disabled': true
      });
      $("#division option[value='4']").prop({
        'disabled': true
      });
    }
  });
});
