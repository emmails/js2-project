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
let h1 = document.querySelector('h1');
let selectedArr = [];

function startView(arr) {
    h1.innerText = 'Choose two characters:';
    let selectCharacterDiv = document.createElement('div');
    selectCharacterDiv.classList.add('selectDiv');
    let submitBtn = document.createElement('button');
    submitBtn.innerText = 'Compare';
    arr.forEach((obj) => {
        let btn = document.createElement('button');
        btn.id = obj.id;
        btn.classList.add('selectCharacter');
        let img = document.createElement('img');
        img.src = obj.img;
        img.alt = obj.name;
        let p = document.createElement('p');
        p.innerText = obj.name;
        btn.append(img, p);
        selectCharacterDiv.append(btn);

        btn.addEventListener('click', (e) => {
            let btn = e.target.parentElement;
            if(!btn.classList.contains('selectDiv')) {
                if(selectedArr.length < 2) {
                    selectedArr.push(btn.id)
                    btn.disabled = true;
                }
            }
        })
    })
    main.append(selectCharacterDiv, submitBtn);

    submitBtn.addEventListener('click', () => {
        if(selectedArr.length < 2) {
            alert('Please choose two characters!')
        }
        else {
            main.innerHTML = '';
            h1.innerText = 'Compare characters'
            newCharacters()
        }
    })
}

startView(characterSelection);

class Character {
    constructor(name, gender, height, mass, hairColor, skinColor, eyeColor, movies, home, vehicles) {
        this.name = name;
        this.gender = gender;
        this.height = Number(height);
        this.mass = Number(mass);
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.movies = movies;
        this.home = home;
        this.vehicles = vehicles;
        this.pictureUrl = `img/placeholder.jpg`/* ${this.name.toLowerCase().split(" ").join("")}.jpg */
    }
    static compareHeight(characterOne, characterTwo) {
        if (characterOne.height > characterTwo.height) {
          return `${characterOne.name} is taller than ${characterTwo.name}.`;
        } else if (characterOne.height < characterTwo.height) {
          return `${characterTwo.name} is taller than ${characterOne.name}.`;
        } else {
          return `${characterOne.name} and ${characterTwo.name} are the same height.`;
        }
      }
      static compareWeight(characterOne, characterTwo) {
        if (characterOne.mass > characterTwo.mass) {
          return `${characterOne.name} weigh more than ${characterTwo.name}.`;
        } else if (characterOne.mass < characterTwo.mass) {
          return `${characterTwo.name} weigh more than ${characterOne.name}.`;
        } else {
          return `${characterOne.name} and ${characterTwo.name} weigh the same.`;
        }
      }
      static compareAmountOfMovies(characterOne, characterTwo) {
        if (characterOne.movies[0].length > characterTwo.movies[0].length) {
          return `${characterOne.name} has appeared in more movies than ${characterTwo.name}.`;
        } else if (characterOne.movies[0].length < characterTwo.movies[0].length) {
          return `${characterTwo.name} has appeared in more movies than ${characterOne.name}.`;
        } else {
          return `${characterOne.name} and ${characterTwo.name} has appeared in the same amount of movies.`;
        }
      }
      static compareGender(characterOne, characterTwo) {
       if (characterOne.gender === characterTwo.gender) {
          return `${characterOne.name} and ${characterTwo.name} are the same gender.`;
        } 
      }
      static compareHair(characterOne, characterTwo) {
        if (characterOne.hairColor === characterTwo.hairColor) {
          return `${characterOne.name} and ${characterTwo.name} have the same hair color.`;
        } 
      }
      static compareEyes(characterOne, characterTwo) {
        if (characterOne.eyeColor === characterTwo.eyeColor) {
          return `${characterOne.name} and ${characterTwo.name} have the same eye color.`;
        } 
      }
      static compareHomePlanet(characterOne, characterTwo) {
        if (characterOne.home === characterTwo.home) {
          return `${characterOne.name} and ${characterTwo.name} are from the same planet.`;
        } 
      }
      static compareMovies(characterOne, characterTwo) {
        let sameMovies = [];
        characterOne.movies[0].forEach((movie) => {
            if(characterTwo.movies[0].includes(movie)) {
                sameMovies.push(movie)
            }
        })
        let testFunc = async () => {
            let data = await getMovie(sameMovies)
            let titles = movies(data)
            return `${characterOne.name} and ${characterTwo.name} both appeare in ${titles}`
        }
        return testFunc()

        /* return getMovie() */
      }
      static firstMovie(character) {
        let getFirstMovie = async () => {
            let firstMovie = await getExtraData(character.movies[0][0])
            return `${character.name} first appeared in a movie ${firstMovie.release_date}`
        }
        return getFirstMovie()
      }
      static homePlanet(character) {
        let getHomePlanet = async () => {
            let homePlanet = await getExtraData(character.home)
            return `${character.name} is from ${homePlanet.name}`
        }
        return getHomePlanet()
      }
      static mostExpensiveVehicle(character) {
        let getVehicle = async () => {
            let promises = character.vehicles.map((vehicle) => getExtraData(vehicle))
            let results = await Promise.all(promises)
            const max = results.reduce(function(prev, current) {
                return (Number(prev.cost_in_credits) > Number(current.cost_in_credits)) ? prev : current
            })
            return `The most expensive vehicle ${character.name} has is ${max.name}`
        }
        return getVehicle()
    }
      
}


