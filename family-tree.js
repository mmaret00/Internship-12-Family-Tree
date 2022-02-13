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

function PrintAGeneration(person, stringToPrint){
    let generation = [];

    for(let child of person.children){
        stringToPrint += `${child.firstName} (${child.id})      `;
        generation.push(child);

        if(!child.spouse) continue;

        stringToPrint = stringToPrint.slice(0, -5) +
         `- ${child.spouse.firstName} (${child.spouse.id})      `;
    }

    stringToPrint += '\n';
    for(let memberOfGeneration of generation){
        if(!memberOfGeneration.children.length) continue;
        stringToPrint = PrintAGeneration(memberOfGeneration, stringToPrint);
    }
    return stringToPrint;
}

function ChangeSelectedPerson(stringToPrint, chosenPerson){
    let newId = parseInt(prompt(`${stringToPrint}\n` +
        `Unesi ID osobe koju želite odabrati:\n` +
        `(za odustajanje unesite 0 ili prazan unos)`));
    if(!newId){
        alert('Odustali ste.')
        return chosenPerson;
    }
    if (familyTree.some(p => p.id === newId)) {
        return familyTree.find(p => p.id === newId);
    }
    alert('Ne postoji osoba s tim ID-om! Molimo ponovite unos.');
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
    let stringToPrint = PrintCurrentPersonBasicInfo(person);
    
    if(person.mother && person.father){
        stringToPrint += PrintCurrentPersonParentsInfo(person);
    }
    if(person.spouse){
        stringToPrint += PrintCurrentPersonSpouseInfo(person);
    }
    if(person.children.length){
        stringToPrint += PrintCurrentPersonChildrenInfo(person);
    }
    return stringToPrint;
}

