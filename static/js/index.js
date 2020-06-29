var TrenutnaOperacija = 0;

function stavka1()
{
	
	$("#button1").click(function(){
		
		$("#prikazGreska1").empty();
		var prvi = $("#prvi").val();
		var drugi = $("#drugi").val();
		var mod = $("#modulo1").val();
		
		var val = validacija(prvi, 3);
		if(val == true)
		{
			val = validacija(drugi, 3);
			if(val == true)
			{
				val = validacija(mod, 1);
				if(val == true)
				{
					if(TrenutnaOperacija == 0)
					{
						$("#prikazGreska1").append("Zaboravili ste da odaberete operaciju.");
						return;
					}
				}
				else
				{
					$("#prikazGreska1").append("Polje mod prihvata samo cjelobrojne vrijednosti.");
					return;
				}
			}
			else
			{				
				$("#prikazGreska1").append("Drugo polje prihvata samo pozitivne cjelobrojne vrijednosti.");
				return;
			}
		}
		else
		{
			$("#prikazGreska1").append("Prvo polje prihvata samo pozitivne cjelobrojne vrijednosti.")
			return;
		}
	
		
		var operacija = $(".spanminus").css("color");
		prvi = parseInt(prvi); 
		drugi = parseInt(drugi); 
		mod = parseInt(mod); 
		
		let apiURL = 'mult';

		if(TrenutnaOperacija == 1)
		{
			apiURL = 'sub';
		}
		else if(TrenutnaOperacija == 2)
		{
			apiURL = 'add';
		}


		let postData = {
		  	"x": prvi,
		  	"y": drugi,
		  	"p": mod
		  };

       $.ajax({
           type: "POST",
           url: apiURL,
           data: JSON.stringify(postData),
           dataType: "json",
    		contentType: 'application/json',
           success: function (data) {
               $("#rezultat1").val(data.result);
           },
           error: function (msg) {
               console.log(msg)
           },
       });
				
	});
}

function operacijaClick()
{
	$(".spanoperacije").click(function(){		
		var id = this.id; 
		
		$(".spanoperacije").css("color" , "white");
		if(id === "spanminus")
		{
			$("#"+id).css("color" , "blue");
			TrenutnaOperacija = 1;
		}
		else if(id === "spanplus")
		{
			$("#"+id).css("color" , "blue");
			TrenutnaOperacija = 2;
		}
		else
		{
			$("#"+id).css("color" , "blue");
			TrenutnaOperacija = 3;
		}
	});
}

function stavka2()
{
	$("#button2").click(function(){
		
		var prvi = $("#prviNZD").val();		 
		var drugi = $("#drugiNZD").val();
		
		$("#prikazGreska2").empty();
		var val = validacija(prvi, 3);
		if(val == true)
		{
			val = validacija(drugi, 3);
			if(val != true)
			{			
				$("#prikazGreska2").append("Drugo polje prihvata samo pozitivne cjelobrojne vrijednosti.");
				return;
			}
		}
		else
		{
			$("#prikazGreska2").append("Prvo polje prihvata samo pozitivne cjelobrojne vrijednosti.")
			return;
		}
		
		$.ajax({
           type: "POST",
           url: 'nzd',
           data: JSON.stringify({"x": prvi, "y": drugi}),
           dataType: "json",
    		contentType: 'application/json',
           success: function (data) {
           		console.log(data);
				$("#rezultat2").val(data.result[0]);	
				var koraci = data.result[1];
				
				prvi = parseInt(prvi);
				drugi = parseInt(drugi);
				$("#prikazEuklida").empty();
				$("#prikazEuklida").append(koraci)
           },
           error: function (msg) {
               console.log(msg)
           },
       });

	});
}

function prikazKorakaEuklid()
{
	$("#prikazKoraka").click(function(){		
		$("#prikazEuklida").slideToggle(500);
	});
}

function stavka3()
{
	$("#button3").click(function(){
		
		var prvi = $("#prviNZS").val(); 
		var drugi = $("#drugiNZS").val(); 
		
		$("#prikazGreska3").empty();
		var val = validacija(prvi, 3);
		if(val == true)
		{
			val = validacija(drugi, 3);
			if(val != true)
			{			
				$("#prikazGreska3").append("Drugo polje prihvata samo pozitivne cjelobrojne vrijednosti.");
				return;
			}
		}
		else
		{
			$("#prikazGreska3").append("Prvo polje prihvata samo pozitivne cjelobrojne vrijednosti.")
			return;
		}
		
		prvi = parseInt(prvi);
		drugi = parseInt(drugi);
		
		$.ajax({
           type: "POST",
           url: 'nzs',
           data: JSON.stringify({"x": prvi, "y": drugi}),
           dataType: "json",
    		contentType: 'application/json',
           success: function (data) {
				$("#rezultat3").val(data.result);
           },
           error: function (msg) {
               console.log(msg)
           },
       });
		
	});
}

