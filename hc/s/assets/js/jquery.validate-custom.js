$("#login-form").validate(
{
    errorLabelContainer: $("#login-form div.validation-errors"),
    rules: {
        login_email: {
            required: true,
            email: true,
            maxlength: 100
        },
        login_password: {
            required: true,
            minlength: 6,
            maxlength: 20
        }
    },
    messages: {
        login_email: "Please enter your email address",
        login_password: "Please enter your password"
    }
});

$("#registration-form").validate(
{
    errorLabelContainer: $("#registration-form div.validation-errors"),
    rules: {
        first_name: {
            required: true,
            maxlength: 50
        },
        last_name: {
            required: true,
            maxlength: 50
        },
        email: {
            required: true,
            email: true,
            maxlength: 100
        },
        password: {
            required: true,
            minlength: 6,
            maxlength: 20
        },
        confirm_password: {
            required: true,
            minlength: 6,
            maxlength: 20,
            equalTo: "#password"
        },
        mobile_number: {
            required: true,
            maxlength: 16
        },
        province: {
            required: true,
            minlength: 1
        },
        dob_day: {
            required: true,
            minlength: 1
        },
        dob_month: {
            required: true,
            minlength: 1
        },
        dob_year: {
            required: true,
            minlength: 1
        }
    },
    messages: {
        first_name: "Please enter your first name",
        last_name: "Please enter your last name",
        email: "Please enter your email address",
        password: "Please enter your password (between 6 and 20 characters)",
        confirm_password: "Please confirm your password",
        province: "Please select your province",
        mobile_number: "Please enter your mobile number",
        dob_day: "Please select your day of birth",
        dob_month: "Please select your month of birth",
        dob_year: "Please select your year of birth"
    }
});

$("#forgotten-password-form").validate(
{
    errorLabelContainer: $("#forgotten-password-form div.validation-errors"),
    rules: {
        email: {
            required: true,
            email: true,
            maxlength: 100
        }
    },
    messages: {
        email: "Please enter your email address"
    }
});

$("#contact-form").validate(
{
    errorLabelContainer: $("#contact-form div.validation-errors"),
    rules: {
        name: {
            required: true,
            maxlength: 50
        },
        email: {
            required: true,
            email: true,
            maxlength: 100
        },
        subject: {
            required: true,
            maxlength: 255
        },
        message: {
            required: true
        }
    },
    messages: {
        name: "Please enter your name",
        email: "Please enter your email address",
        subject: "Please enter a subject",
        message: "Please enter a message"
    }
});

$("#quiz-form").validate(
{
    errorLabelContainer: $("#quiz-form div.validation-errors"),
    rules: {
        answer_id: {
            required: true,
            minlength: 1
        }
    },
    messages: {
        answer_id: "Please select one of the choices"
    }
});