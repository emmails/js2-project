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