-- public.account definition

-- Drop table

-- DROP TABLE public.account;

CREATE TABLE public.account (
	id bigserial NOT NULL,
	address varchar(255) NULL,
	email varchar(255) NULL,
	name varchar(255) NULL,
	"password" varchar(72) NULL,
	phone varchar(15) NULL,
	CONSTRAINT account_pkey PRIMARY KEY (id)
);


-- public.genre definition

-- Drop table

-- DROP TABLE public.genre;

CREATE TABLE public.genre (
	id bigserial NOT NULL,
	name varchar(20) NULL,
	CONSTRAINT genre_pkey PRIMARY KEY (id)
);


-- public.image definition

-- Drop table

-- DROP TABLE public.image;

CREATE TABLE public.image (
	id bigserial NOT NULL,
	"path" varchar(255) NULL,
	name varchar(255) NULL,
	"type" varchar(255) NULL,
	CONSTRAINT image_pkey PRIMARY KEY (id)
);


-- public."role" definition

-- Drop table

-- DROP TABLE public."role";

CREATE TABLE public."role" (
	id bigserial NOT NULL,
	name varchar(20) NULL,
	CONSTRAINT role_pkey PRIMARY KEY (id)
);


-- public.account_order definition

-- Drop table

-- DROP TABLE public.account_order;

CREATE TABLE public.account_order (
	id bigserial NOT NULL,
	address varchar(255) NULL,
	date_created timestamp NULL,
	email varchar(255) NULL,
	name varchar(255) NULL,
	order_status public.order_status NULL,
	phone varchar(255) NULL,
	total_price numeric(19, 2) NULL,
	account_id int8 NULL,
	CONSTRAINT account_order_pkey PRIMARY KEY (id),
	CONSTRAINT fkrwakkftq9hw5bgj495jja09a6 FOREIGN KEY (account_id) REFERENCES public.account(id)
);


-- public.account_roles definition

-- Drop table

-- DROP TABLE public.account_roles;

CREATE TABLE public.account_roles (
	account_id int8 NOT NULL,
	role_id int8 NOT NULL,
	CONSTRAINT account_roles_pkey PRIMARY KEY (account_id, role_id),
	CONSTRAINT fki84870gssnbi37wfqfifekghb FOREIGN KEY (role_id) REFERENCES public."role"(id),
	CONSTRAINT fktp61eta5i06bug3w1qr6286uf FOREIGN KEY (account_id) REFERENCES public.account(id)
);


-- public.author definition

-- Drop table

-- DROP TABLE public.author;

CREATE TABLE public.author (
	id bigserial NOT NULL,
	dob timestamp NULL,
	hometown varchar(255) NULL,
	name varchar(255) NULL,
	image_id int8 NULL,
	CONSTRAINT author_pkey PRIMARY KEY (id),
	CONSTRAINT fklgw2jmewdn0g1ago2o7axfvey FOREIGN KEY (image_id) REFERENCES public.image(id)
);


-- public.book definition

-- Drop table

-- DROP TABLE public.book;

CREATE TABLE public.book (
	id bigserial NOT NULL,
	amount_purchased int8 NULL,
	available bool NULL,
	description varchar(2000) NULL,
	title varchar(255) NULL,
	unit_price numeric(19, 2) NULL,
	author_id int8 NULL,
	image_id int8 NULL,
	CONSTRAINT book_pkey PRIMARY KEY (id),
	CONSTRAINT fkklnrv3weler2ftkweewlky958 FOREIGN KEY (author_id) REFERENCES public.author(id),
	CONSTRAINT fksb67nrrvdpm7qkhtmekewbwco FOREIGN KEY (image_id) REFERENCES public.image(id)
);


-- public.book_genres definition

-- Drop table

-- DROP TABLE public.book_genres;

CREATE TABLE public.book_genres (
	book_id int8 NOT NULL,
	genre_id int8 NOT NULL,
	CONSTRAINT book_genres_pkey PRIMARY KEY (book_id, genre_id),
	CONSTRAINT fk6soimqwnss59p5wt6m3afnuoo FOREIGN KEY (book_id) REFERENCES public.book(id),
	CONSTRAINT fk9h3nddtxgapfvc95fjt1x146m FOREIGN KEY (genre_id) REFERENCES public.genre(id)
);


-- public.book_order definition

-- Drop table

-- DROP TABLE public.book_order;

CREATE TABLE public.book_order (
	id bigserial NOT NULL,
	author_name varchar(255) NULL,
	book_id int8 NULL,
	image_url varchar(255) NULL,
	quantity int2 NULL,
	title varchar(255) NULL,
	unit_price numeric(19, 2) NULL,
	account_order_id int8 NULL,
	CONSTRAINT book_order_pkey PRIMARY KEY (id),
	CONSTRAINT fkbrfl2p8631ww08qj2wjfdie8x FOREIGN KEY (account_order_id) REFERENCES public.account_order(id)
);


-- public.cart_item definition

-- Drop table

-- DROP TABLE public.cart_item;

CREATE TABLE public.cart_item (
	id bigserial NOT NULL,
	author_name varchar(255) NULL,
	book_id int8 NULL,
	image_url varchar(255) NULL,
	quantity int4 NULL,
	title varchar(255) NULL,
	unit_price numeric(19, 2) NULL,
	account_id int8 NULL,
	CONSTRAINT cart_item_pkey PRIMARY KEY (id),
	CONSTRAINT fk6pjhqss0t5b77cr7dgqycb21v FOREIGN KEY (account_id) REFERENCES public.account(id)
);


-- public.review definition

-- Drop table

-- DROP TABLE public.review;

CREATE TABLE public.review (
	id bigserial NOT NULL,
	"content" varchar(2000) NULL,
	date_created timestamp NULL,
	account_id int8 NULL,
	book_id int8 NULL,
	CONSTRAINT review_pkey PRIMARY KEY (id),
	CONSTRAINT fk70yrt09r4r54tcgkrwbeqenbs FOREIGN KEY (book_id) REFERENCES public.book(id),
	CONSTRAINT fkbopwpfvcg5qsfrjtt9svofxg1 FOREIGN KEY (account_id) REFERENCES public.account(id)
);