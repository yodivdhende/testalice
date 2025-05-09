#include <Arduino.h>
#include <TFT_eSPI.h>
#include <ArduinoJson.h>
#include <log.h>
#include <globals.h>
#include <connection.h>
#include <sd-reader.h>
#include <character.h>
#include <ui-implementation.h>

void setup () {
  screenSetup();
  logWhite("booting V0.0.3");
  if(setupSD() == false) {
    return;
  };
  if(connectToWifi() == false){
    return;
  };
  if(fetchCharacter() == false){
    return;
  };
  clearScreen();
  uiSetup(); 

}


void loop (){
  uiLoop();
}






