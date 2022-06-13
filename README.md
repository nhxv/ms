# Manga Store & Manga Dashboard
A manga e-commerce frontend for customers to buy manga, and a manga dashboard frontend for store owner to manage their store. They share the same backend api.

Demo: soon™

### Built with
HTML, CSS, SCSS, PrimeReact, Bootstrap, Javascript, Chart.js, React, Formik, Redux, Java, Spring Boot, Spring Data JPA, Spring Security, Hibernate, iText, PostgreSQL

### How to run locally

    - install npm, Java 8, PostgreSQL
    - create sql user and schema according to the infomation provided in bookstore-backend/src/main/resources/application.properties
    - run enum.sql to create enum type order_status
    - run tables.sql to generate sql tables
    - run sample-data.sql to add manga and artist data
    - open bookstore-backend folder and start Spring Boot server (default port: localhost:8080)
    - open bookstore-frontend folder and start React server (default port: localhost:3000)
    - open bookstore-dashboard folder and start React server (default port: localhost:3600)

### Licenses
All images and informations are taken from myanimelist.net, viz.com, and kodansha.us 