$(document).ready(function() {
    // jQuery Effect 2: Accordion (SlideToggle)
    $('.history-era-title').on('click', function() {
        // Toggle the arrow symbol
        const arrow = $(this).find('span');
        if (arrow.text() === '▼') {
            arrow.text('▲');
        } else {
            arrow.text('▼');
        }
        
        // Slide toggle the content next to the title
        $(this).next('.era-content').slideToggle(300);
    });

    // jQuery Effect 3: Smooth Scroll back to top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn(200); // FadeIn effect
        } else {
            $('#backToTop').fadeOut(200); // FadeOut effect
        }
    });

    $('#backToTop').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 600); // Animate smooth scroll
        return false;
    });
});