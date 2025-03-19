#include <TFT_eSPI.h>
#include <WiFi.h>
#include "FS.h"
#include "SD.h"
#include "SPI.h"


TFT_eSPI tft = TFT_eSPI();

void setup() {
  screenSetup();
  tft.println("booting V0.0.2");
  connectToWifi();
}

void loop() {

}

void screenSetup() {
  tft.init();
  clearScreen();
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextFont(2);
}

void clearScreen() {
  tft.fillScreen(TFT_BLACK);
}


void connectToWifi() {
  char* ssid = "De Notenboom ";
  char* password = "X4k9*9wS!K2eEp2b";
  WiFi.begin(ssid, password);
   tft.println((String)"connecting to: " + ssid);
  while(WiFi.status() != WL_CONNECTED) {
     tft.print(".");
    delay(1000);
  }
  tft.print("\n");
  tft.setTextColor(TFT_GREEN, TFT_BLACK);
  tft.println((String)"connected with Ip: "+ WiFi.localIP());
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
}

void listDir(fs::FS &fs, const char* dirname, uint8_)