let getData = async (id) => {
    let data = await fetch(`https://swapi.dev/api/people/${id}/`) 
    let json = await data.json()
    return json
}

let getExtraData = async (https) => {
    let data = await fetch(`${https}`)
    let json = await data.json()
    return json
}

let newCharacters = async () => {
    let promises = selectedArr.map((id) => getData(id));
    let results = await Promise.all(promises);
    let character1;
    let character2;
    results.forEach((obj, i) => {
        if(i === 0) {
            let films = [obj.films]
            let vehicles = [obj.vehicles]
            let starships = [obj.starships]
            let allVehicles = vehicles[0].concat(starships[0])
            character1 = new Character(obj.name, obj.gender, obj.height, obj.mass, obj.hair_color, 
            obj.skin_color, obj.eye_color, films, obj.homeworld, allVehicles)
            return renderCharacter(character1)
        }
        if(i === 1){
            let films = [obj.films]
            let vehicles = [obj.vehicles]
            let starships = [obj.starships]
            let allVehicles = vehicles[0].concat(starships[0])
            character2 = new Character(obj.name, obj.gender, obj.height, obj.mass, obj.hair_color, 
            obj.skin_color, obj.eye_color, films, obj.homeworld, allVehicles)
            return renderCharacter(character2)
        }
        
    })
    let funFactArr = getArrayFunFact(character1, character2);
    renderFunFact(funFactArr, character1, character2)
}

let renderCharacter = (obj) => {
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = obj.pictureUrl;
    img.alt = obj.name;
    let h2 = document.createElement('h2');
    h2.innerText = `${obj.name}`;
    let ul = document.createElement('ul');
    ul.innerHTML = `<li>Hair color: ${obj.hairColor}</li>
    <li>Height: ${obj.height}</li>
    <li>Weight: ${obj.mass}</li>
    <li>Gender: ${obj.gender}</li>
    <li>Skin color: ${obj.skinColor}</li>
    <li>Eye color: ${obj.eyeColor}</li>
    <li>Amount of movies: ${obj.movies[0].length}</li>`

    let btnFirstMovie = document.createElement('button');
    btnFirstMovie.innerText = 'First movie';
    btnFirstMovie.classList.add('popup');
    let movieSpan = document.createElement('span');
    movieSpan.classList.add('popuptext');
    movieSpan.id = 'myPopup';
    btnFirstMovie.append(movieSpan);

    let btnHomePlanet = document.createElement('button');
    btnHomePlanet.innerText = 'Home planet';
    btnHomePlanet.classList.add('popup');
    let homePlanetSpan = document.createElement('span');
    homePlanetSpan.classList.add('popuptext');
    homePlanetSpan.id = 'myPopup';
    btnHomePlanet.append(homePlanetSpan);

    let btnExpensiveVehicle = document.createElement('button');
    btnExpensiveVehicle.innerText = 'Most expensive vehicle';
    btnExpensiveVehicle.classList.add('popup');
    let vehicleSpan = document.createElement('span');
    vehicleSpan.classList.add('popuptext');
    vehicleSpan.id = 'myPopup';
    btnExpensiveVehicle.append(vehicleSpan);

    div.append(img, h2, ul, btnFirstMovie, btnHomePlanet, btnExpensiveVehicle);
    main.append(div);

    btnFirstMovie.addEventListener('click', async () => { 
        let firstMovie = await Character.firstMovie(obj);
        popUp(movieSpan, firstMovie)
    })
    btnHomePlanet.addEventListener('click', async () => {
        let homePlanet = await Character.homePlanet(obj);
        popUp(homePlanetSpan, homePlanet)
    })
    btnExpensiveVehicle.addEventListener('click', async () => {
        let vehicle = await Character.mostExpensiveVehicle(obj);
        popUp(vehicleSpan, vehicle)
    })
}

let getArrayFunFact = (char1, char2) => {
    let funFactArr = []
    funFactArr.push(Character.compareHeight(char1, char2), Character.compareWeight(char1, char2), Character.compareAmountOfMovies(char1, char2), Character.compareGender(char1, char2), Character.compareHair(char1, char2), Character.compareEyes(char1, char2), Character.compareHomePlanet(char1, char2))
    return funFactArr
}

let renderFunFact = (arr, char1, char2) => {
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerText = 'Fun Fact:'
    let ul = document.createElement('ul');
    arr.forEach((x) => {
        if(x === undefined) {}
        else {
            let li = document.createElement('li');
            li.innerText = x;
            ul.append(li);
        }
    })
    let btnCompareMovies = document.createElement('button');
    btnCompareMovies.innerText = 'Compare movies';
    btnCompareMovies.classList.add('popup');
    let compareMoviesSpan = document.createElement('span');
    compareMoviesSpan.classList.add('popuptext');
    compareMoviesSpan.id = 'myPopup';
    btnCompareMovies.append(compareMoviesSpan);

    div.append(h2, ul, btnCompareMovies);
    main.append(div);

    btnCompareMovies.addEventListener('click', async () => {
        let sameMovies = await Character.compareMovies(char1, char2);
        popUp(compareMoviesSpan, sameMovies)
    })
}

let getMovie = async (arr) => {
    let promises = arr.map((movie) => getExtraData(movie))
    let results = await Promise.all(promises)
    return results
}
let movies = (results) => {
    let movieTitles = [];
    results.forEach((result) => {
        movieTitles.push(result.title)
    })
    return movieTitles
} 

let popUp = (span, value) => {
    span.innerText = value;
    span.classList.toggle("show");
}