$(document).ready(function () {
    //create an array called addressbook
    let addressBook = [];

    //create a function - create new contact, function that takes in an object inlcudes name number address
    function addNewContact(firstname, surname, number, address) {
        //made sure that can't add empty contacts
        if (firstname, surname, number, address === '') {
            console.log(`empty entry, please try again`);
            return;
        }
        addressBook.push({ firstname, surname, number, address });
    };

    //create a function - search contact
    // this function is from https://www.codegrepper.com/code-examples/javascript/jquery+search
    $('#search').submit(function () {
        let searchValue = $('#search-contact').val().toLowerCase();
        let filteredResults = addressBook.filter(
            //enabling all values to be used to search a contact followed https://www.youtube.com/watch?v=wxz5vJ1BWrc tutorial
            (contact) => contact.firstname.toLowerCase().includes(searchValue) || contact.surname.toLowerCase().includes(searchValue) || contact.number.includes(searchValue) || contact.address.includes(searchValue)
        )
        showList(filteredResults);

        event.preventDefault();
    });

    //create a function - show list of contacts
    //my take on https://stackoverflow.com/questions/12137031/delete-buttons-with-list-items delete button
    function showList(list) {
        $('.contact-item').remove();
        $('hr').remove();
        for (let i = 0; i < list.length; i++) {
            $('#show-console').append(
                `<div class="contact-item"><p class="firstname">Firstname: ${list[i].firstname}</p><p class="surname">Surname: ${list[i].surname}</p><p class="number">Number: ${list[i].number} </p><p class="address">Address: ${list[i].address}</p><button class="delete" data-firstname="${list[i].firstname}">Delete</button></div><hr>`
            );
        }
    };

    //create a function - delete contact
    function deleteContact(name) {
        addressBook = addressBook.filter((contact) => contact.firstname !== name);
        showList(addressBook);
    };

    //function addNewContact to link with DOM
    $('#contact').submit(function () {
        addNewContact($('#firstname').val(), $('#surname').val(), $('#number').val(), $('#address').val());

        $('#firstname').val('');
        $('#surname').val('');
        $('#number').val('');
        $('#address').val('');

        event.preventDefault();
    });


    //function showList to link with DOM
    $('#js-reveal-list').click(function () {
        $('#show-console').css('display', 'block');
        $('#contact-console').css('display', 'none')

        showList(addressBook);
    });


    // function add new contact to link with DOM
    $('#js-add-new').click(function () {
        $('#show-console').css('display', 'none');
        $('#contact-console').css('display', 'block');
    });

    //function delete button to link with DOM
    //fixed this with the help of https://www.codewall.co.uk/jquery-on-click-function-not-working-after-appending-html/
    $("body").on("click", '.delete', function (event) {
        const name = $(event.currentTarget).data().firstname
        deleteContact(name)

    });

});