
/*
|--------------------------------------------------------------------------
| Tier 3 - Pro Tracker
|--------------------------------------------------------------------------
|
| Used By Tier 3 Agents To Capture Call Data.
*/
; (PACT3 = ($, DOMPurify) => {
    // Whole-script strict mode syntax
    'use strict';

    // Contains the final form values that will be used to send to slack.
    let finalFormValuesToSlack;

    let ticketCreated = "` No Ticket Created `";
    const successString = "Success. Ready To Submit To Slack!";
    const successSlack = "Submitted To Slack!";
    //set domains N/A checkbox change checks

    // declare the form elements to minimize dom calls.
    // Input Boxes
    const customerBox = $('#customerBox');
    const nameBox = $('#nameBox');
    const situationBox = $('#situationBox');
    const nameDifferntCheckbox = $('#nameNA');
    const escalationNumber = $('#escalationNumber');
    // comments area.
    const commentsBox = $("#commentsBox")
    const hiddenCommentsDiv = $('#hiddenComments')

    // Topics 
    const Domains = $('#Domains');
    const Hosting = $('#Hosting');
    const Email = $('#Email');
    const Websites = $('#Websites');
    const Security = $('#Security');
    const BusinessTools = $('#BusinessTools');
    const Other = $('#Other');
    const inputNameProductsCalledAbout = $("input[name='productsCalledAbout']");

    // Resolutions
    const resolvedCheckbox = $('#resolvedCheckbox');
    const scopeCheckbox = $('#scopeCheckbox');
    const ticketCheckbox = $('#ticketCheckbox');
    const inputNameResolutionCheckboxes = $("input[name='resolutionCheckboxes']");

    // Buttons
    const parseButton = $('#parseButton');
    const resetButton = $('#resetButton');
    const SubmitSlack = $('#SubmitSlack');

    // Output
    const resultsOutput = $('#resultsOutput');
    const hiddenResultsArea = $('#hiddenResultsArea');

    /*
    |--------------------------------------------------------------------------
    | Click listener on the parse button handles form inputs logic
    | Sanitize the inputs and perform error checking then format values for slack
    |--------------------------------------------------------------------------
    */
    parseButton.click(function () {
        if (areThereFormErrors() === false) {
            processOutput();
        } else {
            handleError(areThereFormErrors())
        }

        /*
        |--------------------------------------------------------------------------
        | Function Declaration Block. 
        |--------------------------------------------------------------------------
        *///Check for errors before enabling slack submission
        function areThereFormErrors() {
            if (DOMPurify.sanitize(customerBox.val().trim()) === "") { return "Enter a valid customer number"; }
            if (nameDifferntCheckbox.is(':checked') && DOMPurify.sanitize(nameBox.val().trim()) === "") { return "Must enter caller name or alias"; }
            if (DOMPurify.sanitize(situationBox.val().trim()) === "" || situationBox.val().length <= 7) { return "Describe the situation. At least a sentence or two."; }
            if (Other.is(':checked') && DOMPurify.sanitize(commentsBox.val().trim()) === "") { return "Enter comments about the topic."; }
            if (ticketCheckbox.is(':checked') && DOMPurify.sanitize(escalationNumber.val().trim()) === "") { return "Enter ticket number." }
            return false;
        }

        //When errrs occur then areThereFormErrors is passed to handleError.
        function handleError(error) {
            if (error !== false) {
                $("#errorPTag").removeAttr("hidden");
                $("#errorP").html(error);
                setTimeout(() => {
                    $("#errorPTag").attr('hidden', 'hidden');
                    $("#errorP").html('');
                }, 3000);
            }
        }

        //Parse from inputs and show note template
        function processOutput() {
            resultsOutput.val(resultsFormatter())
            SubmitSlack.prop('disabled',false)
        }

        //Format the results from the from into a clean output for notes section. 
        function resultsFormatter() {
            let results;
            let formValues = {
                customerNumber: DOMPurify.sanitize(customerBox.val().trim()),
                callerName: DOMPurify.sanitize(nameBox.val().trim()),
                products: [],
                situation: DOMPurify.sanitize(situationBox.val().trim()),
                resolved: false,
                oos: false,
                escalationCreated: false,
                ticketNumber: '',
                comments: '',
            }
            //loop through topics checkboxes for values.
            inputNameProductsCalledAbout.each(function (index, item) {
                if ($(item).is(':checked')) { formValues.products.push(` ${$(item).prop('id')}`); }
                if ($(item).is(':checked') && $(item).prop('id') === 'Other') { formValues.comments = DOMPurify.sanitize(commentsBox.val().trim()); }
            })
            //Loop through the resolution checkboxes. 
            inputNameResolutionCheckboxes.each(function (index, item) {
                if ($(item).is(':checked') && $(item).prop('id') === 'resolvedCheckbox') { formValues.resolved = true; }
                if ($(item).is(':checked') && $(item).prop('id') === 'scopeCheckbox') { formValues.oos = true; }
                if ($(item).is(':checked') && $(item).prop('id') === 'ticketCheckbox') { formValues.escalationCreated = true; formValues.ticketNumber = DOMPurify.sanitize(escalationNumber.val().trim()); }
            })

            // Catching if no name provided.
            if (formValues.callerName === '') { formValues.callerName = 'Same as account name'; }

            // Formatting values.
            results = `Customer #: ${formValues.customerNumber}\nCaller: ${formValues.callerName}\n\nProducts Related To Inquiry:${formValues.products.toString()}\n\nSituation: ${formValues.situation}\nResolved: ${formValues.resolved ? 'True' : 'False'}\nOut of Scope: ${formValues.oos ? 'True' : 'False'}\nEscalation Created: ${formValues.escalationCreated ? `True - Ticket ${formValues.ticketNumber}` : 'False'}\nComments: ${formValues.comments === '' ? 'N/A' : formValues.comments}`;
            finalFormValuesToSlack = formValues;
            hiddenResultsArea.removeAttr("hidden");
            return results;
        }
    })

    /*
    |--------------------------------------------------------------------------
    | Submit To Slack function Handled with click event. 
    |--------------------------------------------------------------------------
    | For slack configuration please view the API documentation for Incoming Webhooks
    | https://godaddy.slack.com/apps/A0F7XDUAZ-incoming-webhooks?page=1
    */
    SubmitSlack.on('click',function () {
        console.log(`here is the object to work with in slack function. ${JSON.stringify(finalFormValuesToSlack)}`)
        SubmitSlack.prop('disabled', true);
        parseButton.prop('disabled', true);
    })

    /*
    |--------------------------------------------------------------------------
    | Event Handlers and form reset function
    |--------------------------------------------------------------------------
    */

    //reset form values and variables
    resetButton.on('click', function() {
        inputNameProductsCalledAbout.each(function (index,item) { $(item).prop('checked',false).prop('disabled', false); })
        inputNameResolutionCheckboxes.each(function (index,item) { $(item).prop('checked',false).prop('disabled', false); })
        nameDifferntCheckbox.prop('checked',false);
        customerBox.val('');
        nameBox.val('').prop('disabled', true);
        commentsBox.prop('disabled', true).val('');
        escalationNumber.prop('disabled', true).val('').attr('hidden', 'hidden');
        hiddenCommentsDiv.attr('hidden', 'hidden');
        situationBox.val('');
        
        finalFormValuesToSlack = '';
        SubmitSlack.prop('disabled',true)
        hiddenResultsArea.attr('hidden', 'hidden')     
        resultsOutput.val('');
        parseButton.prop('disabled', false);
    })

    // This listener will fire if the user chooses to enter a caller name manually.
    nameDifferntCheckbox.on('change', function () {
        if (nameDifferntCheckbox.is(':checked')) {
            nameBox.prop('disabled', false).prop('placeholder', 'Enter Caller Name.');
        } else if (!nameDifferntCheckbox.is(':checked')) {
            nameBox.prop('disabled', true).prop('placeholder', 'Same As Account Name.');
        }
    })

    //This listener is if a ticket was created. Allows ticket number input.
    ticketCheckbox.on('change', function () {
        if (ticketCheckbox.is(':checked')) {
            escalationNumber.prop('disabled', false).removeAttr('hidden');
        } else {
            escalationNumber.prop('disabled', true).val('').attr('hidden', 'hidden');
        }
    })

    // This listener will fire when user clicks a call topic.
    inputNameProductsCalledAbout.on('change', function () {
        if ($(this).prop('id') !== 'Other') { Other.prop('disabled', true).prop('checked', false); }
        if (Other.is(':checked')) {
            //Enable/disable comments area.
            commentsBox.prop('disabled', false).val('');
            hiddenCommentsDiv.removeAttr('hidden');
            //Enable/disable call topics.
            Domains.prop('disabled', true).prop('checked', false);
            Hosting.prop('disabled', true).prop('checked', false);
            Email.prop('disabled', true).prop('checked', false);
            Websites.prop('disabled', true).prop('checked', false);
            Security.prop('disabled', true).prop('checked', false);
            BusinessTools.prop('disabled', true).prop('checked', false);
        } else if (!Other.is(':checked')) {
            //Enable/disable comments area.
            commentsBox.prop('disabled', true).val('');
            hiddenCommentsDiv.attr('hidden', 'hidden');
            //Enable/disable call topics.
            Domains.prop('disabled', false);
            Hosting.prop('disabled', false);
            Email.prop('disabled', false);
            Websites.prop('disabled', false);
            Security.prop('disabled', false);
            BusinessTools.prop('disabled', false);
        }
        if (!inputNameProductsCalledAbout.is(':checked')) {
            Other.prop('disabled', false);
        }
    })
})($, DOMPurify);// Dom purify should be used to sanitize all fields. Passing Jquery in with $.
