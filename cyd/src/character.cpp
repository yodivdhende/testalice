#include <character.h>
#include <WiFi.h>
#include <globals.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <log.h>
// unsigned long lastTime = 0;
// unsigned long timerDelay = 5000;

bool fetchCharacter() {
  if(WiFi.status() == WL_CONNECTED) {
    String characterUrl = server_url + "/characters?id=" + String(character_id);
    logWhite("fetching: ");
    logWhite(characterUrl.c_str());

    String characterResponse = httpGETRequest(characterUrl.c_str());
    Serial.println(characterResponse);

    JsonDocument characterObj;
    DeserializationError error = deserializeJson(characterObj, characterResponse);

    if(error) {
      logRed(error.c_str());  
      return false;
    }

    String name = characterObj["name"];
    logGreen(name.c_str());
  }
}

String httpGETRequest(const char* serverName) {
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

  return payload;
}