module.exports = {
	development: {
		client: "postgresql",
		connection: {
			database: "my_media",
			user: "gabrielgoodman",
			password: "postgres",
		},
		// connection: {
		//   host: 'localhost',
		//   port: 3000,
		//   database: 'media_library',
		//   user: 'GabrielGoodman',
		//   password: 'postgres'
		//   // database: 'process.env.DB_NAME',
		//   // user: process.env.DB_USER,
		//   // password: process.env.DB_PASSWORD,
		// },
		seeds: {
			directory: "./knex/seeds",
		},
		migrations: {
			directory: "./knex/migrations",
		},
	},
};