function stavka4()
{
	$("#button4").click(function(){
		
		var prvi = $("#prviNZDB").val();
		var drugi = $("#drugiNZDB").val();
		
		$("#prikazGreska4").empty();
		var val = validacija(prvi, 1);
		if(val == true)
		{
			val = validacija(drugi, 1);
			if(val != true)
			{			
				$("#prikazGreska4").append("Drugo polje prihvata samo cjelobrojne vrijednosti.");
				return;
			}
		}
		else
		{
			$("#prikazGreska4").append("Prvo polje prihvata samo cjelobrojne vrijednosti.")
			return;
		}

		prvi = parseInt(prvi); 
		drugi = parseInt(drugi); 

		$.ajax({
           type: "POST",
           url: 'blankinship',
           data: JSON.stringify({"x": prvi, "y": drugi}),
           dataType: "json",
    		contentType: 'application/json',
           success: function (data) {
			    var res = data.result;
			    console.log(res); 
				var str = res[0]+" = ";
				
				if(res[1] < 0){ str += res[1]+"*";}
				else{ str += res[1]+"*";}
				if(prvi < 0){ str += "("+prvi+")"; }
				else{ str += prvi;}
				if(res[2] < 0){ str += res[2]+"*";}
				else{ str += "+"+res[2]+"*";}
				if(drugi < 0){ str += "("+drugi+")"; }
				else{ str += drugi;}
				
				$("#rezultat4").val(str);	
				var koraci = res[3];  
				
				$("#prikazBlankship").empty();
				$("#prikazBlankship").append(koraci);

           },
           error: function (msg) {
               console.log(msg)
           },
       });
	});
}

function prikazKorakaBlankiship()
{
	$("#prikazKorakaBlankinship").click(function(){		
		$("#prikazBlankship").slideToggle(500);
	});
}

function stavka5()
{
	$("#button5").click(function(){
		
		var element1 = $("#element1").val();		 
		var mod = $("#modulo2").val();
				
		$("#prikazGreska5").empty();
		var val = validacija(element1, 3);
		if(val == true)
		{
			val = validacija(mod, 1);
			if(val != true)
			{			
				$("#prikazGreska5").append("Drugo polje prihvata samo cjelobrojne vrijednosti.");
				return;
			}
		}
		else
		{
			$("#prikazGreska5").append("Prvo polje prihvata samo pozitivne cjelobrojne vrijednosti.")
			return;
		}
		
		element1 = parseInt(element1);
		mod = parseInt(mod);
		

		$.ajax({
           type: "POST",
           url: 'inverse',
           data: JSON.stringify({"x": element1, "y": mod}),
           dataType: "json",
    		contentType: 'application/json',
           success: function (data) {
				$("#rezultat5").val(data.result);
           },
           error: function (msg) {
               console.log(msg)
           },
       });
	});
}

function stavka6()
{
	$("#button6").click(function(){
		
		var element1 = $("#elementA").val();
		var element2 = $("#elementB").val(); 
		var mod = $("#modulo3").val();
		
		$("#prikazGreska6").empty();
		var val = validacija(element1, 3);
		if(val == true)
		{
			val = validacija(element2, 1);
			if(val == true)
			{
				val = validacija(mod, 1);
				if(val != true)
				{					
					$("#prikazGreska6").append("Polje mod prihvata samo cjelobrojne vrijednosti.");
					return;
				}
			}
			else
			{				
				$("#prikazGreska6").append("Drugo polje prihvata samo cjelobrojne vrijednosti.");
				return;
			}
		}
		else
		{
			$("#prikazGreska6").append("Prvo polje prihvata samo pozitivne cjelobrojne vrijednosti.")
			return;
		}
		
		$("#rezultat6").val(congruence(element1, element2, mod));	
		
		$.ajax({
           type: "POST",
           url: 'congruence',
           data: JSON.stringify({"x": element1, "y": element2, "p": mod}),
           dataType: "json",
    		contentType: 'application/json',
           success: function (data) {
				$("#rezultat6").val(data.result);
           },
           error: function (msg) {
               console.log(msg)
           },
       });
	});
}

