#include <Arduino.h>
#include <character.h>
#include <WiFi.h>
#include <globals.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <log.h>


Character currentCharacter;

bool fetchCharacter()
{
  if(WiFi.status() == WL_CONNECTED) {
    String characterUrl = server_url + "characters?id=" + String(character_id);
    logWhite("fetching: ");
    logWhite(characterUrl.c_str());

    String characterResponse = httpGETRequest(characterUrl.c_str());
    logWhite(characterResponse.c_str());

    if(characterResponse == "") {
      logRed("Empty response");
      return false;
    }

    JsonDocument characterObj;
    DeserializationError error = deserializeJson(characterObj, characterResponse);

    if(error) {
      logRed("JSON error:");
      logRed(error.c_str());  
      return false;
    }

    String name = characterObj["name"];
    currentCharacter.id = characterObj["id"];
    currentCharacter.name = name;
    currentCharacter.currentHp = characterObj["currentHp"];
    currentCharacter.maxHp = characterObj["maxHp"];

    logGreen(name.c_str());
    if(name == NULL){
      return false;
    }
    return true;
  }
  return false;
}

const char* httpGETRequest(const char* serverName) {
  WiFiClient client;
  HTTPClient http;
    
  // Your Domain name with URL path or IP address with path
  http.begin(client, serverName);
  
  // If you need Node-RED/server authentication, insert user and password below
  //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
  
  // Send HTTP POST request
  int httpResponseCode = http.GET();
  
  String payload = "{}"; 
  
  if (httpResponseCode>0) {
    logWhite("HTTP Response code: %s", String(httpResponseCode).c_str());
    payload = http.getString();
  }
  else {
    logRed("Error code: ");
    logRed(String(httpResponseCode).c_str());
  }
  // Free resources
  http.end();

  return payload.c_str();
}