'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');
const firebase = require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyAkrZQttxQYkfPC9VKw1dntrxyMrSSlP3g",
    authDomain: "pigarden-ab438.firebaseapp.com",
    databaseURL: "https://pigarden-ab438.firebaseio.com",
    projectId: "pigarden-ab438",
});

// Get a database reference to our posts
let db = firebase.database();
let sensorID = "sen01";
// let userSensorRef = db.ref("users/" + UID + "/devices");
let ref = db.ref("sensors/" + sensorID + "/live");

const config = {
    logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({

    'LAUNCH': function() {
        this.toIntent('HelloGardenIntent');
    },

    'HelloGardenIntent': function() {
        this.ask('Hi I\'m your personal gardener, what can I help you with?');
    },

    'MyFarmerNameIsIntent': function(name) {
        this.tell('Hey ' + name.value + ', nice to meet you!');
    },

    'EndSessionIntent': function() {
        this.tell('I\'ll be gardening, come back to see how it\'s going!');
    },

    'SoilMoistureIntent': function() {
        this.ask("Plant Soil Moisture endpoint working. any other tests?");
    },

    'RoomHumidityIntent': function() {
        this.ask("Room humidity endpoint working. any other tests?");
    },

    'RoomStatusIntent': function() {
        this.ask("Room status endpoint working. any other tests?");
    },

    'RoomTemperatureIntent': function() {
      ref.on("value", (snapshot) => {
          let roomTempValue =  snapshot.child("temperature").val();
          if (roomTempValue !== null) {
            roomTempValue = roomTempValue.toFixed(1);
          }
          let speechResponse = "The temperature of the room your plant is in is " + roomTempValue + ' degrees Fahrenheit.';
          switch(true){
              case roomTempValue >= 90:
                  speechResponse += "I hope it isn't melting!"
                  break;
              case roomTempValue <= 78:
                  speechResponse += "Time to sunbathe!"
                  break;
              case roomTempValue >= 68:
                  speechResponse += "A nice fall day."
                  break;
              case roomTempValue >= 50:
                  speechResponse += "I hope its wearing a sweatshirt!"
                  break;
              case roomTempValue >= 32:
                  speechResponse += "Brrrrr."
                  break;
          }
          speechResponse +=  "Is there anything else I can help you with?";
          this.ask(speechResponse);
        });
    },

    'WaterPlantIntent': function() {
        this.ask("Water plant endpoint working. any other tests?");
    },

});

module.exports.app = app;
