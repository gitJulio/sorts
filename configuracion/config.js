process.env.PORT = process.env.PORT || 7000;

// process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

const config = {
  db: {
    host: '194.135.85.154',
    port: "5432",
    database: 'postgres',
    user: 'jbueso',
    password: 'Axalon2019..'
  }
};

module.exports = config;