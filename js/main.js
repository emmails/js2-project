let characterSelection = [{
    name: 'Luke Skywalker',
    img: 'img/placeholder.jpg',
    id: 1,
},
{
    name: 'Leia Organa',
    img: 'img/placeholder.jpg',
    id: 5,
},
{
    name: 'Darth Vader',
    img: 'img/placeholder.jpg',
    id: 4,
},
{
    name: 'Yoda',
    img: 'img/placeholder.jpg',
    id: 20,
},
{
    name: 'R2-D2',
    img: 'img/placeholder.jpg',
    id: 3,
},
{
    name: 'Chewbacca',
    img: 'img/placeholder.jpg',
    id: 13,
}];
let main = document.querySelector('main');
let h2 = document.querySelector('h2');

function startView(arr) {
    h2.innerText = 'Choose two characters:';
    let selectCharacterDiv = document.createElement('div');
    selectCharacterDiv.classList.add('selectDiv')
    arr.forEach((obj) => {
        let div = document.createElement('div');
        div.id = obj.id;
        div.classList.add('selectCharacter');
        let img = document.createElement('img');
        img.src = obj.img;
        img.alt = obj.name;
        let p = document.createElement('p');
        p.innerText = obj.name;
        div.append(img, p);
        selectCharacterDiv.append(div);
    })
    main.append(selectCharacterDiv);
}

startView(characterSelection);

class Character {
    constructor(name, gender, height, mass, hairColor, skinColor, eyeColor, movies) {
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.movies = movies;
        this.pictureUrl = `img/${this.name.toLowerCase().split(" ").join("")}.jpg`
    }
}


