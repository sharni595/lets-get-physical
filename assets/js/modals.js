$('.modal-body') //Need to add a standard element for every modal's body at the top for the exit button
    .prepend('<button class="modal-exit"></button>')
    .find('button').first()
        .click((e)=>{ //assigning the onclick for the exit button
            $(e.target).closest('.modal').removeClass('modal-active');
});

$('.modal-active').click((e)=>{ //If we click anywhere but the modal body, rmeove the modal
    $(e.target).removeClass('modal-active');
});

function openModal(modalID){ //This function is designed to be assigned to buttons.  Just feed it the id of the modal and it'll open that modal
    $('.modal-active').removeClass('modal-active');
    $(`#${modalID}`).addClass('modal-active');
}