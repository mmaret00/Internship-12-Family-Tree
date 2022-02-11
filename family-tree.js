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
