const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
const mediaData = require("../src/data");
// chai.config.truncateThreshold = 0;

const server = setupServer();
describe("Media Library API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  it("should return full list of movies", async () => {
    const res = await request.get("/api/movies");
    chai.expect(res.body.length).to.equal(mediaData.movies.length);
  });

  // accessing via URL http://localhost:3000/api/movies?limit=1
  it("should return list of n movies given n", async () => {
    //n = 1
    const res = await request.get("/api/movies").query({ limit: 1 });
    chai.expect(res.body.length).to.equal(1);
  });

  it("should add a movie to the data", async () => {
    const movieToAdd = {
      title: "Some Like It Hot",
      director: "Billy Wilder",
      release: 1959,
      genre: "Comedy/Romance"
    };
    const res = await request.post("/api/movies").send(movieToAdd);
    chai.expect(res.body).to.deep.equal(movieToAdd);
  });

  // it("should return the pokemon with the given id", async () => {
  //   // if given id exists, correct response
  //   const id = 20;
  //   const res = await request.get(`/api/pokemon/${id}`);
  //   let expected;

  //   for (const pokemon of pokeData.pokemon) {
  //     if (Number(pokemon.id) === id) {
  //       expected = Object.assign({}, pokemon);
  //       break;
  //     }
  //   }

  //   chai.expect(res.body).to.deep.equal(expected);
  //   chai.expect(res.status).to.equal(200);
  // });

  // it("should return the pokemon with the given name", async () => {
  //   const res = await request.get("/api/pokemon/Mew");

  //   let expected;
  //   for (const pokemon of pokeData.pokemon) {
  //     if (pokemon.name === "Mew") {
  //       expected = Object.assign({}, pokemon);
  //       break;
  //     }
  //   }

  //   chai.expect(res.body).to.deep.equal(expected);
  //   chai.expect(res.status).to.equal(200);
  // });

  // it("should modify the pokemon with the given name", async () => {
  //   const name = "Mew3";
  //   const res = await request.patch("/api/pokemon/Mew").query({ name: "Mew3" });
  //   chai.expect(res.body.name).to.equal(name);
  // });

  // it("should modify the pokemon with the given ID", async () => {
  //   const res = await request.patch("/api/pokemon/4").query({ name: "Mew3" });
  //   chai.expect(res.body.name).to.equal("Mew3");
  // });

  // it("should NOT modify the pokemon with the name that does not exist", async () => {
  //   const res = await request
  //     .patch("/api/pokemon/Mew4")
  //     .query({ name: "Mew3" });
  //   chai.expect(res.status).to.equal(400);
  // });

  // //Delete
  // it("should DELETE the pokemon with given name", async () => {
  //   const id = 1;
  //   const res = await request.delete(`/api/pokemon/${id}`);
  //   chai.expect(res.status).to.equal(200);
  // });

  // it("should return the evolutions of the pokemon with given name", async () => {
  //   const name = "Mew";
  //   const res = await request.get(`/api/pokemon/${name}/evolutions`);
  //   chai.expect(res.body).to.deep.equal([]);
  // });

  // it("should return the evolutions of the pokemon with given id", async () => {
  //   const id = 2;
  //   const expected = [
  //     {
  //       id: 3,
  //       name: "Venusaur"
  //     }
  //   ];
  //   const res = await request.get(`/api/pokemon/${id}/evolutions`);
  //   chai.expect(res.body).to.deep.equal(expected);
  // });

  // //Previous
  // it("should return the PREVIOUS evolutions of the pokemon with given name", async () => {
  //   const name = "Mew";
  //   const res = await request.get(`/api/pokemon/${name}/evolutions/previous`);
  //   chai.expect(res.body).to.deep.equal([]);
  // });

  // it("should return the PREVIOUS evolutions of the pokemon with given id", async () => {
  //   const id = 2;
  //   const expected = [
  //     {
  //       id: 1,
  //       name: "Bulbasaur"
  //     }
  //   ];
  //   const res = await request.get(`/api/pokemon/${id}/evolutions/previous`);
  //   chai.expect(res.body).to.deep.equal(expected);
  // });

  // //---------TYPES----------
  // it("should return full list of types", async () => {
  //   const res = await request.get("/api/types");
  //   chai.expect(res.body.length).to.equal(pokeData.types.length);
  // });

  // it("should return list of n types given n", async () => {
  //   //n = 12
  //   const res = await request.get("/api/types").query({ limit: 12 });
  //   chai.expect(res.body.length).to.equal(12);
  // });

  // //Testing to add new type
  // it("should add a type to the data", async () => {
  //   const typeToAdd = { type: "potato" };
  //   const res = await request.post("/api/types").send(typeToAdd);
  //   chai.expect(res.body[0]).to.equal(typeToAdd.type);
  // });

  // //Testing to delete type
  // it("should DELETE the given type", async () => {
  //   const typeToDelete = "Fire";
  //   const res = await request.delete(`/api/types/${typeToDelete}`);
  //   chai.expect(res.status).to.equal(200);
  // });

  // it("should NOT DELETE a nonexistent type", async () => {
  //   const typeToDelete = "Google";
  //   const res = await request.delete(`/api/types/${typeToDelete}`);
  //   chai.expect(res.status).to.equal(400);
  // });

  // //Testing to get pokemon with given type
  // it("should retrieve all pokemon with given type", async () => {
  //   const typeToGet = "Psychic";
  //   const expected = [
  //     { id: "063", name: "Abra" },
  //     { id: "064", name: "Kadabra" },
  //     { id: "065", name: "Alakazam" },
  //     { id: "079", name: "Slowpoke" },
  //     { id: "080", name: "Slowbro" },
  //     { id: "096", name: "Drowzee" },
  //     { id: "097", name: "Hypno" },
  //     { id: "102", name: "Exeggcute" },
  //     { id: "103", name: "Exeggutor" },
  //     { id: "121", name: "Starmie" },
  //     { id: "122", name: "Mr. Mime" },
  //     { id: "124", name: "Jynx" },
  //     { id: "150", name: "Mewtwo" },
  //     { id: "151", name: "Mew3" }
  //   ];

  //   const res = await request.get(`/api/types/${typeToGet}/pokemon`);
  //   chai.expect(res.body).to.deep.equal(expected);
  // });

  // //Get list of attacks
  // it("should return full list of attacks", async () => {
  //   const res = await request.get("/api/attacks");
  //   const attacks = pokeData.attacks.fast.concat(pokeData.attacks.special);
  //   chai.expect(res.body).to.deep.equal(attacks);
  // });

  // it("should return list of n attacks given n", async () => {
  //   //n = 12
  //   const res = await request.get("/api/attacks").query({ limit: 12 });
  //   chai.expect(res.body.length).to.equal(12);
  // });

  // //Getting FAST attacks
  // it("should return full list of fast attacks", async () => {
  //   const res = await request.get("/api/attacks/fast");
  //   chai.expect(res.body).to.deep.equal(pokeData.attacks.fast);
  // });

  // it("should return list of n special attacks given n", async () => {
  //   //n = 12
  //   const res = await request.get("/api/attacks/fast").query({ limit: 12 });
  //   chai.expect(res.body.length).to.equal(12);
  // });

  // //Getting SPECIAL attacks
  // it("should return full list of special attacks", async () => {
  //   const res = await request.get("/api/attacks/special");
  //   chai.expect(res.body).to.deep.equal(pokeData.attacks.special);
  // });

  // it("should return list of n special attacks given n", async () => {
  //   //n = 12
  //   const res = await request.get("/api/attacks/special").query({ limit: 12 });
  //   chai.expect(res.body.length).to.equal(12);
  // });

  // it("should return attack with given name", async () => {
  //   const attack = "Tackle";
  //   const expected = {
  //     name: "Tackle",
  //     type: "Normal",
  //     damage: 12
  //   };
  //   const res = await request.get(`/api/attacks/${attack}`);
  //   chai.expect(res.body).to.deep.equal(expected);
  // });

  // it("should retrieve all pokemon with given attack", async () => {
  //   const attackToGet = "Bone Club";

  //   const expected = [{ id: "105", name: "Marowak" }];

  //   const res = await request.get(`/api/attacks/${attackToGet}/pokemon`);
  //   chai.expect(res.body).to.deep.equal(expected);
  // });

  // it("should add a fast attack", async () => {
  //   const res = await request.post("/api/attacks/fast").query({
  //     attackToAdd: {
  //       name: "Boomerang",
  //       type: "Fast",
  //       damage: 12
  //     }
  //   });

  //   const expected = [
  //     { name: "Tackle", type: "Normal", damage: 12 },
  //     { name: "Vine Whip", type: "Grass", damage: 7 },
  //     { name: "Razor Leaf", type: "Grass", damage: 15 },
  //     { name: "Ember", type: "Fire", damage: 10 },
  //     { name: "Scratch", type: "Normal", damage: 6 },
  //     { name: "Wing Attack", type: "Flying", damage: 9 },
  //     { name: "Bubble", type: "Water", damage: 25 },
  //     { name: "Bite", type: "Dark", damage: 6 },
  //     { name: "Water Gun", type: "Water", damage: 6 },
  //     { name: "Bug Bite", type: "Bug", damage: 5 },
  //     { name: "Confusion", type: "Psychic", damage: 15 },
  //     { name: "Poison Sting", type: "Poison", damage: 6 },
  //     { name: "Poison Jab", type: "Poison", damage: 12 },
  //     { name: "Quick Attack", type: "Normal", damage: 10 },
  //     { name: "Steel Wing", type: "Steel", damage: 15 },
  //     { name: "Peck", type: "Flying", damage: 10 },
  //     { name: "Acid", type: "Poison", damage: 10 },
  //     { name: "Thunder Shock", type: "Electric", damage: 5 },
  //     { name: "Spark", type: "Electric", damage: 7 },
  //     { name: "Mud Shot", type: "Ground", damage: 6 },
  //     { name: "Metal Claw", type: "Steel", damage: 8 },
  //     { name: "Fury Cutter", type: "Bug", damage: 3 },
  //     { name: "Pound", type: "Normal", damage: 7 },
  //     { name: "Zen Headbutt", type: "Psychic", damage: 12 },
  //     { name: "Feint Attack", type: "Dark", damage: 12 },
  //     { name: "Sucker Punch", type: "Dark", damage: 7 },
  //     { name: "Karate Chop", type: "Fighting", damage: 6 },
  //     { name: "Low Kick", type: "Fighting", damage: 5 },
  //     { name: "Fire Fang", type: "Fire", damage: 10 },
  //     {},
  //     { name: "Psycho Cut", type: "Psychic", damage: 7 },
  //     { name: "Bullet Punch", type: "Steel", damage: 10 },
  //     { name: "Rock Throw", type: "Rock", damage: 12 },
  //     { name: "Ice Shard", type: "Ice", damage: 15 },
  //     { name: "Frost Breath", type: "Ice", damage: 9 },
  //     { name: "Mud Slap", type: "Ground", damage: 15 },
  //     { name: "Lick", type: "Ghost", damage: 5 },
  //     { name: "Shadow Claw", type: "Ghost", damage: 11 },
  //     { name: "Rock Smash", type: "Fighting", damage: 15 },
  //     { name: "Dragon Breath", type: "Dragon", damage: 6 },
  //     { name: "Splash", type: "Water", damage: 0 },
  //     { name: "Boomerang", type: "Fast", damage: "12" }
  //   ];

  //   chai.expect(res.body).to.deep.equal(expected);
  // });

  // it("should add a special attack", async () => {
  //   const res = await request.post("/api/attacks/fast").query({
  //     attackToAdd: {
  //       name: "Crazy special attack",
  //       type: "Special",
  //       damage: 12
  //     }
  //   });

  //   const expected = [
  //     { name: "Tackle", type: "Normal", damage: 12 },
  //     { name: "Vine Whip", type: "Grass", damage: 7 },
  //     { name: "Razor Leaf", type: "Grass", damage: 15 },
  //     { name: "Ember", type: "Fire", damage: 10 },
  //     { name: "Scratch", type: "Normal", damage: 6 },
  //     { name: "Wing Attack", type: "Flying", damage: 9 },
  //     { name: "Bubble", type: "Water", damage: 25 },
  //     { name: "Bite", type: "Dark", damage: 6 },
  //     { name: "Water Gun", type: "Water", damage: 6 },
  //     { name: "Bug Bite", type: "Bug", damage: 5 },
  //     { name: "Confusion", type: "Psychic", damage: 15 },
  //     { name: "Poison Sting", type: "Poison", damage: 6 },
  //     { name: "Poison Jab", type: "Poison", damage: 12 },
  //     { name: "Quick Attack", type: "Normal", damage: 10 },
  //     { name: "Steel Wing", type: "Steel", damage: 15 },
  //     { name: "Peck", type: "Flying", damage: 10 },
  //     { name: "Acid", type: "Poison", damage: 10 },
  //     { name: "Thunder Shock", type: "Electric", damage: 5 },
  //     { name: "Spark", type: "Electric", damage: 7 },
  //     { name: "Mud Shot", type: "Ground", damage: 6 },
  //     { name: "Metal Claw", type: "Steel", damage: 8 },
  //     { name: "Fury Cutter", type: "Bug", damage: 3 },
  //     { name: "Pound", type: "Normal", damage: 7 },
  //     { name: "Zen Headbutt", type: "Psychic", damage: 12 },
  //     { name: "Feint Attack", type: "Dark", damage: 12 },
  //     { name: "Sucker Punch", type: "Dark", damage: 7 },
  //     { name: "Karate Chop", type: "Fighting", damage: 6 },
  //     { name: "Low Kick", type: "Fighting", damage: 5 },
  //     { name: "Fire Fang", type: "Fire", damage: 10 },
  //     {},
  //     { name: "Psycho Cut", type: "Psychic", damage: 7 },
  //     { name: "Bullet Punch", type: "Steel", damage: 10 },
  //     { name: "Rock Throw", type: "Rock", damage: 12 },
  //     { name: "Ice Shard", type: "Ice", damage: 15 },
  //     { name: "Frost Breath", type: "Ice", damage: 9 },
  //     { name: "Mud Slap", type: "Ground", damage: 15 },
  //     { name: "Lick", type: "Ghost", damage: 5 },
  //     { name: "Shadow Claw", type: "Ghost", damage: 11 },
  //     { name: "Rock Smash", type: "Fighting", damage: 15 },
  //     { name: "Dragon Breath", type: "Dragon", damage: 6 },
  //     { name: "Splash", type: "Water", damage: 0 },
  //     { name: "Boomerang", type: "Fast", damage: "12" },
  //     { name: "Crazy special attack", type: "Special", damage: "12" }
  //   ];

  //   chai.expect(res.body).to.deep.equal(expected);
  // });

  // it("should modify the attack with the given name", async () => {
  //   const res = await request
  //     .patch("/api/attack/Bite")
  //     .query({ type: "Light" });
  //   chai.expect(res.body.type).to.equal("Light");
  // });

  // it("should delete the attack with the given name", async () => {
  //   const expected = [
  //     { name: "Tackle", type: "Normal", damage: 12 },
  //     { name: "Vine Whip", type: "Grass", damage: 7 },
  //     { name: "Razor Leaf", type: "Grass", damage: 15 },
  //     { name: "Ember", type: "Fire", damage: 10 },
  //     { name: "Scratch", type: "Normal", damage: 6 },
  //     { name: "Wing Attack", type: "Flying", damage: 9 },
  //     { name: "Bubble", type: "Water", damage: 25 },
  //     { name: "Bite", type: "Light", damage: 6 },
  //     { name: "Water Gun", type: "Water", damage: 6 },
  //     { name: "Bug Bite", type: "Bug", damage: 5 },
  //     { name: "Confusion", type: "Psychic", damage: 15 },
  //     { name: "Poison Sting", type: "Poison", damage: 6 },
  //     { name: "Poison Jab", type: "Poison", damage: 12 },
  //     { name: "Quick Attack", type: "Normal", damage: 10 },
  //     { name: "Steel Wing", type: "Steel", damage: 15 },
  //     { name: "Peck", type: "Flying", damage: 10 },
  //     { name: "Acid", type: "Poison", damage: 10 },
  //     { name: "Thunder Shock", type: "Electric", damage: 5 },
  //     { name: "Spark", type: "Electric", damage: 7 },
  //     { name: "Mud Shot", type: "Ground", damage: 6 },
  //     { name: "Metal Claw", type: "Steel", damage: 8 },
  //     { name: "Fury Cutter", type: "Bug", damage: 3 },
  //     { name: "Pound", type: "Normal", damage: 7 },
  //     { name: "Zen Headbutt", type: "Psychic", damage: 12 },
  //     { name: "Feint Attack", type: "Dark", damage: 12 },
  //     { name: "Sucker Punch", type: "Dark", damage: 7 },
  //     { name: "Karate Chop", type: "Fighting", damage: 6 },
  //     { name: "Low Kick", type: "Fighting", damage: 5 },
  //     {},
  //     { name: "Psycho Cut", type: "Psychic", damage: 7 },
  //     { name: "Bullet Punch", type: "Steel", damage: 10 },
  //     { name: "Rock Throw", type: "Rock", damage: 12 },
  //     { name: "Ice Shard", type: "Ice", damage: 15 },
  //     { name: "Frost Breath", type: "Ice", damage: 9 },
  //     { name: "Mud Slap", type: "Ground", damage: 15 },
  //     { name: "Lick", type: "Ghost", damage: 5 },
  //     { name: "Shadow Claw", type: "Ghost", damage: 11 },
  //     { name: "Rock Smash", type: "Fighting", damage: 15 },
  //     { name: "Dragon Breath", type: "Dragon", damage: 6 },
  //     { name: "Splash", type: "Water", damage: 0 },
  //     { name: "Boomerang", type: "Fast", damage: "12" },
  //     { name: "Crazy special attack", type: "Special", damage: "12" }
  //   ];

  //   const res = await request.delete("/api/attack/Fire Fang");
  //   chai.expect(res.body).to.deep.equal(expected);
  // });
});
