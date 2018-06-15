# Usage

-	Install npm packages
```
npm install
```

-	Make sure MongoDB is up and listening @ port 27017 (defult port)

-	Run crawler by
```
npm run crawler
```
-	Run server @port 3000 by
```
npm run server
```

- Host web application by 
```
npm start
```

- Access web application in http://localhost:8000

# Flaw
Two React components implemented but react-router does not work therefore only one components can be view.

The default page is the searching page. In each row of course, there is an edit button that does not work. That button is supposed to take you to the edit page of the course.

TO CHECKOUT THE EDIT PAGE

- please uncomment line 20 in src/index.js

- and comment line 21 in src/index.js

- and refresh browser.

and refresh the page again to check the edit page, save button and delete are functional but the back button is not.

after deleted, you are supposed to be taken to the search page, but due to the disfunction router, it fails to do that.

# Delete behaviour 

After deletion, the course will be disabled in the search page (becomes grey) and still leave record in database.











# react-interview-question

The main purpose of this excerise to test your programming skill and understanding on (1) Restful APIs, (2) HTML+CSS, (3) ReactJS or relevant frontend frameworks such as VueJS.

This exercise consists of two sections:

### 1. Web Crawler

- Target Site: https://loris.wlu.ca/ssb_prod/bwckschd.p_disp_dyn_sched [Laurier Course Search Page]

- Pick 1 term from Winter 2018, Spring 2018, Fall 2018, Winter 2019 or Spring 2019

- To build a scraper to scrape **all the courses** available on **the selected term** using your favourite language; **Python [Scrapy]** and **NodeJS [Cheerio]** are highly recommended; But you can pick your favourite language to complete this task;

- Store all your scraped data into a database; You can use any kinds of database; MongoDB is recommended; If you choose to use SQL or similar relational databases, please remember to include your migration files.

### 2. Single Page Application for CRUD operation on Scraped Data

- Use ReactJS or relevant frontend framework to build a single page application that allow us to **search**, **edit**, and **delete** scraped data; 

- User will be able to **search** courses based on Course Number, Course Name, Keywords inside Course Description;

- User will be able to **edit** Course Description

- User will be able to **add** custom tags for one course

- User will be able to **soft delete** scraped data; **Soft Delete** refers to hide the data from the User but the data still exists in the database; 

- In this task, you might need to develop at least 3 types of Restful APIs [GET for Search, Put for Update and Delete]; You could use any backend languages for this task;

** Put all your code inside a folder [using your fullname]; Once completed, create a pull request to this repo;

** Estimate time of the whole question should be ~ 1 day; You can upload your answer no later than Friday [June 15th 11:59pm];

** Email it@savvypro.ca if you have any questions;
