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
			genre: "Comedy/Romance",
		};
		const res = await request.post("/api/movies").send(movieToAdd);
		chai.expect(res.body).to.deep.equal(movieToAdd);
	});
});
