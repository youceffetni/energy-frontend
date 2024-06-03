
import { ReactNode } from "react";





export const onlyDirtyFields=(data:Record<any,any>)=>{
  

    Object.keys(data).map((key)=>{

        if(data[key]==="")
             data[key]=null;
    })


    return data;

}



export function formatMontant(number:number|string|ReactNode){
   
     const montant=Math.floor(Number(number)*100)/100 
    return montant.toLocaleString('fr-FR', { minimumFractionDigits: 2 });

}

export function deformatMontant(number:string) {
    // Remove spaces
    let formattedNumber = number.replace(/\s/g, '');
    
    // Remove commas
    formattedNumber = formattedNumber.replace(/,/g, '');
    
    return formattedNumber;
  }



export function NumberToLetter(nombre: string, U: string = "Dinars", D: string = "Centimes"): string {
    const letter: { [key: number]: string } = {
        0: "zéro",
        1: "un",
        2: "deux",
        3: "trois",
        4: "quatre",
        5: "cinq",
        6: "six",
        7: "sept",
        8: "huit",
        9: "neuf",
        10: "dix",
        11: "onze",
        12: "douze",
        13: "treize",
        14: "quatorze",
        15: "quinze",
        16: "seize",
        17: "dix-sept",
        18: "dix-huit",
        19: "dix-neuf",
        20: "vingt",
        30: "trente",
        40: "quarante",
        50: "cinquante",
        60: "soixante",
        70: "soixante-dix",
        80: "quatre-vingt",
        90: "quatre-vingt-dix",
    };

    let quotient: number, reste: number, nb: number;
    let numberToLetter = '';

    if (nombre.replace(/ /gi, "").length > 15) return "dépassement de capacité";
    if (isNaN(Number(nombre.replace(/ /gi, "")))) return "Nombre non valide";

    nb = parseFloat(nombre.replace(/ /gi, ""));
    if (Math.ceil(nb) != nb) {
        const parts = nombre.split('.');
        return NumberToLetter(parts[0]) + (U ? " " + U + " et " : " virgule ") + NumberToLetter(parts[1]) + (D ? " " + D : "");
    }

    const n = nb.toString().length;
    switch (n) {
        case 1:
            numberToLetter = letter[nb];
            break;
        case 2:
            if (nb > 19) {
                quotient = Math.floor(nb / 10);
                reste = nb % 10;
                if (nb < 71 || (nb > 79 && nb < 91)) {
                    if (reste == 0) numberToLetter = letter[quotient * 10];
                    else if (reste == 1) numberToLetter = letter[quotient * 10] + "-et-" + letter[reste];
                    else numberToLetter = letter[quotient * 10] + "-" + letter[reste];
                } else {
                    numberToLetter = letter[(quotient - 1) * 10] + "-" + letter[10 + reste];
                }
            } else {
                numberToLetter = letter[nb];
            }
            break;
        case 3:
            quotient = Math.floor(nb / 100);
            reste = nb % 100;
            if (quotient == 1 && reste == 0) numberToLetter = "cent";
            else if (quotient == 1 && reste != 0) numberToLetter = "cent " + NumberToLetter(reste.toString());
            else if (quotient > 1 && reste == 0) numberToLetter = letter[quotient] + " cents";
            else if (quotient > 1 && reste != 0) numberToLetter = letter[quotient] + " cent " + NumberToLetter(reste.toString());
            break;
        case 4:
        case 5:
        case 6:
            quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if (quotient == 1 && reste == 0) numberToLetter = "mille";
            else if (quotient == 1 && reste != 0) numberToLetter = "mille " + NumberToLetter(reste.toString());
            else if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient.toString()) + " mille";
            else if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient.toString()) + " mille " + NumberToLetter(reste.toString());
            break;
        case 7:
        case 8:
        case 9:
            quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un million";
            else if (quotient == 1 && reste != 0) numberToLetter = "un million " + NumberToLetter(reste.toString());
            else if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient.toString()) + " millions";
            else if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient.toString()) + " millions " + NumberToLetter(reste.toString());
            break;
        case 10:
        case 11:
        case 12:
            quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
            else if (quotient == 1 && reste != 0) numberToLetter = "un milliard " + NumberToLetter(reste.toString());
            else if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient.toString()) + " milliards";
            else if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient.toString()) + " milliards " + NumberToLetter(reste.toString());
            break;
        case 13:
        case 14:
        case 15:
            quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un billion";
            else if (quotient == 1 && reste != 0) numberToLetter = "un billion " + NumberToLetter(reste.toString());
            else if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient.toString()) + " billions";
            else if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient.toString()) + " billions " + NumberToLetter(reste.toString());
            break;
    }

    if (numberToLetter.endsWith("quatre-vingt")) {
        numberToLetter += "s";
    }

    return numberToLetter;
}





