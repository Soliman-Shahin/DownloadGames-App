$(document).ready(function() {
    $('.modal').modal();
    $('.dropdown-trigger').dropdown();
    $('select').formSelect();
    $('.carousel').carousel();
    $(".searchItem").hide();
    $(".searchItem1").hide();
    $('.sidenav').sidenav();
    $('input#input_text, textarea#textarea2').characterCounter();
    $("#hide").click(function() {
        $(".searchItem").hide();
    });
    $("#hide1").click(function() {
        $(".searchItem1").hide();
    });
    $('.datepicker').datepicker();
    $('.tooltipped').tooltip();
    // favorites counter
    var counter = $('#favCounter').html();
    $('#favoritesCounter').html(counter);
    $('.tabs').tabs();
    $('.fixed-action-btn').floatingActionButton();
});

// hide message after 5 sec
$('#successMessage').delay(5000).fadeOut('slow');

// change game image
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageFile").change(function() {
    readURL(this);
});

// upload avatar
$(document).ready(function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = function(e) {
            let image = document.getElementById("imagePlaceholder")
            image.style.display = "block"
            image.src = e.target.result
        }
        reader.readAsDataURL(input.files[0])
    }
})

// for change profile img
$(document).ready(function() {
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('.profile-pic').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $(".file-upload").on('change', function() {
        readURL(this);
    });

    $(".upload-button").on('click', function() {
        $(".file-upload").click();
    });
});

// filter in navbar
function filterFunction() {
    var input, filter, a, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    div = document.getElementById("searchBox");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) == '') {
            $(".searchItem").hide();
        } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

// filter in mobile navbar
function filterFunction1() {
    var input, filter, a, i;
    input = document.getElementById("search1");
    filter = input.value.toUpperCase();
    div = document.getElementById("searchBox1");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) == '') {
            $(".searchItem1").hide();
        } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

// Add game to favorites
$('#favForm').submit((event) => {
    event.preventDefault();
    var $form = $(this),
        user_id = $('#user_id').val(),
        gameId = $('#gameId').val(),
        gameTitle = $('#gameTitle').val(),
        url = 'http://localhost:4000/users/addGameToFav',
        jsonData = { gameId: gameId, gameTitle: gameTitle };
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: jsonData,
        success: (res, textStatus, xhr) => {
            $('#fav').html('favorite');
            $('.toast').append(res.msg);
        },
        error: (xhr, textStatus, res) => {
            $('.toast').append(res.msg);
        }
    });
});

// show password
(function($) {
    "use strict";
    var showPass = 0;
    $('.btn-show-pass').on('click', function() {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        } else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-eye');
            showPass = 0;
        }
    });
})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionTop.init(elems, {
        direction: 'left'
    });
});