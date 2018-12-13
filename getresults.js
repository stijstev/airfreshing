function menWomenQualityCorrelation() {
    let amWomen = 0;
    let amMen = 0;
    let amWomenActive = 0;
    let amMenActive = 0;
    DATA.forEach(person => {
        if (person["Wat is uw geslacht?"] == "Vrouw") {
            amWomen++
            if (person["Bent u bewust bezig met de luchtkwaliteit in uw woning? (verlucht u, let u op vochtigheid, heeft u CO melders, ... ?)"] == "Ja") {
                amWomenActive++
            }
        }
        if (person["Wat is uw geslacht?"] == "Man") {
            amMen++
            if (person["Bent u bewust bezig met de luchtkwaliteit in uw woning? (verlucht u, let u op vochtigheid, heeft u CO melders, ... ?)"] == "Ja") {
                amMenActive++
            }
        }
        
    });
    return {amMen, amWomen, amMenActive, amWomenActive}
}

function ageHomeCorrelation() {
    let amountOld = 0;
    let amountNew = 0;
    let amountQualityOld = 0;
    let amountQualityNew = 0;

    DATA.forEach(person => {
        if (parseFloat(person["Hoe oud is uw woning?"]) > 40 && parseFloat(person["Hoe oud is uw woning?"]) < 250) {
            amountOld++
            if (person["Denkt u dat de lucht bij u in huis gezond is?"] == "Ja") {
                amountQualityOld++;
            }
        }
        if (parseFloat(person["Hoe oud is uw woning?"]) < 40) {
            amountNew++
            if (person["Denkt u dat de lucht bij u in huis gezond is?"] == "Ja") {
                amountQualityNew++;
            }
        }
    });
    return {amountQualityOld, amountOld, amountQualityNew, amountNew}
}

function familyQualityCorrelation() {
    let yes = 0;
    let no = 0;
    let livesWithFamily = 0;
    DATA.forEach(person => {
        if (person["Wat is uw woonsituatie?"] == "Ik woon samen met mijn gezin") {
            livesWithFamily++
        }
        if (person["Wat is uw woonsituatie?"] == "Ik woon samen met mijn gezin" && person["Bent u bewust bezig met de luchtkwaliteit in uw woning? (verlucht u, let u op vochtigheid, heeft u CO melders, ... ?)"] == "Ja") {
            yes++
        }
        if (person["Wat is uw woonsituatie?"] == "Ik woon samen met mijn gezin" && person["Bent u bewust bezig met de luchtkwaliteit in uw woning? (verlucht u, let u op vochtigheid, heeft u CO melders, ... ?)"] == "No") {
            no++
        }
    });
    return {livesWithFamily, yes, no}
}

function airQualityRealisation() {
    let amount = 0;
    DATA.forEach(person => {
        if (person["Denkt u dat de lucht bij u in huis gezond is?"] == "Ik weet het niet") {
            amount++
        }
    });
    return amount;
}

function toPercentage(numerator, denominator) {
    return Math.round(numerator / denominator * 100) + "%";
}

function getStats() {
    let menWomenQualityCorrelationResult = menWomenQualityCorrelation();
    document.write("Aantal vrouwen die deelnamen aan het onderzoek: " + menWomenQualityCorrelationResult.amWomen + " of " + toPercentage(menWomenQualityCorrelationResult.amWomen, DATA.length) + "<br>");
    document.write("Aantal mannen die deelnamen aan het onderzoek: " + menWomenQualityCorrelationResult.amMen + " of " + toPercentage(menWomenQualityCorrelationResult.amMen, DATA.length) + "<br>");
    document.write("Aantal vrouwen die bewust bezig zijn met luchtkwaliteit: " + menWomenQualityCorrelationResult.amWomenActive + " of " + toPercentage(menWomenQualityCorrelationResult.amWomenActive, menWomenQualityCorrelationResult.amWomen) + " van het aantal deelnemende vrouwen <br>");
    document.write("Aantal mannen die bewust bezig zijn met luchtkwaliteit: " + menWomenQualityCorrelationResult.amMenActive + " of " + toPercentage(menWomenQualityCorrelationResult.amMenActive, menWomenQualityCorrelationResult.amMen) + " van het aantal deelnemende mannen <br>");
   
    document.write(" <br> Aantal mensen dat samen met gezin woont: " + familyQualityCorrelation().livesWithFamily + " of " + toPercentage(familyQualityCorrelation().livesWithFamily, DATA.length) + " van de ondervraagde mensen <br>");
    document.write("Waarvan bewust bezig zijn met kwaliteit: " + familyQualityCorrelation().yes + " of " + toPercentage(familyQualityCorrelation().yes, familyQualityCorrelation().livesWithFamily) + "<br>");
    document.write("Waarvan niet bewust bezig zijn met kwaliteit: " + familyQualityCorrelation().no + "<br>");
    
    document.write("<br> Aantal ondervraagde mensen die wonen in een huis ouder dan 40 jaar: " + ageHomeCorrelation().amountOld + " of " + toPercentage(ageHomeCorrelation().amountOld, DATA.length) + " van de ondervraagde mensen <br>");
    document.write("Waarvan ze denken dat hun lucht ongezond is: " + ageHomeCorrelation().amountQualityOld + " of " + toPercentage(ageHomeCorrelation().amountQualityOld, ageHomeCorrelation().amountOld) + "<br>");
    document.write("Aantal ondervraagde mensen die wonen in een huis jonger dan 40 jaar: " + ageHomeCorrelation().amountNew + " of " + toPercentage(ageHomeCorrelation().amountNew, DATA.length) + " van de ondervraagde mensen <br>");
    document.write("Waarvan ze denken dat hun lucht ongezond is: " + ageHomeCorrelation().amountQualityNew + " of " + toPercentage(ageHomeCorrelation().amountQualityNew, ageHomeCorrelation().amountNew) + "<br>");
    document.write("<p}>Data onvolledig door onverwerkbare antwoorden</p>")
    
    document.write(" <br> Aantal mensen die niet weten of hun lucht ongezond of gezond is: " + airQualityRealisation() + " of " + toPercentage(airQualityRealisation(), DATA.length)) + "<br>";
}

getStats();