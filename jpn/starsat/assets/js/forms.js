/* ==========================================================================
   Forms
   ========================================================================== */

var forms = {

    init: function ()
    {

        /* Registration
           ========================================================================== */

        var form_register = $('[data-component="form-register"]');

        if (form_register.length > 0)
        {

            // Bank account details
            var bank_account_details = $('[data-component="bank-account-details"]');

            // Address `select` fields
            var address_province = $('[data-select-type="province"]');
            var address_city = $('[data-select-type="city"]');
            var address_suburb = $('[data-select-type="suburb"]');

            // Bank `select` fields
            var bank = $('[data-select-type="bank"]');
            var bank_branch = $('[data-select-type="bank-branch"]');
            var bank_account_type = $('[data-select-type="bank-account-type"]');
            var bank_charge_day = $('[data-select-type="bank-charge-day"]');

            // Selected `option` field and value
            var option_selected;
            var option_selected_value;

            /*
             * Disable elements that cannot be interacted with initially
             */

            $('[data-intital-state="disabled"]').each(function()
            {
                $(this).attr('disabled', 'disabled'); // Set the `disabled` attribute of each element
            });

            /*
             * Hide elements that cannot be viewed initially
             */

            $('[data-initial-visibility="hidden"]').each(function()
            {
                $(this).hide(); // Hide each element
            });

            /*
             * Handle on <select> “change” event
             */

            $('[data-select-event="on-change"]').each(function()
            {
                $(this).on('change', function()
                {
                    var select = $(this);
                    option_selected = $(this).find('option:selected');
                    option_selected_value = option_selected.val();

                    /*
                     * Payment Details for Bank Account e.g. Debit Order
                     */

                    if (option_selected.data('show-bank-account-details'))
                    {
                        bank_account_details.stop(true, true).slideDown(); // Show the bank account fields container
                    }
                    else if (!option_selected.data('show-bank-account-details'))
                    {
                        bank_account_details.stop(true, true).slideUp(); // Hide the bank account fields container
                    }

                    /*
                     * Address
                     */

                    updateSelect(select.data('select-type'), option_selected_value);
                });
            });

            /*
             * Calculate the total montly cost based on the selected package(s)
             */

            var total_cost_decoder_component = $('[data-component="decoder-cost"]');
            var total_cost_package_component = $('[data-component="package-cost"]');
            var total_cost_decoder = 0;
            var total_cost_package = 0;
            var total_cost_decoder_initial = total_cost_decoder_component.data('initial-total');
            var total_cost_package_initial = total_cost_package_component.data('initial-total');
            var package_cost = 0;
            var package_add_on_cost = 0;
            var package_inputs = $('input, [data-action="calculate-total"]');
            var decoder_cost = 0;
            var currency_symbol;

            // Loop over all the package inputs
            package_inputs.each(function ()
            {
                // Handle on <type="checkbox|radio"> “change” event
                $(this).on('change', function ()
                {
                    var package_type = $(this).closest('fieldset').data('package-type');
                    var item_price = parseInt($(this).data('item-price'));

                    if (package_type === 'package') // Package
                    {
                        package_cost = item_price;
                    }

                    if (package_type === 'add-on') // Add-ons
                    {
                        if (this.checked)
                        {
                            package_add_on_cost += item_price;
                        }
                        else
                        {
                            package_add_on_cost -= item_price;
                        }
                    }

                    if (package_type === 'decoder') // Decoder
                    {
                        decoder_cost = item_price;
                    }

                    /*
                     * Calculate the total package cost
                     */

                    total_cost_package = parseInt(total_cost_package_initial) + parseInt(package_cost) + parseInt(package_add_on_cost);

                    if (typeof total_cost_package !== 'undefined')
                    {
                        var cost_package = $('[data-value="cost"]', total_cost_package_component);
                        currency_symbol = cost_package.data('currency-symbol');

                        if (typeof currency_symbol === 'undefined' || currency_symbol === '')
                        {
                            currency_symbol = 'R'; // Default to ZAR
                        }

                        if (total_cost_package > 0)
                        {
                            // Update the total cost display value
                            cost_package.html(currency_symbol + total_cost_package.toFixed(2));

                            total_cost_package_component.stop(true, true).slideDown(); // Display the total cost
                        }
                        else
                        {
                            total_cost_package_component.stop(true, true).slideUp(); // Hide the total cost
                        }
                    }

                    /*
                     * Calculate the total decoder cost
                     */

                    total_cost_decoder = parseInt(total_cost_decoder_initial) + parseInt(decoder_cost);

                    if (package_type === 'decoder') // Decoder
                    {
                        var cost_decoder = $('[data-value="cost"]', total_cost_decoder_component);
                        currency_symbol = cost_decoder.data('currency-symbol');

                        if (typeof currency_symbol === 'undefined' || currency_symbol === '')
                        {
                            currency_symbol = 'R'; // Default to ZAR
                        }

                        if (total_cost_decoder > 0)
                        {
                            // Update the total cost display value
                            cost_decoder.html(currency_symbol + total_cost_decoder.toFixed(2));

                            total_cost_decoder_component.stop(true, true).slideDown(); // Display the total cost
                        }
                        else
                        {
                            total_cost_decoder_component.stop(true, true).slideUp(); // Hide the total cost
                        }
                    }
                });
            });

            /**
             * Update the `select` elements with dynamic data
             *
             * @param select_type
             * @param option_selected_value
             */
            function updateSelect(select_type, option_selected_value)
            {

                var data_URL = null;
                var select_El = null;
                var data_type = null;

                if (select_type === 'country') // Country
                {
                    select_El = address_province;
                    data_type = 'address';
                }
                else if (select_type === 'province') // Province
                {
                    select_El = address_city;
                    data_type = 'address';
                }
                else if (select_type === 'city') // City
                {
                    select_El = address_suburb;
                    data_type = 'address';
                }
                else if (select_type === 'bank') // City
                {
                    select_El = bank_branch;
                    data_type = 'bank-branch';
                }

                // Validation
                if (select_El == null || data_type == null)
                {
                    return;
                }

                // Get the correct data URLs
                if (data_type === 'address')
                {
                    if (option_selected_value !== '')
                    {
                        // Create the data URL and append a query string with the selected option value
                        data_URL = 'data/addressList.json?addressId=' + option_selected_value;

                        // Get data for the specified URL and data type
                        getData(data_URL, data_type, select_El);
                    }
                    else
                    {
                        // Remove options from the `select`
                        if (select_type === 'country')
                        {
                            removeSelectOptions(address_province);
                            removeSelectOptions(address_city);
                            removeSelectOptions(address_suburb);
                        }
                        else if (select_type === 'province')
                        {
                            removeSelectOptions(address_city);
                            removeSelectOptions(address_suburb);
                        }
                        else if (select_type === 'city')
                        {
                            removeSelectOptions(address_suburb);
                        }
                    }
                }
                else if (data_type === 'bank-branch')
                {

                    if (option_selected_value !== '') // Select value is not null or empty
                    {
                        data_URL = 'data/bankBranches.json?addressId=' + option_selected_value;

                        // Get data for the specified URL and data type
                        getData(data_URL, data_type, select_El);
                    }
                    else
                    {
                        if (select_type === 'bank')
                        {
                            removeSelectOptions(bank_branch);

                            // Disable the “Account Type” and “Charge Day” `select` elements
                            bank_account_type.attr('disabled', 'disabled');
                            bank_charge_day.attr('disabled', 'disabled');
                        }
                    }
                }
            }

            /**
             * Remove options from the `select` and disable the element
             *
             * @param select_El
             */
            function removeSelectOptions(select_El)
            {

                // Loop over all options within the `select`
                $('option', select_El).each(function()
                {
                    var option = $(this);

                    // Get all options that have a value
                    if (option.val() !== '')
                    {
                        option.remove(); // Remove the `option`
                    }
                });

                select_El.attr('disabled', 'disabled'); // Set the `disabled` attribute of each element
            }

            /**
             * Get JSON data from a specified URL for the selected data type
             *
             * @param data_URL
             * @param data_type
             * @param select_El
             */
            function getData(data_URL, data_type, select_El)
            {

                // Get the data
                $.get(data_URL, function (data)
                {
                    var i = 0; // Counter
                    var list_data;
                    var address;
                    var options = [];

                    if (data_type === 'address') // Address
                    {
                        list_data = data.addressList; // Specify the node `addressList` from the JSON data
                    }
                    else if (data_type === 'bank-branch') // Bank
                    {
                        list_data = data.bankBranches; // Specify the node `branchList` from the JSON data

                        // Enable the “Account Type” and “Charge Day” `select` elements
                        bank_account_type.removeAttr('disabled');
                        bank_charge_day.removeAttr('disabled');
                    }

                    if (typeof data !== 'undefined' && list_data.length > 0)
                    {
                        // Remove the `disabled` attribute of the `select`
                        select_El.removeAttr('disabled');

                        // Populate the `select` element
                        for (i = 0; i < list_data.length; i++)
                        {
                            address = list_data[i];
                            options.push('<option value="' + address.id + '">' + address.name + '</option>');
                        }

                        // Append the additional options to the `select` element
                        select_El.append(options);
                    }
                });
            }
        }

        /* Validation
           ========================================================================== */

        /*
         * Registration
         */

        var validate_register_form = $('[data-validate="form-register"]');

        if (validate_register_form.length > 0)
        {

            // Initialize the validation plugin
            validate_register_form.validate(
                {
                    rules: {
                        'package': {
                            required: true,
                            minlength: 1
                        },
                        'decoder': {
                            required: true,
                            minlength: 1
                        },
                        'personal-name': {
                            required: true,
                            minlength: 2,
                            maxlength: 100
                        },
                        'personal-id-type': {
                            required: true,
                            minlength: 1
                        },
                        'personal-id-number': {
                            required: true,
                            minlength: 2,
                            maxlength: 100
                        },
                        'personal-address-country': {
                            required: true,
                            minlength: 1
                        },
                        'personal-address-province': {
                            required: true,
                            minlength: 1
                        },
                        'personal-address-detail': {
                            required: true,
                            minlength: 2,
                            maxlength: 100
                        },
                        'personal-postal-code': {
                            required: true,
                            minlength: 2,
                            maxlength: 4
                        },
                        'personal-contact-method': {
                            required: true,
                            minlength: 1
                        },
                        'personal-email-address': {
                            required: true,
                            email: true,
                            minlength: 2,
                            maxlength: 100
                        },
                        'personal-mobile-number': {
                            required: true,
                            minlength: 2,
                            maxlength: 20
                        },
                        'payment-method': {
                            required: true,
                            minlength: 1
                        },
                        'payment-bank': {
                            required: true,
                            minlength: 1
                        },
                        'payment-branch': {
                            required: true,
                            minlength: 1
                        },
                        'payment-account-type': {
                            required: true,
                            minlength: 1
                        },
                        'payment-account-name': {
                            required: true,
                            minlength: 2,
                            maxlength: 100
                        },
                        'payment-account-number': {
                            required: true,
                            minlength: 2,
                            maxlength: 100
                        },
                        'payment-charge-day': {
                            required: true,
                            minlength: 1
                        }
                    },
                    messages: {
                        'package': 'Please select your package',
                        'decoder': 'Please specify if you need a decoder',
                        'personal-name': {
                            required: 'Please enter your Name &amp; Surname',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'personal-id-type': 'Please select your ID Type',
                        'personal-id-number': {
                            required: 'Please enter your ID Number',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'personal-address-country': 'Please select your Country',
                        'personal-address-province': 'Please select your Province',
                        'personal-address-detail': {
                            required: 'Please enter your Address Detail',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'personal-postal-code': {
                            required: 'Please enter your Postal Code',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'personal-contact-method': 'Please select your Preferred Contact Method',
                        'personal-email-address': {
                            required: 'Please enter your Email Address',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'personal-mobile-number': {
                            required: 'Please enter your Mobile Number',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'payment-method': 'Please select your Payment Method',
                        'payment-bank': 'Please select your Bank',
                        'payment-branch': 'Please select your Branch',
                        'payment-account-type': 'Please select your Account Type',
                        'payment-account-name': {
                            required: 'Please enter your Account Name',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'payment-account-number': {
                            required: 'Please enter your Account Number',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'payment-charge-day': 'Please select your Charge Day'
                    },
                    errorElement: 'span',
                    errorPlacement: function(error, element)
                    {
                        error.insertBefore(element.parent());
                    }
                }
            );
        }

        /*
         * Login
         */

        var validate_login_form = $('[data-validate="form-login"]');

        if (validate_login_form.length > 0)
        {

            // Initialize the validation plugin
            validate_login_form.validate(
                {
                    rules: {
                        'customer-code': {
                            required: true,
                            minlength: 2,
                            maxlength: 100
                        },
                        'password': {
                            required: true,
                            minlength: 2,
                            maxlength: 100
                        },
                        'verification-code': {
                            required: true,
                            minlength: 2,
                            maxlength: 4
                        }
                    },
                    messages: {
                        'customer-code': {
                            required: 'Please enter your Customer Code',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'password': {
                            required: 'Please enter your Password',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        },
                        'verification-code': {
                            required: 'Please enter the Verification Code',
                            minlength: 'Minimum of {0} characters are required',
                            maxlength: 'Maximum of {0} characters are allowed'
                        }
                    },
                    errorElement: 'span',
                    errorPlacement: function(error, element)
                    {
                        error.insertBefore(element);
                    }
                }
            );
        }
    }
};