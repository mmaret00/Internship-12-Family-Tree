let firstPerson = {
    id: 1,
    firstName: 'Ivan',
    lastName: 'Horvat',
    sex: 'Muško',
    yearOfBirth: 1900,
    yearOfDeath: 1970,
    mother: null,
    father: null,
    spouse: null,
    children: []
}

let secondPerson = {
    id: 2,
    firstName: 'Ana',
    lastName: 'Jurić',
    sex: 'Žensko',
    yearOfBirth: 1900,
    yearOfDeath: 1970,
    mother: null,
    father: null,
    spouse: firstPerson,
    children: []
}

let thirdPerson = {
    id: 3,
    firstName: 'Ante',
    lastName: 'Horvat',
    sex: 'Muško',
    yearOfBirth: 1930,
    yearOfDeath: 1990,
    mother: secondPerson,
    father: firstPerson,
    spouse: null,
    children: []
}

let fourthPerson = {
    id: 4,
    firstName: 'Ivana',
    lastName: 'Horvat',
    sex: 'Žensko',
    yearOfBirth: 1935,
    yearOfDeath: 1995,
    mother: secondPerson,
    father: firstPerson,
    spouse: null,
    children: []
}

let fifthPerson = {
    id: 5,
    firstName: 'Šime',
    lastName: 'Šimić',
    sex: 'Muško',
    yearOfBirth: 1935,
    yearOfDeath: 1995,
    mother: null,
    father: null,
    spouse: fourthPerson,
    children: []
}

let sixthPerson = {
    id: 6,
    firstName: 'Marija',
    lastName: 'Marić',
    sex: 'Žensko',
    yearOfBirth: 1930,
    yearOfDeath: 1995,
    mother: null,
    father: null,
    spouse: thirdPerson,
    children: []
}

let seventhPerson = {
    id: 7,
    firstName: 'Ivan',
    lastName: 'Horvat',
    sex: 'Muško',
    yearOfBirth: 1960,
    yearOfDeath: null,
    mother: sixthPerson,
    father: thirdPerson,
    spouse: null,
    children: []
}

firstPerson.spouse = secondPerson;
firstPerson.children.push(thirdPerson, fourthPerson);
secondPerson.children.push(thirdPerson, fourthPerson);
thirdPerson.spouse = sixthPerson;
thirdPerson.children.push(seventhPerson);
sixthPerson.children.push(seventhPerson);
fourthPerson.spouse = fifthPerson;

let familyTree = [firstPerson, secondPerson, thirdPerson,
    fourthPerson, fifthPerson, sixthPerson, seventhPerson];

if(chosenPerson = PrintFamilyTree(null)){
    MainMenu(chosenPerson);
}
alert('Izašli ste. Pozdrav!')

function PrintFamilyTree(chosenPerson){
    let stringToPrint = 'Obiteljsko stablo (u zagradama je ID):\n\n';
    let firstAncestor = familyTree.find(p => p.id === 1);

    stringToPrint += `${firstAncestor.firstName} (${firstAncestor.id})` +
        ` - ${firstAncestor.spouse.firstName} (${firstAncestor.spouse.id})\n`;

    stringToPrint = PrintAGeneration(firstAncestor, stringToPrint);

    return ChangeSelectedPerson(stringToPrint, chosenPerson);
}

function MainMenu(chosenPerson){
    switch(MainMenuOutput(chosenPerson)){
        case '1':
            EnterBasicInfo(chosenPerson, AddNewMemberSubmenu())
            return MainMenu(chosenPerson);
        case '2':
            EnterDeath(chosenPerson);
            return MainMenu(chosenPerson);
        case '3':
            StatisticsSubmenu(chosenPerson);
            return MainMenu(chosenPerson);
        case '4':
            chosenPerson = ChangeSelectedPerson('', chosenPerson);
            return MainMenu(chosenPerson);
        case '5':
            chosenPerson = PrintFamilyTree(chosenPerson);
            return MainMenu(chosenPerson);
        case '0':
            return;
        default:
            alert('Molimo unesite broj između 0 i 5!');
            return MainMenu(chosenPerson);
    }
}

function MainMenuOutput(chosenPerson){
    return prompt(PrintCurrentPerson(chosenPerson) +
        '\n\nUnesite broj:\n' +
        '1 - Dodavanje novog člana obitelji u odnosu na trenutnu osobu\n' +
        '2 - Upis smrti trenutne osobe\n' +
        '3 - Ispis korisnih podataka\n' +
        '4 - Prebacivanje na drugu osobu po ID-u\n' +
        '5 - Ispis obiteljskog stabla i odabir osobe\n' +
        '0 - Izlaz');
}

function PrintCurrentPerson(person){
    let stringToPrint = PrintCurrentPersonBasic(person);
    
    if(person.mother && person.father){
        stringToPrint += PrintCurrentPersonParents(person);
    }
    if(person.spouse){
        stringToPrint += PrintCurrentPersonSpouse(person);
    }
    if(person.children.length){
        stringToPrint += PrintCurrentPersonChildren(person);
    }
    return stringToPrint;
}

function PrintCurrentPersonBasic(person){
    let stringToPrint = 'Trenutno ste na osobi:\n' +
    `ID: ${person.id}, ${person.firstName}`;
    if(person.sex === 'Žensko' && person.spouse
        && person.spouse.sex === 'Muško'){
            stringToPrint += ` ${person.spouse.lastName}` +
            ` (ex ${person.lastName})`
    }
    else{
     stringToPrint += ` ${person.lastName}`;
    }
    stringToPrint += ` (${person.sex})\nGodina rođenja: ${person.yearOfBirth}.`;
    if(person.yearOfDeath) {
        stringToPrint += `, godina smrti: ${person.yearOfDeath}.`;
    }
    return stringToPrint;
}

function PrintCurrentPersonParents(person){
    return `\nMajka: ${person.mother.firstName} ` +
        `(ex ${person.mother.lastName}) (ID: ${person.mother.id}), ` +
        `Otac: ${person.father.firstName} (ID: ${person.father.id})`;
}

function PrintCurrentPersonSpouse(person){
    let stringToPrint = `\nSupružnik: ${person.spouse.firstName} `;
    if(person.sex === 'Muško' && person.spouse.sex === 'Žensko'){
        stringToPrint += `(ex ${person.spouse.lastName}) `;
    }
    return stringToPrint + `(ID: ${person.spouse.id})`;
}

function PrintCurrentPersonChildren(person){
    let stringToPrint = '\nDjeca:';
        for(let child of person.children){
            stringToPrint += ` ${child.firstName} (ID: ${child.id}),`
        }
    return stringToPrint.slice(0, -1);
}
