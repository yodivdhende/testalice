#ifndef GLOBALS
#define GLOBALS

#include <TFT_eSPI.h>
#include <Arduino.h>

extern const uint16_t screenWidth;
extern const uint16_t screenHeight;
extern TFT_eSPI tft;
extern String wifi_ssid;
extern String wifi_password;
extern String server_url;
extern int character_id;
extern XPT2046_Touchscreen ts;
void clearScreen();
void screenSetup();

#endif