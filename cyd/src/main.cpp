#include <Arduino.h>
#include <globals.h>
#include <log.h>
#include <TFT_eSPI.h>
#include <ArduinoJson.h>
#include <sd-reader.h>
#include <connection.h>
// #include <character.h>
// #include <ui-implementation.h>
#include <uart-interface.h>
#include <web-socket.h>

void setup () {
  screenSetup();
  logWhite("booting V0.0.3");
  if(setupSD() == false) {
    return;
  };
  if(connectToWifi() == false){
    return;
  };
  webSocketSetup();
  // if(fetchCharacter() == false){
  //   return;
  // };
  // clearScreen();
  // uiSetup(); 

}


void loop (){
  // uiLoop(); 
  uartSerialLoop();
  webSocketLoop();
}






