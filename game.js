var punktyCPU=0;
var punktyPlayer=0;
var sumaKości = 0;
var obstaw;
var ktoRzuca;
var runda = 0;
var tura = 0;

function Start()
{
	CzyśćLog();
	document.getElementById("btStart").disabled = true;
	ktoRzuca = KtoZaczyna();
	//console.log(ktoRzuca);

	runda = 1;

	Przyciski(ktoRzuca);

	if(ktoRzuca == "P")
	{
		DodajParagraf("Rozpoczyna gracz");
	}
	else
	{
		DodajParagraf("Rozpoczyna komputer");
	}

	Runda();
}

function Runda()
{
	
	if(ktoRzuca == "C")
	{
		RzutKomputer();
	}

	if(runda >5)
	{
		DodajParagraf("Koniec gry");
		if(punktyCPU > punktyPlayer)
		{
			DodajParagraf("Wygrywa komputer!");
		}
		else
		{
			DodajParagraf("Wygrywa gracz!");
		}

		document.getElementById("btWiecej").disabled = true;
		document.getElementById("btMniej").disabled = true;
		document.getElementById("btRzucaj").disabled = true;
		document.getElementById("btStart").disabled = false;
	}
}

function Przyciski(rzucaj)
{
	if(rzucaj == "P")
	{
		document.getElementById("btWiecej").disabled = true;
		document.getElementById("btMniej").disabled = true;
		document.getElementById("btRzucaj").disabled = false;
	}
	else 
	{
		document.getElementById("btWiecej").disabled = false;
		document.getElementById("btMniej").disabled = false;
		document.getElementById("btRzucaj").disabled = true;
	}

}

function RzutKomputer()
{
	sumaKości = rollDice();

	DodajParagraf("Suma kości komputera: " + sumaKości);
	DodajParagraf("Obstaw kolejny wynik");
}

function Rzut()
{
	var poprzedniWynik = sumaKości;
	var rezultat = "";
	sumaKości = rollDice();

	DodajParagraf("Suma kości gracza: " + sumaKości);

	if(tura == 0)
	{
		DodajParagraf("Komputer obstawia: " + ObstawKomputer());
		tura +=1;
	}
	else
	{
		if(poprzedniWynik > sumaKości)
			rezultat = "mniej";
		else if(poprzedniWynik < sumaKości)
			rezultat = "wiecej";
		else
			rezultat = "remis";

		if(rezultat == obstaw)
		{
			DodajParagraf("Komputer zgadł");
			AktualizujPunkty("komp");
		}
		else if(rezultat = "remis")
		{
			DodajParagraf("Remis, nikt nie ma punktu");
		}
		else
		{
			DodajParagraf("Komputer nie trafił, jego skucha");
			AktualizujPunkty("gracz");
		}

		ZmianaTury(ktoRzuca);
	}
}

function ObstawKomputer()
{
	var i = Math.floor((Math.random() * 1000) + 1);
	var w;
	//console.log(i);
	if(i%2 == 0)
		w = "mniej";
	else
		w = "wiecej";	 	


	obstaw = w;
	return w;
}

function Obstaw(wynik)
{
	var poprzedniWynik = sumaKości;
	var rezultat = "";

	obstaw = wynik;
	sumaKości = rollDice();

	DodajParagraf("Suma kości komputera: " + sumaKości);
	DodajParagraf("Obstawiłeś: " + obstaw);

	if(poprzedniWynik > sumaKości)
		rezultat = "mniej"
	else if(poprzedniWynik < sumaKości)
		rezultat = "wiecej"

	if(rezultat == obstaw)
	{
		DodajParagraf("Zgadłeś, punkt dla Ciebie");
		AktualizujPunkty("gracz");
	}
	else if(rezultat = "remis")
	{
		DodajParagraf("Remis, nikt nie ma punktu");
	}
	else
	{
		DodajParagraf("Nie trafiłeś, walcz dalej");
		AktualizujPunkty("komp");
	}

	ZmianaTury(ktoRzuca);
}

function AktualizujPunkty(komu)
{
	switch(komu)
	{
		case "gracz":
			punktyPlayer += 1;
			document.getElementById("player").innerHTML = punktyPlayer;
			break;

		case "komp":
			punktyCPU += 1;
			document.getElementById("cpu").innerHTML = punktyCPU;
			break;
	}
}

function KtoZaczyna()
{
	var i = Math.floor((Math.random() * 100) + 1);
	//console.log(i);
	if(i%2 == 0)
		return "P";
	else
		return "C";	 
}

function ZmianaTury(aktualnie)
{
	tura = 0;

	if(aktualnie == "P")
	{
		ktoRzuca = "C";
		DodajParagraf("Teraz rzuca komputer");
	}
	else
	{
		ktoRzuca = "P";	
		DodajParagraf("Teraz rzuca gracz");
	}
	runda += 1;
	
	Przyciski(ktoRzuca);
	Runda();
}

function DodajParagraf(tekst)
{
	var node = document.createElement("p");
	node.className += "message";
	var textnode = document.createTextNode(tekst);

	node.appendChild(textnode);
	document.getElementById('log').appendChild(node);
}



function rollDice() 
{

    var dice1 = document.getElementById("dice1");
    var dice2 = document.getElementById("dice2");
    var dice3 = document.getElementById("dice3");
    var status = document.getElementById("status");

    var d1 = Math.floor(Math.random() * 6) + 1;
    var d2 = Math.floor(Math.random() * 6) + 1;
    var d3 = Math.floor(Math.random() * 6) + 1;
    var diceResult = d1 + d2 + d3;

    dice1.innerHTML = d1;
    dice2.innerHTML = d2;
    dice3.innerHTML = d3;
    status.innerHTML = "Result: " + diceResult;

    return diceResult;
}

function CzyśćLog()
{
	var elements = document.getElementsByClassName("message");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
		}
	document.getElementById("player").innerHTML = 0;
	document.getElementById("cpu").innerHTML = 0;
}