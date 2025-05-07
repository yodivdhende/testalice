#ifndef GLOBALS
#define GLOBALS

    #include <TFT_eSPI.h>
    #include <Arduino.h>

    extern TFT_eSPI tft;
    extern String wifi_ssid;
    extern String wifi_password;
    extern String server_url;
    extern int character_id;
    void clearScreen();
    void screenSetup();

#endif