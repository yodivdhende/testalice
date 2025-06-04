#include <Arduino.h>
#include <globals.h>
#include <log.h>
// #include <TFT_eSPI.h>
// #include <ArduinoJson.h>
// #include <connection.h>
// #include <sd-reader.h>
// #include <character.h>
// #include <ui-implementation.h>
#include <uart-interface.h>

void setup () {
  screenSetup();
  logWhite("booting V0.0.3");
  uartSetup();

  // if(setupSD() == false) {
  //   return;
  // };
  // if(connectToWifi() == false){
  //   return;
  // };
  // if(fetchCharacter() == false){
  //   return;
  // };
  // clearScreen();
  // uiSetup(); 

}


void loop (){
  // uiLoop(); 
  uartSerialLoop();
}






