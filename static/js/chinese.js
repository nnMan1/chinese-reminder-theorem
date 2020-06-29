let equationsList = document.querySelector("#equations")

function removeEquation(e) {
    e.target.parentElement.remove()
}

function addEquation() {
    li_elem = document.createElement('li')
    li_elem.innerHTML=   `
                        <p>x =</p>
                        <input class='reminder_field' type="text">
                        <p>(mod</p>
                        <input class='mod' type="text">
                        <p>)</p>    
                        <button  class='removeEquation' onclick="removeEquation(event);">-</button>        
                    `

    equationsList.appendChild(li_elem)
}

document.querySelector("#add-equation").addEventListener("click", e => {
    addEquation()
});

function calculate() {
    equations = document.querySelectorAll('li')

    equations_array = []

    equations.forEach(equation => {
        mod = equation.querySelector('.mod').value
        reminder = equation.querySelector('.reminder_field').value
        
        mod = parseInt(mod)
        reminder = parseInt(reminder)

        if(isNaN(mod) || isNaN(reminder)) {
            alert('MOraju sva poblja biti popunjena cijelim brojevima')
            throw 'MOraju sva poblja biti popunjena cijelim brojevima'
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
            setTimeout(function(){
                decrypted.value = response.decrypted
                key.value = response.key
                document.querySelector('.spinner-border').style.visibility = "hidden"
                alert
            }, 500);
            alert('x = '+response.x + '(mod '+ response.mod+')')
        },

        function error(data, status) {
            alert('Provjerite da li su svi parovi modula uzajamno prosti')
        }
    )
    
}
