CREATE SCHEMA kuningan_tour;
USE kuningan_tour;

CREATE TABLE user_roles (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT
);

CREATE TABLE user_genders (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT
);

CREATE TABLE users (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) UNIQUE NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number BIGINT UNIQUE,
  image_path TEXT,
  password VARCHAR(255) NOT NULL,
  gender_id INT,
  role_id INT NOT NULL DEFAULT 1,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_users_user_genders FOREIGN KEY (gender_id) REFERENCES user_genders(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_users_user_roles FOREIGN KEY (role_id) REFERENCES user_roles(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE posts (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  img_path TEXT NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  is_published BOOLEAN DEFAULT TRUE
);

CREATE TABLE facilities (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT
);

CREATE TABLE tours (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  categories TEXT,
  price BIGINT NOT NULL,
  address TEXT NOT NULL,
  address_link TEXT NOT NULL,
  description TEXT NOT NULL,
  ticket_operasional TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT
);

CREATE TABLE tour_images (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) UNIQUE,
  tour_id BIGINT NOT NULL,
  img_path TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
    CONSTRAINT fk_tour_has_images_tours FOREIGN KEY (tour_id) REFERENCES tours(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tour_has_facilities (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tour_id BIGINT NOT NULL,
  facility_id BIGINT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_tour_has_facilities_tours FOREIGN KEY (tour_id) REFERENCES tours(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_tour_has_facilities_facilities FOREIGN KEY (facility_id) REFERENCES facilities(id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE culinaries (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  categories TEXT,
  price BIGINT NOT NULL,
  address TEXT NOT NULL,
  address_link TEXT NOT NULL,
  description TEXT NOT NULL,
  ticket_operasional TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT
);

CREATE TABLE culinary_images (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) UNIQUE,
  culinary_id BIGINT NOT NULL,
  img_path TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_culinary_has_images_culinaries FOREIGN KEY (culinary_id) REFERENCES culinaries(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE culinary_has_facilities (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  culinary_id BIGINT NOT NULL,
  facility_id BIGINT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_culinary_has_facilities_culinaries FOREIGN KEY (culinary_id) REFERENCES culinaries(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_culinary_has_facilities_facilities FOREIGN KEY (facility_id) REFERENCES facilities(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tour_packets (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  price BIGINT NOT NULL,
  address TEXT  NOT NULL,
  address_link TEXT NOT NULL,
  description TEXT NOT NULL,
  tour_description TEXT NOT NULL,
  tour_link TEXT NOT NULL,
  culinary_description TEXT NOT NULL,
  culinary_link TEXT NOT NULL,
  lodging_description TEXT NOT NULL,
  lodging_link TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT
);

CREATE TABLE tour_packets_images (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) UNIQUE,
  tour_packet_id BIGINT NOT NULL,
  img_path TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
    CONSTRAINT fk_tour_packet_has_images_tours FOREIGN KEY (tour_packet_id) REFERENCES tour_packets(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tour_packets_tour_facilities (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tour_packet_id BIGINT NOT NULL,
  facility_id BIGINT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_tour_packets_tour_facilities_tour_packets FOREIGN KEY (tour_packet_id) REFERENCES tour_packets(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_tour_packets_tour_facilities_facilities FOREIGN KEY (facility_id) REFERENCES facilities(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tour_packets_culinary_facilities (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tour_packet_id BIGINT NOT NULL,
  facility_id BIGINT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_tour_packets_culinary_facilities_tour_packets FOREIGN KEY (tour_packet_id) REFERENCES tour_packets(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_tour_packets_culinary_facilities_facilities FOREIGN KEY (facility_id) REFERENCES facilities(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tour_packets_lodging_facilities (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tour_packet_id BIGINT NOT NULL,
  facility_id BIGINT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_tour_packets_lodging_facilities_tour_packets FOREIGN KEY (tour_packet_id) REFERENCES tour_packets(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_tour_packets_lodging_facilities_facilities FOREIGN KEY (facility_id) REFERENCES facilities(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE lodgings (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  categories TEXT,
  price BIGINT NOT NULL,
  address TEXT NOT NULL,
  address_link TEXT NOT NULL,
  description TEXT NOT NULL,
  ticket_operasional TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT
);

CREATE TABLE lodging_images (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) UNIQUE,
  lodging_id BIGINT NOT NULL,
  img_path TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_lodging_has_images_lodgings FOREIGN KEY (lodging_id) REFERENCES lodgings(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE lodging_has_facilities (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  lodging_id BIGINT NOT NULL,
  facility_id BIGINT NOT NULL,
  name VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_lodging_has_facilities_lodgings FOREIGN KEY (lodging_id) REFERENCES lodgings(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_lodging_has_facilities_facilities FOREIGN KEY (facility_id) REFERENCES facilities(id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE tour_has_reviews (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) UNIQUE NOT NULL,
  tour_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  rating INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_reviews_tours FOREIGN KEY (tour_id) REFERENCES tours(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_reviews_users_tours FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tour_packet_has_reviews (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) UNIQUE NOT NULL,
  tour_packet_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  rating INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_reviews_tour_packets FOREIGN KEY (tour_packet_id) REFERENCES tour_packets(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_reviews_users_tour_packets FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE culinary_has_reviews (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) UNIQUE NOT NULL,
  culinary_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  rating INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_reviews_culinaries FOREIGN KEY (culinary_id) REFERENCES culinaries(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_reviews_users_culinaries FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE lodging_has_reviews (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) UNIQUE NOT NULL,
  lodging_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  rating INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_reviews_lodgings FOREIGN KEY (lodging_id) REFERENCES lodgings(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_reviews_users_lodgings FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE banks (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) NOT NULL UNIQUE,
  cardholder_name VARCHAR(255) NOT NULL,
  account_number VARCHAR(255) NOT NULL,
  bank_name VARCHAR(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT
);


CREATE TABLE order_status (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  code_name VARCHAR(64)
);


CREATE TABLE orders (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) NOT NULL UNIQUE,
  tour_packet_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  bank_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number BIGINT NOT NULL,
  bank_name VARCHAR(255) NOT NULL,
  account_number VARCHAR(255) NOT NULL,
  cardholder_name VARCHAR(255) NOT NULL,
  price BIGINT NOT NULL,
  tax BIGINT NOT NULL,
  total BIGINT NOT NULL,
  img_path TEXT NOT NULL,
  order_status_id BIGINT NOT NULL,
  is_review BOOLEAN NOT NULL DEFAULT FALSE,
  is_done BOOLEAN DEFAULT FALSE,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT,
  CONSTRAINT fk_orders_tour_packets FOREIGN KEY (tour_packet_id) REFERENCES tour_packets(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_orders_banks FOREIGN KEY (bank_id) REFERENCES banks(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_orders_order_status FOREIGN KEY (order_status_id) REFERENCES order_status(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE feedbacks (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_uuid VARCHAR(36) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by BIGINT
);


INSERT INTO user_roles (name) VALUES ("CLIENT"), ("ADMIN");
INSERT INTO user_genders (name) VALUES ("PRIA"), ("WANITA");
INSERT INTO order_status (id_uuid, name) VALUES ("22350957-83cf-45e4-b89b-a8dd573b83f4","PROSES"),
												("4b9e51d5-2d58-4a6e-ae92-032f50746a14","SUKSES"), 
                                                ("648cbab6-4056-41d7-adf1-7c3397812298","BATAL");

INSERT INTO facilities (name, created_at, updated_at) VALUES ('Parkir', Now(), Now()),
('Toilet', Now(), Now()),
('Masjid', Now(), Now()),
('Gedung Serbaguna', Now(), Now()),
('Kolam Renang', Now(), Now()),
('Warung', Now(), Now()),
('Bumi Perkemahan', Now(), Now()),
('Flying Forks', Now(), Now()),
('Area bermain anak', Now(), Now()),
('Panggung hiburan', Now(), Now()),
('Gazebo', Now(), Now()),
('Sarana olahraga', Now(), Now()),
('Mobil Domba', Now(), Now()),
('Kereta Mini', Now(), Now()),
('ATV', Now(), Now()),
('Mushola', Now(), Now()),
('Kebun binatang mini', Now(), Now()),
('Pesawat terbang', Now(), Now()),
('Spot Foto Instagramable', Now(), Now()),
('Puncak Waja Kopi', Now(), Now()),
('Penyewaan ban pelampung', Now(), Now()),
('Foto dalam air', Now(), Now()),
('Panahan', Now(), Now()),
('Kolam Ikan', Now(), Now()),
('Tempat lesehan', Now(), Now()),
('Tempat istirahat', Now(), Now()),
('Berkuda Wahana outbound', Now(), Now()),
('Restoran', Now(), Now()),
('AC', Now(), Now()),
('Wifi ', Now(), Now()),
('Resepsionis 24 jam', Now(), Now()),
('Ruang bebas rokok', Now(), Now()),
('Penyimpanan  barang', Now(), Now()),
('Coffee shop ', Now(), Now()),
('Laundry', Now(), Now()),
('Taman Bermain', Now(), Now()),
('Lintasan Jogging', Now(), Now()),
('Ruang Rapat', Now(), Now()),
('GYM', Now(), Now()),
('TV', Now(), Now()),
('Meja', Now(), Now()),
('Dapur kecil', Now(), Now()),
('Lemari es', Now(), Now()),
('Pancuran', Now(), Now()),
('SPA', Now(), Now()),
('Sewa mobil', Now(), Now()),
('Kamar mandi pribadi', Now(), Now()),
('Memiliki dapur di setiap kamar', Now(), Now());

SELECT * FROM USERS;
-- ADMIN DAN CUSTOMER PASSWORD: AMDIN-123
INSERT INTO users (id_uuid, fullname, email, phone_number, password, gender_id, role_id)
VALUES ('96bf3333-b949-47f2-997c-38c88694439d', 'ADMIN', 'admin@outlook.com', 872727272727, 
'$2b$10$eF1IJukofnxym.OUshlEhuZKOVZC/BRJ9Go2SEW5tZ./U5oeqSL.i',1, 2),
('2e1d8176-1548-4d2e-9c11-fe6fd69b9c84', 'CUSTOMER', 'cust@outlook.com', 88827272727723, 
'$2b$10$eF1IJukofnxym.OUshlEhuZKOVZC/BRJ9Go2SEW5tZ./U5oeqSL.i',1, 1)