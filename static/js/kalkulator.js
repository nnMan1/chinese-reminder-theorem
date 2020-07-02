// a + b (mod p)
function zbir(a, b, p) {
	return (a+b)%p //vrati mi ostatak pri dijeljenju sa p
}

// a - b (mod p)
function razlika(a, b, p) {
	p = Math.abs(p);
	var raz = (a-b)%p;
	if(raz < 0){
		return raz + p; //da bi bila pozitivna vrijednost
	}
	else{
		return raz;
	
	}
}

// a * b (mod p)
function proizvod(a, b, p) {
	p = Math.abs(p);
	return (a*b)%p;
}

	function nzd(a,b) {
		a=Math.abs(a);
		b=Math.abs(b);
		while(b) {
			var t = b;
			b = a % b;
			a = t;
		  }
		  return a;
		}
		
	
/*
// Ova nam funkcija vraca niz u kome je prvi el. NZD(a,b) a drugi string koji sadrzi korake
function nzd(a,b) {
	if(a<b){ //ovim pravimo da nam prvi broj bude veci od drugog
		tmp = b; //ubaci mi u privremenu prom. vrijednost veceg broja
		b = a; //ubaci mi u b manju vrijednost
		a = tmp; //u a ubacamo vecu vrijednost
	}

	var res = ""; //postavljamo rezultat prvo na prazan string
	while(b>0){
		res += a + " = "; // a = 
		res += b + "*" + parseInt(a/b) + " + "; // a = b*(a/b) +
		tmp = a%b; // privremena prom. koja je jednaka ostatku pri dijeljenju
		res += tmp + "<br/>"; // a = b*(a/b) + ostatak pa novi red
		a = b; //sad nam vrijednost iz b prelazi u a, odnosno b prelazi sa lijeve strane jednakosti
		b = tmp; // b nam sad dobija vrijednost ostatka pri dijeljenju brojeva a i b
	}
//ovim smo zapravo simulirali Euklidov algoritam
	return [a, res];
}
*/

// NZS(a,b), njega dobijamo tako sto proizvod ovih brojeva podijelimo sa njihovim NZD-om
function nzs(a,b) {
	var tmp = nzd(a,b);
	return a*b/tmp;
}


/*nizovi p, x1 i y1 odrazavaju promjene prve vrste u Blankinsip metodi
dok nizovi q,x2 i y2 odrazavaju promjene druge vrste u Blankinsip metodi*/

function blankinship(a,b){
	
	
	var y1=[0];
	var x1=[1];
	var x2=[0];
	var y2=[1];
	var p=[a];
	var q=[b];
	
	var i=1;
	var tempa=a;
	var tempb=b;
	
	if(a<0){
		x1[0]=-1;
		p[0]*=-1;
	}
	
	if(b<0){
		y2[0]=-1;
		q[0]*=-1;
	}
	a=Math.abs(a);
	b=Math.abs(b);
	/*svodim jedan od elemenata a i b na nulu*/
	while(b>0 && a>0){
		if(a<b){
			p.push(a);
			x1.push(x1[i-1]);
			y1.push(y1[i-1]);
			temp=parseInt(b/a)*(-1);
			x2.push(x1[i-1]*temp+x2[i-1]);
			y2.push(y1[i-1]*temp+y2[i-1]);
			b=b%a;
			q.push(b);
		}else{
			q.push(b);
			x2.push(x2[i-1]);
			y2.push(y2[i-1]);
			temp=parseInt(a/b)*(-1);
			x1.push(x2[i-1]*temp+x1[i-1]);
			y1.push(y2[i-1]*temp+y1[i-1]);
			a=a%b;
			p.push(a);
		}
		i++;
	}
	
	var sol=[];
	/*ako je a=0 to znaci da je b=nzd pa uzimam poslednje vrijednosti iz x2 i y2 i to su koeficijenti linearne kombinacije kojom se dobija nzd*/
	if(a==0){
		/*uzimam nzd, pa vrijednosti iz druge vrste*/
		sol.push(b);
		sol.push(x2[i-1]);
		sol.push(y2[i-1]);
	}else{/*ovdje je a=nzd pa uzimam a kao nzd, pa poslednje vrijednosti iz x1 i y1 i to su koeficijenti linearne kombinacije kojom se dobija nzd*/
		sol.push(a);
		sol.push(x1[i-1]);
		sol.push(y1[i-1]);
	}
	
	/*od svakog koraka blenkinship metode pravim "matricu" tj. tabelu*/
	var process="<table id='BlanTable'>";
	for(var j=0;j<i;j++){
		process+="<tr><td>"+p[j]+"</td><td>"+x1[j]+"</td><td>"+y1[j]+"</td></tr><tr><td>"+q[j]+"</td><td>"+x2[j]+"</td><td>"+
		y2[j]+"</td></tr>"
	}
	process += "</table>";
	/*vracam rjesenje koje je niz od 4 elementa prvi je nzd(a, b),druga dva su koeficijenti linearne kombinacije,
	a cetvrti je tok rada blankishipa sa�uvan u stringu.*/
	sol.push(process);
	return sol;
}



// ax=b (mod m); kod nerjesive vraca NaN, inace vraca x0
function kongruencija(a,b,m) {
	var d = nzd(a,m) //d nam je nzd za a i m
	if(b%d == 0){//ako je b djeljivo sa d
		var mp=m/d;
		var ap=a/d;
		var bp=b/d;
		
		var tmp=blankinship(ap,mp); //rjesava ap*x=1 (mod mp)
		var x0=tmp[1];
		x0=proizvod(x0,bp,mp); //da dobijem resenje od ap*x=bp (mod mp)
		
		if(x0<0){
			x0+=mp;
		}
		return x0;
	}
	else{
		alert('Broj b mora biti djeljiv sa NZD(a,mod)')
	}
}


// racunanje inverznog; ako ne postoji vraca NaN
function inverzni(a,m) {
	var d = nzd(a,m);

	if(d==1){//ako je nzd(a,m)=1 vrati mi rjesenje kongruencije
		return kongruencija(a,1,m)
	}
	else{
		alert('Ne postoji inverz za dati broj')
		return NaN;
	}
}

// racunanje stepene kongr
function expmod( base, exp, mod ){
	if (exp == 0) return 1;
	if (exp % 2 == 0){
	  return Math.pow( expmod( base, (exp / 2), mod), 2) % mod;
	}
	else {
	  return (base * expmod( base, (exp - 1), mod)) % mod;
	}
  }

//ojler
  function euler(n){
	if(n<=1000012337){
		factors=[];
		grades = []
		var d=2;
		var t=true;
		var c = n/2;
		var p = 1;
		var ns = n;
		while(n>1 && d <= c){
			if(t==true && n%d==0){
				factors.push(d);
				grades.push(1);
				n=n/d;
				t=false;
			}else if(n%d==0){
				n=n/d;
				grades[grades.length-1] = grades[grades.length-1] + 1;
			}else{
				d++;
				t=true;
			}
		}
		
		if(factors.length == 0 && ns != 1)
		{
			return ns-1; 
		}
		
		for(var i=0; i<factors.length;i++){
			if(grades[i] == 1)
			{
				p = p * (factors[i]-1);
			}
			else
			{
				p = p * factors[i] * grades[i];
			}
		}
		return parseInt(p);
	}else{
		//vracam NaN ukoliko je n preveliki da bi ga bilo moguce efikasno faktorisati
		return NaN;
	}
}