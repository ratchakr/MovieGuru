/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask MovieGuru for a movie trivia"
 *  Alexa: "Here's your movie fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.5ea10034-1fc4-46e8-8c01-48b2bd7e99cf";

/**
 * Array containing movie trivia facts.
 */
var FACTS = [
	"The charcoal drawing of Kate Winslet in James Cameron’s, Titanic was actually drawn by James Cameron himself.",
	"Lord of the Rings: Return of the King (2003 movie)  won all 11 Academy Awards it was nominated for.",
	"The movie “Gravity” had a $100,000,000 budget and was more expensive than the Indian Mars Mission.",
	"In the movie Django Unchained, there’s a scene where Leo DiCaprio smashes a glass in a fit of rage, causing his hand to bleed. This was an accident, but Tarantino kept it in the movie.",
	"Jack Nicholson pulled a real gun on Leo DiCaprio in The Departed, even though it wasn’t in the script. He thought the scene wasn’t intense enough initially.",
	"In the movie intersteller, Cooper tells Murph her name means, “Whatever can happen, will happen.” Murphy’s law actually states, Whatever can go wrong, will go wrong.",
	"The first letters of the names of the main characters in the movie Inception - Dom, Robert, Eames, Arthur, Mal and Saito spell DREAMS.",
	"Jim Caviezel was struck by lightning during the Sermon on the Mount scene from the movie The Passion of the Christ.",
	"Ryan Gosling was cast as Noah in The Notebook because the director wanted someone not handsome.",
	"The rain in the background of the “bug” scene in the Matrix series was designed to look like the famous “Matrix Code”. The free-flowing code represents the happenings within the virtual world of the Matrix and has become synonymous with the film",
	"Several major scenes in the movie Braveheart had to be reshot because extras were wearing wristwatches and sunglasses.",
	"The famous shot featured in the Bond films’ introduction was actually filmed through the barrel of a gun.",
	"The 1976 classic Rocky starring sylvester stallone was shot in just 28 days.",
	"Paul Schrader wrote Taxi Driver in five days. It is rumoured he had a loaded gun by his desk for “inspiration and motivation”.",
	"The real Frank Abagnale Jr. appears in the movie Catch Me If You Can as the French policeman who arrests Leo Decaprio.",
	"After Top Gun was shown in cinemas, recruitment into the Navy by young men went up by 500 percent.",
	"Martin Scorsese’s Hugo was the director’s first film in twelve years not to feature Leonardo DiCaprio.",
	"In total, Daniel Radcliffe went through 160 pairs of prop glasses by the end of the Harry Potter series.",
	"In the movie National Treasure, the good guys in the movie use Google and the bad guys use Yahoo."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * MovieGuru is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
	var speechText = "Welcome to the MovieGuru Skill. This skill gives you a movie trivia everytime you invoke it. You can say give me a movie trivia ... Now, what can I help you with.";
	var repromptText = "You can say things like, give me a movie fact, or you can say exit... Now, what can I help you with?"	
	response.ask(speechText, repromptText);
    //handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewMovieFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a movie trivia, or, you can say stop... What can I help you with?", "What can I help you with?");
		
		var speechText = "Welcome to the MovieGuru Skill. This skill gives you a movie trivia everytime you invoke it. You can say give me a movie trivia ... Now, what can I help you with?"; 

       var repromptText = "You can say things like, give me a movie fact, or you can say exit... Now, what can I help you with?"	
	   response.ask(speechText, repromptText);	
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Thanks for using MovieGuru. It was great to talk to you. Until next time";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Thanks for using MovieGuru. It was great to talk to you. Until next time";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your movie fact: " + randomFact;
    var cardTitle = "Your Movie Trivia";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

