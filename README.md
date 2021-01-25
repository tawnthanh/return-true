
# Return True

## Table of Contents

- [Introduction](#introduction)
- [Dependencies](#dependencies)
- [Features](#features)
	- [Register](#register)
	- [Login](#login)
	- [User Experience](#user-experience)
		- [Create Profile](#create-profile)
		- [Complete survey](#complete-survey)
		- [Messaging](#messaging)
		- [View](#view)
			- [View Personal Profile](#view-personal-profile)
			- [View Other Users Profiles](#view-other-users)
			- [View Inbox](#view-inbox)
	- [Search](#search)


## Introduction

Return True is a clone of [OkCupid](http://okcupid.com) that will allow all different types of developers to reach out to each other and connect! The application's main purpose is to help individuals find their coding pair/team based on what they need and if they match based on the results of their survey.

## Dependencies

- Heroku
- React / Redux
- Flask
- SQL Alchemy

## Features

 - ### Register
	 A page where the user will input their information to be registered into our database.

- ### Login
	A function integrated into our homepage that will allow the user to login before they can view any content on the site.

[insert picture of starting page]

- ### User Experience
	A registered user will be able to start their search to look for another developer. They can take a survey that will allow them to find all their matches, set up their own profile to let other users know what they're about, actually reach out to other developers, view other pages and search for someone based on their needs.

	- #### Create Profile
		The user will have their own "Profile" page that will allow them to indicate the following -
		1. What type of developer they are (front-end/back-end/full-stack)
		2. Indicate their location (optional)
		3. Types of languages they know
		4. Indicate the level of experience on the languages.
		5. Frequency of how much they're coding.
		6. Coding preference - in-person or online only
		7. Indicate their type of project preferences / personal interests
		8. What they're interested in on the site (code review, code along, study buddies, or debugging)
		9. Biography
		10. Post profile picture (Bonus)

	- #### Complete Survey
		The user will be able to complete a survey and based on the answers, it will provide back a percentage match with all other active users.

	- #### Messaging
		User will be able to reach out to other users.

	- #### View
		User will have viewing options to their own personal profile, other users and their inbox of messages.

		- ##### View Personal Profile
			User will have access to view their own profile and make any edits.

		- ##### View Other Users
			By a click of the other user's name/picture, the user will be able to view their full profile.

		- ##### View Inbox
			User will be able to click on their inbox and see all the messages they have between other users.

	- #### Search
		The user will have access to the search bar and filter down what they're looking for.


