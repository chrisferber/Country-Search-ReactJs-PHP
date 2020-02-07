# Goal
- Search for countries by country name or code and view them as a list of elements on an HTML page using the Rest Countries API.

# Credits
- Thanks to Stephen Burgess for his PHP back-end, which is modified and extended here.

# Prerequisites
- Before you get started, make sure you have the following software installed on your computer:

    - NPM

    - PHP

## To run
- Fork and clone the project:
    - git clone https://github.com/chrisferber/Country-Search-ReactJs-PHP

- Then install the dependencies:
    - npm install

- Edit the php.ini in your root directory and make set the error_log path to where you want your PHP error log created.

- Start the PHP server in your project root directory and specify location of the php.ini file:
    - php -c ./php.ini -S localhost:5000
        - eg. php -c /Users/Chris/dev-projects/country-search/php.ini -S localhost:5000

- Start the front end.
    - npm run client

- Navigate to:
    - [http://localhost:3000](http://localhost:3000)