#include <TFT_eSPI.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <FS.h>
#include <SD.h>
#include <SPI.h>

TFT_eSPI tft = TFT_eSPI();
String wifi_ssid;
String wifi_password;

void setup()
{
  screenSetup();
  logWhite("booting V0.0.2", "");
  if(setupSD() == false) {
    return;
  };
  connectToWifi();
}

void loop()
{
}

void screenSetup()
{
  tft.init();
  clearScreen();
  tft.setTextFont(2);
}

void clearScreen()
{
  tft.fillScreen(TFT_BLACK);
}




