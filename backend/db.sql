CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  type VARCHAR(10) DEFAULT 'film',
  trailer_url VARCHAR(255),
  added_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_movies (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  movie_id INT REFERENCES movies(id),
  status VARCHAR(20) DEFAULT 'chce_obejrzec',
  rating INT CHECK (rating >= 1 AND rating <= 10),
  added_at TIMESTAMP DEFAULT NOW()
);