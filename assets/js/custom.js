
function formsubmit() {
    var opurl = 'https://openness-staging.onsumaye.com/index.php?option=com_products&task=githubpages_release_request';
    //var opurl='https://openness.localhost.com/index.php?option=com_products&task=githubpages_release_request';
    var form = $("#requestAccess");
    var url =
        $.ajax({
            type: form.attr('method'),
            url: opurl,
            crossDomain: true,
            data: form.serialize(),
            success: function (data) {
                var data = jQuery.parseJSON(data)
                if (data.status == 1) {
                    window.location.href = '/intel-smart-edge-open/thankyou';
                } else {
                    $("#bug").html(data.msg.serverError);
                }
                // var result=data;
                // $('#result').attr("value",result)s;

            }
        });



}


function contactformsubmit() {
    var opurl = 'https://openness-staging.onsumaye.com/index.php?option=com_products&task=githubpages_contact_request';
    var form = $("#contact");
    var url =
        $.ajax({
            type: form.attr('method'),
            url: opurl,
            crossDomain: true,
            data: form.serialize(),
            success: function (data) {
                var data = jQuery.parseJSON(data)
                if (data.status == 1) {
                    window.location.href = '/intel-smart-edge-open/thankyou';
                } else {
                    $("#bug").html(data.msg.serverError);
                }
                // var result=data;
                // $('#result').attr("value",result)s;

            }
        });



}
jQuery(document).ready(function () {

    /*jQuery('#agreecheck').on('change', function(){
         if(jQuery(this).is(':checked')){
             jQuery('small[for="agreecheck"]').css('display','none');
         }else{
             jQuery('small[for="agreecheck"]').css('display','block');
         }
    });
     $url = 'https://builders-staging.onsumaye.com/universityapi/api/v1/company-list';
        $domain = 'openness.org';
        $token = 'e96bff9b6381e0e8175b0595b08cd6d1';
        $headers = array('Content-Type: application/json','X-PW-AccessToken: '.$token, 'X-PW-DomainName: '.$domain);
        $ch = curl_init();
    
    */



    jQuery("input[name='existing_member']").click(function () {

        if (jQuery('input:radio[name=existing_member]:checked').val() == "yes") {
            $(".cn-no").hide();
            $(".cn-yes").show();
            var options = ['128 Technology', '3nfinite', '5x9 Networks', '5x9 Networks', '99cloud'
                , 'A TLC srl', 'A1 TELEKOM AUSTRIA AG', 'A1 TELEKOM AUSTRIA AG', 'A5G Networks', 'AAEON', 'Aarna Networks, Inc.',
                'Accedian', 'Accelercomm', 'Acceleron Labs', 'Accenture, LLP', 'Accelleran', 'AcceAccton Technology', 'Actian Corporation'];
            $('#companyname').empty();
            $('#companyname').append('<option value="" selected="selected">Select Company</option>');

            $.each(options, function (i, p) {
                $('#companyname').append($('<option></option>').val(p).html(p));
            });

            //get comany list data
            /*   var url='https://builders.localhost.com//universityapi/api/v1/company-list';
                     var domain = '*';
                     var token = 'e96bff9b6381e0e8175b0595b08cd6d1';
                     var headers =  { 'Content-Type': 'application/json',
                     "Access-Control-Allow-Origin":"*",
                       'X-PW-AccessToken': token, 
                       'X-PW-DomainName': domain }
         
                                  var xhr = new XMLHttpRequest();
         xhr.open('POST', url);
         xhr.setRequestHeader('Content-type','application/json');
         xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
         xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
         xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
         xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
         xhr.send();
         xhr.onreadystatechange = function() {
          // if (this.readyState == 4 && this.status == 200) {
             console.log(this.responseText);
          // }
         };*/

            /* $.ajax({
               type: "POST",
               url: url,
               headers: headers, 
               crossDomain: true,
              // dataType: 'json',
               success: function (data) {
                   console.log(data);
               // var result=data;
               // $('#result').attr("value",result);

               }
               });*/

        } else if (jQuery('input:radio[name=existing_member]:checked').val() == "no") {
            $(".cn-no").show();
            $(".cn-yes").hide();
        } else {
            $(".cn-no").hide();
            $(".cn-yes").hide();
        }
    });



    jQuery.validator.addMethod("globalNumberAllowed", function (value, element) {
        return this.optional(element) || /^[\d ()+-.]+$/.test(value);
    }, "Alphanumerics, spaces, underscores, dashes & dots only.");

    jQuery.validator.addMethod("checkValidEmail", function (value, element, param) {
        return this.optional(element) || /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i.test(value);
    }, "Please enter valid email id.");


    jQuery.validator.addMethod("numberOnly", function (value, element) {
        return this.optional(element) || value == value.match(/^[0-9]+$/);
    });
    jQuery.validator.addMethod("stringPattern", function (value, element) {
        ///^[,_()&reg;.-:{}$%@!~=+'&#39;? \\-\\s]+$/
        return true;//this.optional(element) || !(/[<>]/g.test(value));
    });
    jQuery.validator.addMethod("alphabetOnlyName", function (value, element) {
        //return this.optional(element) || value == value.match(/^[a-zA-Z-0-9 .\\-\\s]+$/);
        return this.optional(element) || value == value.match(/^[a-zA-Z \s]+$/);
    });
    jQuery.validator.addMethod("check_subscribe", function (value, element) {
        if (jQuery('#agreecheck').is(':checked')) {
            return true;
        } else {
            return false;
        }
    });

    jQuery("#requestAccess").validate({
        errorElement: 'small',
        ignore: "",
        focusInvalid: false,
        invalidHandler: function (form, validator) {
            console.log(validator)
            if (!validator.numberOfInvalids())
                return;
            jQuery('html, body').animate({
                scrollTop: jQuery(validator.errorList[0].element).offset().top
            }, 100);
        },
        rules: {
            name: {
                required: true,
                alphabetOnlyName: true,
                minlength: 3,
                maxlength: 100
            },
            last_name: {
                required: true,
                alphabetOnlyName: true,
                minlength: 3,
                maxlength: 100
            },
            email: {
                required: true,
                checkValidEmail: true
            },
            username: {
                required: true
            },
            agreecheck: {
                check_subscribe: true
            },
            existing_member: {
                required: true
            },
            companyname: {
                required: function () {
                    //console.log(jQuery('input:radio[name="existing_member"]:checked').val())
                    if (jQuery('input:radio[name="existing_member"]:checked').val() == 'yes') {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            represet_company_name: {
                required: function () {
                    if (jQuery('input:radio[name="existing_member"]:checked').val() == 'no') {
                        return true;
                    } else {
                        return false;
                    }
                },
                //minlength:3,
                maxlength: 300
            },
            primary_contact: {
                required: true,
                //minlength:3,
                maxlength: 300
            },
            interest: {
                required: true,
                //minlength:3,
                maxlength: 300
            },
            use_case: {
                required: true,
                //minlength:3,
                maxlength: 300
            },
            commercialize: {
                required: true
            },
            /* hiddenRecaptcha:{
                  required: function() {
                      if(grecaptcha.getResponse() == ''){
                          return true;
                      }else{
                          return false;
                      }
                  }
              },*/
        },
        messages: {
            name: {
                required: "Please enter First Name.",
                alphabetOnlyName: "Please enter valid Name.",
                minlength: "Please enter minimum 3 characters.",
                maxlength: "Please enter maximum 100 characters."
            },
            last_name: {
                required: "Please enter Last Name.",
                alphabetOnlyName: "Please enter valid Name.",
                minlength: "Please enter minimum 3 characters.",
                maxlength: "Please enter maximum 100 characters."
            },
            existing_member: {
                required: "Please select the option.",
            },
            primary_contact: {
                required: "Please enter primary contact.",
                //minlength: "Please enter primary contact minimum 3 characters.",
                maxlength: "Please enter primary contact maximum 300 characters."
            },
            companyname: {
                required: "Please select the company."
            },
            represet_company_name: {
                required: "Please enter the company you represent.",
                //minlength: "Please enter the company you represent minimum 3 characters.",
                maxlength: "Please enter the company you represent maximum 300 characters."
            },
            interest: {
                required: "Please enter your interested features.",
                //minlength: "Please enter your interested features minimum 3 characters.",
                maxlength: "Please enter your interested features maximum 300 characters."
            },
            use_case: {
                required: "Please enter your use cases for edge.",
                //minlength: "Please enter your use cases for edge minimum 3 characters.",
                maxlength: "Please enter your use cases for edge maximum 300 characters."
            },
            commercialize: {
                required: "Please select the option.",
            },
            email: {
                required: "Please enter Email Address.",
                checkValidEmail: "Please enter a valid Email Address."
            },
            username: {
                required: "Please enter atleast one Username.",
            },
            agreecheck: {
                check_subscribe: "Please select privacy policy."
            },
            hiddenRecaptcha: {
                required: "Please verify the reCaptcha."
            },
        },
        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.appendTo(element.parents('.seprateBox'));
            }
            else { // This is the default behavior 
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            // form.submit();
            formsubmit()

        }
    });

    jQuery("#contact").validate({
        errorElement: 'small',
        ignore: "",
        focusInvalid: false,
        invalidHandler: function (form, validator) {
            console.log(validator)
            if (!validator.numberOfInvalids())
                return;
            jQuery('html, body').animate({
                scrollTop: jQuery(validator.errorList[0].element).offset().top
            }, 100);
        },
        rules: {
            first_name: {
                required: true,
                alphabetOnlyName: true,
                minlength: 3,
                maxlength: 100
            },
            last_name: {
                required: true,
                alphabetOnlyName: true,
                minlength: 3,
                maxlength: 100
            },
            email: {
                required: true,
                checkValidEmail: true
            },
            message: {
                required: true
            },


        },
        messages: {
            first_name: {
                required: "Please enter first Name.",
                alphabetOnlyName: "Please enter valid Name.",
                minlength: "Please enter minimum 3 characters.",
                maxlength: "Please enter maximum 100 characters."
            },
            last_name: {
                required: "Please enter last Name.",
                alphabetOnlyName: "Please enter valid Name.",
                minlength: "Please enter minimum 3 characters.",
                maxlength: "Please enter maximum 100 characters."
            },

            email: {
                required: "Please enter Email Address.",
                checkValidEmail: "Please enter a valid Email Address."
            },

            message: {
                required: "Please enter the message."
            },
        },
        errorPlacement: function (error, element) {

        },
        submitHandler: function (form) {
            // form.submit();
            contactformsubmit();
        }
    });

});






function hideError() {
    jQuery("[for=hiddenRecaptcha]").css("display", "none");
}


function cleanString(str) {
    return str.replace(/[^A-Za-z0-9,_()&reg;.-:{}$%@!~=+'&#39;`? ]/g, "");
}
