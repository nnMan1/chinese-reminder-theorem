let equationsList = document.querySelector("#equations")
successMessage = document.querySelector('#success-message')
errorMessage = document.querySelector('#error-message')

function removeEquation(e) {
    e.target.parentElement.remove()
}

function addEquation() {
    li_elem = document.createElement('li')
    li_elem.innerHTML=   `
                        <p>x =</p>
                        <input class='reminder_field form-control' type="text">
                        <p>(mod</p>
                        <input class='mod form-control' type="text">
                        <p>)</p>    
                        <button  class='removeEquation btn btn-danger' onclick="removeEquation(event);">-</button>        
                    `

    equationsList.appendChild(li_elem)
}

document.querySelector("#add-equation").addEventListener("click", e => {
    addEquation()
});

function calculate() {

    equations = document.querySelectorAll('li')

    equations_array = []

    if (equations.length == 0) {
        errorMessage.innerHTML = 'Morate zadati makar jednu jednačinu'
        errorMessage.style.visibility = "visible"
        successMessage.style.visibility = 'hidden'
        throw 'Dodaj neku jednacinu'
    }

    equations.forEach(equation => {
        mod = equation.querySelector('.mod').value
        reminder = equation.querySelector('.reminder_field').value
        
        mod = parseInt(mod)
        reminder = parseInt(reminder)

        if(isNaN(mod) || isNaN(reminder)) {
            errorMessage.innerHTML = 'Moraju sva poblja biti popunjena cijelim brojevima'
            errorMessage.style.visibility = "visible"
            successMessage.style.visibility = 'hidden'
            throw 'Moraju sva poblja biti popunjena cijelim brojevima'
        }
    
        equations_array.push(mod)
        equations_array.push(reminder)
    });

    console.log(equations_array);

    $.ajax('/v1/chinese-theorem', {
        method: 'GET',
        contentType: 'application/json',
        data:  { data: JSON.stringify(equations_array) }
    })
    .then(
        function success(response) {
            successMessage.innerHTML = 'x = '+response.x + '(mod '+ response.mod+')'
            errorMessage.style.visibility = "hidden"
            successMessage.style.visibility = 'visible'
        },

        function error(data, status) {
            errorMessage.innerHTML = 'Provjerite da li su svi parovi modula uzajamno prosti'
            errorMessage.style.visibility = "visible"
            successMessage.style.visibility = 'hidden'
        }
    )
    
}