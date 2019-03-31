
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

    let customerNum;
    let customerName;
    let productsCalledAbout = [];
    let notesSubject;
    let callResolution;
    let isOutOfScope;
    let comments;

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

    // Buttons
    const parseButton = $('#parseButton');
    const resetButton = $('#resetButton');
    const SubmitSlack = $('#SubmitSlack');

    /*
    |--------------------------------------------------------------------------
    | Click listener on the parse button handles form inputs logic
    | Sanitize the inputs and perform error checking then format values for slack
    |--------------------------------------------------------------------------
    */
    parseButton.click(function () {
        if (areThereFormErrors() === false) {
            console.log(`clicked`)
            customerNum = DOMPurify.sanitize(customerBox.val().toLowerCase().trim());
            customerName = DOMPurify.sanitize(nameBox.val().toLowerCase().trim());
            console.log(`customer number : ${customerNum} and the customer name : ${customerName}`);


        } else {
            handleError(areThereFormErrors())
        }



        /*
        |--------------------------------------------------------------------------
        | Function Declaration Block. 
        |--------------------------------------------------------------------------
        */

        //Check for errors before enabling slack submission
        function areThereFormErrors() {
            if (DOMPurify.sanitize(customerBox.val().trim()) === "" ) { return "Enter a valid customer number"; }
            if (nameDifferntCheckbox.is(':checked') && DOMPurify.sanitize(nameBox.val().trim()) === "") { return "Must enter caller name or alias"; }
            if (DOMPurify.sanitize(situationBox.val().trim()) === "" || situationBox.val().length <= 7) { return "Describe the situation. At least a sentence or two."; }
            if (Other.is(':checked') && DOMPurify.sanitize(commentsBox.val().trim()) === "") { return "Enter comments about the topic." }
            return false;
        }
        //When errrs occur then areThereFormErrors is passed to handleError.
        function handleError(error) {
            if (error !== false) {
                $("#errorPTag").removeAttr("hidden");
                $("#errorP").html(error);
                timeoutModule = setTimeout(() => {
                    $("#errorPTag").attr('hidden', 'hidden');
                    $("#errorP").html('');
                }, 3000);
            }
        }




        //Adds backticks ` for formatting in Slack
        // function formatValues() {
        //     domains = "` " + domains + " `";
        //     guid = "` " + guid + " `";
        //     attributes = "`" + attrArray + "`";
        //     training = "`" + oppsArray + "`";
        // }

        //received error string
        
    })

    /*
    |--------------------------------------------------------------------------
    | Event Handlers and form reset function
    |--------------------------------------------------------------------------
    | For slack configuration please view the API documentation for Incoming Webhooks
    | https://godaddy.slack.com/apps/A0F7XDUAZ-incoming-webhooks?page=1
    */

    // This listener will fire if the user chooses to enter a caller name manually.
    nameDifferntCheckbox.on('change', function () {
        if (nameDifferntCheckbox.is(':checked')) {
            nameBox.prop('disabled', false).prop('placeholder', 'Enter Caller Name.');
        } else if (!nameDifferntCheckbox.is(':checked')) {
            nameBox.prop('disabled', true).prop('placeholder', 'Same As Account Name.');
        }
    })

    ticketCheckbox.on('change', function () {
        if (ticketCheckbox.is(':checked')) { 
            escalationNumber.prop('disabled', false).removeAttr('hidden');
        } else {
            escalationNumber.prop('disabled', true).val('').attr('hidden','hidden');
        }
    })

    // This listener will fire when user clicks a call topic.
    inputNameProductsCalledAbout.on('change', function(){
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
        if(!inputNameProductsCalledAbout.is(':checked')) {
            Other.prop('disabled', false);
        }
    })
    


    //reset form values and variables
    // function handleReset() {
    //     clearTimeout(timeoutModule);
    //     $("input[type='checkbox']").prop('checked', false);
    //     $("input[type='radio']").prop('checked', false);
    //     $("input[type='text']").val('').attr('disabled', false);
    //     $("#SubmitSlack").attr('disabled', 'disabled');
    //     $("input[name='checkboxNA']").prop('checked', false).removeAttr('disabled');
    //     $('#errorPTag').removeClass().attr('hidden', 'hidden').attr('class', 'uk-alert-danger uk-text-center uk-text-capitalize uk-margin-remove-vertical uk-margin-left uk-alert')
    //     $('#mustDomain').attr('hidden', 'hidden');
    //     $('#mustGuid').attr('hidden', 'hidden');
    //     $("#parseButton").removeAttr('disabled');
    //     $('input[type=checkbox]:disabled').removeAttr('disabled');
    //     $("#errorP").html('');
    //     demeanor = '';
    //     understanding = '';
    //     domains = '';
    //     guid = '';
    //     attributes = '';
    //     training = '';
    //     ticketCreated = "` No Ticket Created `";;
    //     attrArray = [];
    //     oppsArray = [];
    // }

})($, DOMPurify);
