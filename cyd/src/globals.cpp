#include <TFT_eSPI.h>
#include <Arduino.h>

TFT_eSPI tft = TFT_eSPI();
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