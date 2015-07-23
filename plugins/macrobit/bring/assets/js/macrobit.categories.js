jQuery(function ($) {

    // Get and hide the options
    var recordOptions, recordShowClass;

    recordOptions = $('.bring-records-type').hide();

    // Watch for changes
    $('.bring-records-type-controller').on('change', 'select', function (event) {
        recordOptions.hide();
        setRecordType($(this).val());
        recordOptions.filter(recordShowClass).show();
    });

    // Set the initial state
    setRecordType($('.bring-records-type-controller select').trigger('change'));

    /**
     * Set the class to filter by
     * @param selectedValue
     */
    function setRecordType(selectedValue) {
        recordShowClass = '.type-' + selectedValue;
    }
});