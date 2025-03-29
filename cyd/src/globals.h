#ifndef GLOBALS
#define GLOBALS

    #include <TFT_eSPI.h>
    #include <Arduino.h>

    TFT_eSPI tft;
    String wifi_ssid;
    String wifi_password;
    String server_url;
    int character_id;
    void clearScreen();
    void screenSetup();

#endif