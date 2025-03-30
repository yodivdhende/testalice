#include <TFT_eSPI.h>
#include <Arduino.h>

const uint16_t screenWidth  = 320;
const uint16_t screenHeight = 240;
TFT_eSPI tft = TFT_eSPI( screenWidth, screenHeight ); /* TFT instance */
String wifi_ssid;
String wifi_password;
String server_url;
int character_id;
String boot_gif_path;

void clearScreen()
{
  tft.fillScreen(TFT_BLACK);
}

void screenSetup()
{
  tft.init();
  clearScreen();
  tft.setTextFont(2);
}