function PrintCurrentPersonBasicInfo(person){
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

function PrintCurrentPersonParentsInfo(person){
    return `\nMajka: ${person.mother.firstName} ` +
        `(ex ${person.mother.lastName}) (ID: ${person.mother.id}), ` +
        `Otac: ${person.father.firstName} (ID: ${person.father.id})`;
}

function PrintCurrentPersonSpouseInfo(person){
    let stringToPrint = `\nSupružnik: ${person.spouse.firstName} `;
    if(person.sex === 'Muško' && person.spouse.sex === 'Žensko'){
        stringToPrint += `(ex ${person.spouse.lastName}) `;
    }
    return stringToPrint + `(ID: ${person.spouse.id})`;
}

function PrintCurrentPersonChildrenInfo(person){
    let stringToPrint = '\nDjeca:';
        for(let child of person.children){
            stringToPrint += ` ${child.firstName} (ID: ${child.id}),`
        }
    return stringToPrint.slice(0, -1);
}

function EnterBasicInfo(person, choice){
    if(!choice || !EnterBasicInfoCheck(person, choice)){
        return;
    }

    let firstName = CheckName('ime');
    if(!firstName){
        return;
    }
    let lastName;
    if(choice === 'spouse' && !(lastName = CheckName('prezime'))){
        return;
    }
    let sex = CheckSex();
    if(!sex){
        return;
    }
    let yearOfBirth = CheckYear(person, 'birth', choice);
    if(!yearOfBirth){
        alert('Odustali ste.');
        return;
    }
    let yearOfDeath = CheckYear(person, 'death', choice, yearOfBirth);
    if(yearOfDeath === null){
        alert('Odustali ste.');
        return;
    }
    yearOfDeath = yearOfDeath === '0' ? null : yearOfDeath;

    if(choice === 'child'){
        AddChild(person, firstName, sex, yearOfBirth, yearOfDeath);
        return;
    }
    AddSpouse(person, firstName, lastName, sex, yearOfBirth, yearOfDeath);
}

function EnterBasicInfoCheck(person, choice){
    if(choice === 'child' && !person.spouse){
        alert('Osoba ne može imati djecu jer nema supružnika!');
        return false;
    }
    if(choice === 'child' && person.sex === person.spouse.sex){
        alert('Ne mogu se dodavati djeca istospolnim supružnicima!');
        return false;
    }
    if(choice === 'child' && person.sex === 'Žensko' && person.father){
        alert('Ne mogu se dodavati djeca ženi koja se udala u drugu obitelj!');
        return false;
    }
    if(choice === 'spouse' && person.spouse){
        alert('Osoba već ima supružnika!');
        return false;
    }
    return true;
}

function AddNewMemberSubmenu(){
    let choice = prompt('Unesite broj:\n'+
        '1 - Dodavanje djeteta trenutnoj osobi\n' +
        '2 - Dodavanje supružnika trenutnoj osobi\n' +
        '0 - Odustajanje');
    if(choice === '0'){
        return 0;
    }
    if(choice === '1' || choice === '2'){
        return choice === '1' ? 'child' : 'spouse';
    }
    alert('Molimo unesite broj između 0 i 2!');
    return AddNewMemberSubmenu();
}


function CheckName(choice){
    let name = prompt(`Unesi ${choice}\n(za odustajanje unesite prazan unos):`);
    if(!name){
        alert('Odustali ste.')
        return;
    }
    name.trim();
    if(name.length < 3){
        alert(`${choice.charAt(0).toUpperCase() + choice.slice(1)} ` +
            `ne smije biti kraće od 3 znaka! Molimo ponovite unos.`);
        return CheckName(choice);
    }
    if (/\d/.test(name)){
        alert(`${choice.charAt(0).toUpperCase() + choice.slice(1)} `+
            `ne smije sadržavati brojeve! Molimo ponovite unos.`);
        return CheckName(choice);
    }
    return name;
}

function CheckSex(){
    let enteredSex = prompt('Unesi spol (M ili Ž):\n' +
        '(za odustajanje unesite prazan unos)');
    if(!enteredSex){
        alert('Odustali ste.')
        return null;
    }
    enteredSex = enteredSex.trim().toUpperCase();
    if(enteredSex != 'M' && enteredSex != 'Ž'){
        alert('Nedopušten unos! Molimo unesite M ili Ž.');
        return CheckSex();
    }
    return enteredSex === 'M' ? 'Muško' : 'Žensko';
}

function CheckYear(person, dateChoice, typeOfEntry, birthYear){
    let stringToPrint = dateChoice === 'birth' ?
        `Unesite godinu rođenja` :
        `Unesite godinu smrti\n` +
        `(ako je osoba još živa unesite 0)`;

    let year = prompt(`${stringToPrint}\n` +
        `(za odustajanje unesite prazan unos):`);

    if(year === '0' && dateChoice === 'death'){
        return year;
    }
    if(!year){
        return null;
    }
    year = parseInt(year);
    if(dateChoice === 'birth' &&
        (!CheckYearWhenAddingChildsBirth(person, year, typeOfEntry)
        || !CheckYearSpan(year))){
            return CheckYear(person, dateChoice, typeOfEntry);
    }
    if(dateChoice === 'death'
        && (!CheckIfDeathPrecedesBirth(year, birthYear)
        || !CheckYearSpan(year))){
            return CheckYear(person, dateChoice, typeOfEntry, birthYear);
    }
    return year;
}

function CheckYearWhenAddingChildsBirth(person, year, typeOfEntry){
    if(person.yearOfDeath &&
        person.yearOfDeath < year &&
        (!person.spouse ||
        person.spouse.yearOfDeath < year - 1)){
            alert('Osoba koja je umrla određene godine ' +
                `ne može imati ${typeOfEntry === 'child' ? 'dijete' : 'supružnika'} ` + 
                's godinom rođenja višom od godine svoje smrti!');
            return false;
    }
    var condition = typeOfEntry === '1' && person.yearOfBirth >= year &&
        person.spouse.yearOfBirth >= year;
    if(condition){
            alert('Djeca ne mogu biti starija od roditelja!');
    }
    return !condition;
}

function CheckIfDeathPrecedesBirth(year, birthYear){
    year = parseInt(year);
    let condition = birthYear > year;
    if(condition){
        alert('Godina smrti ne smije biti ranija od godine rođenja!');
    }
    return !condition;
}

function CheckYearSpan(year){
    let condition = year < 1700 || year > new Date().getFullYear();
    if(condition){
        alert('Molimo unesite godinu između 1700. i trenutne!');
    }
    return !condition;
}

function AddChild(person, firstName, sex, yearOfBirth, yearOfDeath){
    if(person.sex === 'Žensko'){
        person = person.spouse;
    }
    let newChild = {id: parseInt(familyTree[familyTree.length - 1].id + 1),
        firstName, lastName: person.lastName, sex, yearOfBirth, yearOfDeath,
        mother: person.spouse, father: person, spouse:null, children:[]};

    familyTree.push(newChild);
    person.children.push(newChild);
    person.spouse.children.push(newChild);
}

function AddSpouse(person, firstName, lastName, sex, yearOfBirth, yearOfDeath){
    let newSpouse = {id: parseInt(familyTree[familyTree.length - 1].id + 1),
        firstName, lastName, sex, yearOfBirth, yearOfDeath, mother:null,
        father:null, spouse: person, children:[]};

    familyTree.push(newSpouse);
    person.spouse = newSpouse;
}

function EnterDeath(person){
    if(person.yearOfDeath){
        alert('Već je upisana smrt trenutne osobe!');
        return;
    }
    if(!confirm('Jeste li sigurni da želite upisati smrt trenutne osobe?')){
        return;
    }
    person.yearOfDeath = new Date().getFullYear();
    alert('Smrt je upisana.')
}

function StatisticsSubmenu(person){
    switch(StatisticsSubmenuOutput(person)){
        case '1':
            alert(`Vrhovni predak ` +
                `(${familyTree.find(p => p.id === 1).firstName} ` +
                `${familyTree.find(p => p.id === 1).lastName}) je ` +
                `${GetNumberOfGenerationsSinceFirstAncestor(person, 0)} ` +
                `razina iznad trenutne osobe`);
            return StatisticsSubmenu(person);
        case '2':
            PrintAllSiblings(person);
            return StatisticsSubmenu(person);
        case '3':
            GetAverageAgeOfASex();
            return StatisticsSubmenu(person);
        case '4':
            PrintNameFrequency();
            return StatisticsSubmenu(person);
        case '0':
            return;
        default:
            alert('Molimo unesite broj između 0 i 4!');
            return StatisticsSubmenu(person);
    }
}

function StatisticsSubmenuOutput(){
    return prompt('Unesite broj:\n'+
        '1 - Koliko razina predaka postoji od određenog ' +
        'člana stabla do vrhovnog pretka\n' +
        '2 - Ispis imena sve braće i sestara koju određeni član ima\n' +
        '3 - Prosječna životna dob članova obitelji za pojedini spol\n' +
        '4 - Tablica učestalosti imena u obitelji\n' +
        '0 - Povratak');
}

function GetNumberOfGenerationsSinceFirstAncestor(person, numberOfGenerations){
    if(person.id === 1 || person.id === 2){
        return numberOfGenerations;
    }
    if(!person.father){
        person = person.spouse;
    }
    return GetNumberOfGenerationsSinceFirstAncestor(person.father, 
        ++numberOfGenerations);
}

function PrintAllSiblings(person){
    if(!person.father){
        alert('Osoba nema upisane braću i sestre!');
        return;
    }
    let siblingsOutput = `Sva braća i sestre:\n\n`;
    let siblings =  familyTree
        .filter(p => p.father === person.father && p !== person);

    if(!siblings.length){
        alert('Osoba nema upisane braću i sestre!');
        return;
    }
    
    alert(PutPrefixesToSiblingsOutput(siblings, siblingsOutput)
        .slice(0, -1));
}

function PutPrefixesToSiblingsOutput(siblings, siblingsOutput){
    for(let sibling of siblings){
        siblingsOutput += 
            (sibling.sex === 'Muško' ? 'Brat ' : 'Sestra ') +
            `${sibling.firstName} (ID: ${sibling.id})\n`;
    }
    return siblingsOutput;
}

function GetAverageAgeOfASex(){
    let totalAge = 0, totalNumberOfPeople = 0;
    let chosenSex = CheckSex();
    if(!chosenSex){
        return;
    }

    let membersOfASex =  familyTree.filter(p => p.sex === chosenSex &&
        (chosenSex === 'Muško' || (chosenSex === 'Žensko' && !p.spouse)));

    if(!membersOfASex.length){
        alert('Ne postoje članovi obitelji s odabranim spolom!')
        return;
    }

    for(let person of membersOfASex){
        totalNumberOfPeople++;
        if(!person.yearOfDeath){
            totalAge += new Date().getFullYear() - person.yearOfBirth;
            continue;
        }
        totalAge += person.yearOfDeath - person.yearOfBirth;
    }
    alert(`Prosječna dob odabranog spola je ` +
        `${(Math.round(parseFloat(totalAge / totalNumberOfPeople)
        * 100) / 100).toFixed(2)} godina.`);
}

function PrintNameFrequency(){
    frequency = CalculateNameFrequency();

    let stringToPrint = 'Tablica učestalosti imena:\n\n';
     for(let name in frequency){
         stringToPrint += `${name} : ${frequency[name]} ponavljanja\n`;
     }
    alert(stringToPrint);
}

function CalculateNameFrequency(){
    let frequency = {};

    for(let person of familyTree){
        frequency[person.firstName] = frequency[person.firstName]
            ? frequency[person.firstName] + 1 : 1;
    }
    return frequency;
}