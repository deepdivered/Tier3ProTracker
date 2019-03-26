
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

    /*
    |--------------------------------------------------------------------------
    | Click listener on the parse button handles form inputs logic
    | Sanitize the inputs and perform error checking then format values for slack
    |--------------------------------------------------------------------------
    */
    $("#parseButton").click(function () {
        if (areThereFormErrors() === false) {
            console.log(`clicked`)
            customerNum = DOMPurify.sanitize($('#customerBox').val().toLowerCase().trim());
            customerName = DOMPurify.sanitize($('#nameBox').val().toLowerCase().trim());
            console.log(`customer number : ${customerNum} and the customer name : ${customerName}`);
        


        
        }



        /*
        |--------------------------------------------------------------------------
        | Function Declaration Block. 
        |--------------------------------------------------------------------------
        */

        //Check for errors before enabling slack submission
        // function errorCheck() {
        //     if (domains.trim() === "" && domains.toUpperCase().trim() !== "N/A") { return "Enter a valid domain"; }
        //     if (domains.toUpperCase().trim() === "N/A" && !$('#domainsNA').is(":checked")) { return "Must enter domain OR guid"; }
        //     if (guid.toUpperCase().trim() === "N/A" && !$('#guidNA').is(":checked")) { return "Must enter domain OR guid"; }
        //     if (guid.trim() === "" && guid.toUpperCase().trim() !== "N/A") { return "Enter a valid guid"; }
        //     if (domainsRegex.exec(domains.trim()) === null && domains.toUpperCase().trim() !== "N/A") { return "Enter a valid domain"; }
        //     if (!$("input[name='radioDemeanor']:checked").val()) { return "Please select a call demeanor"; }
        //     if (!$("input[name='radioUnderstanding']:checked").val()) { return "Please select agent understanding"; }
        //     if (!$("input[name='CallAttributes']:checked").val()) { return "Please select call attribute(s)"; }
        //     if (!$("input[name='TrainingOpp']:checked").val()) { return "Please select a training option"; }
        //     return false;
        // }
        //Adds backticks ` for formatting in Slack
        // function formatValues() {
        //     domains = "` " + domains + " `";
        //     guid = "` " + guid + " `";
        //     attributes = "`" + attrArray + "`";
        //     training = "`" + oppsArray + "`";
        // }

        //received error string
        // function handleError(error) {
        //     if (error !== false) {
        //         $("#errorPTag").removeAttr("hidden");
        //         $("#errorP").html(error);
        //         timeoutModule = setTimeout(() => {
        //             $("#errorPTag").attr('hidden', 'hidden');
        //         }, 8000);
        //     }
        // }
    })

    /*
    |--------------------------------------------------------------------------
    | Event Handlers and form reset function
    |--------------------------------------------------------------------------
    | For slack configuration please view the API documentation for Incoming Webhooks
    | https://godaddy.slack.com/apps/A0F7XDUAZ-incoming-webhooks?page=1
    */

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
