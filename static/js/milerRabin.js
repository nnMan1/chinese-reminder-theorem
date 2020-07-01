let numberOfDigits = document.querySelector("#number-of-digits")

function generate() {
    
    value = parseInt(numberOfDigits.value)

    $.ajax('/v1/prime-number-generator', {
        method: 'GET',
        contentType: 'application/json',
        data:  { data: JSON.stringify(value) }
    })
    .then(
        function success(response) {
            alert(response.p);
        },

        function error(data, status) {
            alert('Provjerite da li su svi parovi modula uzajamno prosti')
        }
    )
    
}
