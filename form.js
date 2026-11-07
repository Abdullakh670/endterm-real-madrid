$(document).ready(function() {
    $('#ticketForm').on('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        let isValid = true;
        
        // Hide previous success message if any
        $('#successMessage').slideUp();

        // 1. Check Match Selection
        const match = $('#matchSelect');
        if (!match.val()) {
            showError(match);
            isValid = false;
        } else {
            showSuccess(match);
        }

        // 2. Check Tickets (Number validation)
        const tickets = $('#ticketCount');
        const ticketsVal = parseInt(tickets.val());
        if (isNaN(ticketsVal) || ticketsVal < 1 || ticketsVal > 4) {
            showError(tickets);
            isValid = false;
        } else {
            showSuccess(tickets);
        }

        // 3. Check Name (Length validation)
        const name = $('#fullName');
        if (name.val().trim().length < 3) {
            showError(name);
            isValid = false;
        } else {
            showSuccess(name);
        }

        // 4. Check Email (Pattern validation)
        const email = $('#email');
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email.val().trim())) {
            showError(email);
            isValid = false;
        } else {
            showSuccess(email);
        }

        // 5. Check Phone (Pattern validation)
        const phone = $('#phone');
        const phonePattern = /^\+?[0-9\s\-]{10,15}$/; // basic phone pattern
        if (!phonePattern.test(phone.val().trim())) {
            showError(phone);
            isValid = false;
        } else {
            showSuccess(phone);
        }

        // If form is valid
        if (isValid) {
            // Clear the form
            this.reset();
            // Remove validation classes
            $('.is-valid').removeClass('is-valid');
            
            // jQuery Effect 1: slideDown success message
            $('#successMessage').slideDown();
        }
    });

    // Helper functions
    function showError(element) {
        element.addClass('is-invalid').removeClass('is-valid');
    }
    
    function showSuccess(element) {
        element.removeClass('is-invalid').addClass('is-valid');
    }
    
    // Clear errors on input change
    $('.form-control, .form-select').on('input change', function() {
        if ($(this).hasClass('is-invalid')) {
            $(this).removeClass('is-invalid');
        }
    });
});

// Match filters and selected-match card
$(function () {
    $('#matchFilters').on('click', '.filter-btn', function () {
        $('.filter-btn').removeClass('active'); $(this).addClass('active');
        const q = $(this).data('f');
        $('table tbody tr').each(function () { $(this).toggle(!q || $(this).text().indexOf(q) > -1); });
    });
    const info = {
        celta: 'Real Madrid vs Celta Vigo. La Liga, Sat Nov 21, 21:00, Santiago Bernabéu.',
        psv: 'Real Madrid vs PSV Eindhoven. Champions League, Tue Nov 24, 21:00, Santiago Bernabéu.',
        alaves: 'Real Madrid vs Alavés. La Liga, Nov 28-29, time to be confirmed, Santiago Bernabéu.',
        osasuna: 'Real Madrid vs Osasuna. La Liga, Sun Dec 13, time to be confirmed, Santiago Bernabéu.'
    };
    $('#matchSelect').on('change', function () {
        const t = info[this.value];
        t ? $('#matchInfo').text(t).slideDown(150) : $('#matchInfo').slideUp(150);
    });
});