function stavka7()
{
	$("#button7").click(function(){
		
		var elementiA = $("#elementiA").val();
		var modulo = $("#modulo4").val();
		
		$("#prikazGreska7").empty();
		var val = validacija(elementiA, 2);
		if(val == true)
		{
			val = validacija(modulo, 2);
			if(val != true)
			{			
				$("#prikazGreska7").append("Polje mod prihvata samo pozitivne cjelobrojne vrijednosti, odvojene zapetom.");
				return;
			}
		}
		else
		{
			$("#prikazGreska7").append("Prvo polje prihvata samo pozitivne cjelobrojne vrijednosti, odvojene zapetom.")
			return;
		}
		
		var elemA = elementiA.split(",");
		var mod = modulo.split(",");
		elemA = konvertovanjeNiza(elemA);
		mod = konvertovanjeNiza(mod); 
		
		$.ajax({
           type: "POST",
           url: 'chinese_theorem',
           data: JSON.stringify({"x": elemA, "y": mod}),
           dataType: "json",
    		contentType: 'application/json',
           success: function (data) {
				$("#rezultat7").val(data.result);
           },
           error: function (msg) {
               console.log(msg)
           },
       });	
		
	});
}

function konvertovanjeNiza(niz)
{
	for (i = 0; i < niz.length;i++)
	{
		niz[i] = parseInt(niz[i]);
	}
	return niz;
}

function stavka8()
{
	$("#button8").click(function(){
		
		var elemA = $("#elementAA").val();
		var elemB = $("#elementK").val();
		var mod = $("#modulo5").val();
		
		$("#prikazGreska8").empty();
		var val = validacija(elemA, 1);
		if(val == true)
		{
			val = validacija(elemB, 3);
			if(val == true)
			{
				val = validacija(mod, 1);
				if(val != true)
				{
					$("#prikazGreska8").append("Polje mod prihvata samo cjelobrojne vrijednosti.");
					return;
				}
			}
			else
			{				
				$("#prikazGreska8").append("Drugo polje prihvata samo pozitivne cjelobrojne vrijednosti.");
				return;
			}
		}
		else
		{
			$("#prikazGreska8").append("Prvo polje prihvata samo cjelobrojne vrijednosti.")
			return;
		}
		
		$.ajax({
           type: "POST",
           url: 'fea',
           data: JSON.stringify({"x": elemA, "y": elemB, "p": mod}),
           dataType: "json",
    		contentType: 'application/json',
           success: function (data) {
				$("#rezultat8").val(data.result);
           },
           error: function (msg) {
               console.log(msg)
           },
       });
	});
}

function stavka9()
{
	$("#button9").click(function(){
		
		var elem = $("#elem").val();
		
		$("#prikazGreska9").empty();
		var val = validacija(elem, 3);
		if(val != true)
		{
			$("#prikazGreska9").append("Prvo polje prihvata samo pozitivne cjelobrojne vrijednosti.")
			return;
		}
		
		elem = parseInt(elem); 

		$.ajax({
           type: "POST",
           url: 'euler',
           data: JSON.stringify({"x": elem}),
           dataType: "json",
    		contentType: 'application/json',
           success: function (data) {
				$("#rezultat9").val(data.result);
           },
           error: function (msg) {
               console.log(msg)
           },
       });	
		
	});
}

function uputstvo()
{
	$("#button10").click(function(){
		$('[class=pomoc]').hide();
		$("#prikazUpustvo").slideToggle(500);	
		
	});
}

function validacija(arg, tip)
{
	if(tip == 1)
	{
		var pattern = new RegExp(/^-?[1-9][0-9]*$/);
		return pattern.test(arg);
	}
	else if(tip == 2)
	{
		var pattern = new RegExp(/^([1-9][0-9]*)([\s]*,[\s]*[1-9][0-9]*)*$/);
		return pattern.test(arg);
	}
	else
	{
		var pattern = new RegExp(/^[1-9][0-9]*$/);
		return pattern.test(arg);
	}
}

var createAccordian = function(accordianElem) {
	// TODO: Implement createAccordian.
	
	$.each($(accordianElem), function(index, value)
	{
		$(value).click(function(event){
			if($(value).next().is(':hidden'))
			{
				$(value).next().slideDown(100);
			}else{
				$(value).next().slideUp(100);
			}
		});		
	});
	
};

$(document).ready(function() {
	
	$("#prikazEuklida").hide();
	$("#prikazBlankship").hide();
	stavka1();
	stavka2();
	stavka3();
	stavka4();
	stavka5();
	stavka6();
    stavka7();
	stavka8();
	stavka9();
	operacijaClick();
	prikazKorakaEuklid();
	prikazKorakaBlankiship();
	$('[class=pomoc]').hide();
	createAccordian('[class=accordian]');
	$("#prikazUpustvo").hide();
	uputstvo();
	
});