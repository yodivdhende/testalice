#include <Arduino.h>
#include <WebSocketsClient.h>
#include <log.h>
#include <ArduinoJson.h>
#include <globals.h>

WebSocketsClient webSocket;

void sendStatus() {
    JsonDocument status;
    JsonObject statusData;
    statusData["sessionToken"] = sessionToken;
    statusData["connectionType"] = "CYD";
    status["status"]=statusData;
    String statusJsonString = "";
    serializeJson(status, statusJsonString);
    webSocket.sendTXT(statusJsonString);
}

void handleMessage(String message){
    JsonDocument messageObj;
    DeserializationError error = deserializeJson(messageObj, message);

    if(error){
        logRed(error.c_str());
        return;
    }

    if(messageObj.containsKey("goTo")){
        String screen = messageObj["goTo"];
        if(screen == "loading"){
            //TODO navigate to loading screen;
            return;
        }
        if(screen == "loot"){
            //TODO navigate to loot screen;
            return;
        }
    }
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length)
{
    switch(type){
        case WStype_DISCONNECTED:
            logRed("Disconnected");
            break;
        case WStype_CONNECTED:
            logGreen("Connected");
            sendStatus();
            break;
        case WStype_TEXT:
            logWhite("message:", (char *)payload);
            break;
    }

}

void webSocketSetup()
{
    webSocket.begin(domain,webSocketPort,"/connections");
    webSocket.onEvent(webSocketEvent);
    webSocket.setReconnectInterval(5000);
}

void webSocketLoop()
{
    webSocket.loop();

}