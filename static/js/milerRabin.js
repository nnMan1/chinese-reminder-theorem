let numberOfDigits = document.querySelector("#number-of-digits")
successMessage = document.querySelector('#success-message')
errorMessage = document.querySelector('#error-message')

function generate() {
    
    value = parseInt(numberOfDigits.value)

    $.ajax('/v1/prime-number-generator', {
        method: 'GET',
        contentType: 'application/json',
        data:  { data: JSON.stringify(value) }
    })
    .then(
        function success(response) {
            successMessage.innerHTML = 'x = '+response
            errorMessage.style.visibility = "hidden"
            successMessage.style.visibility = 'visible'
        },

        function error(data, status) {
            alert('Doslo je do greske i ne znamo kakva je')
        }
    )
    
}
