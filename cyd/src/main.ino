#include <TFT_eSPI.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <FS.h>
#include <SD.h>
#include <SPI.h>
#include <HTTPClient.h>
#include <lvgl.h>
#include <lv_gif.h>



TFT_eSPI tft = TFT_eSPI();
String wifi_ssid;
String wifi_password;
String server_url;
int character_id;
String boot_gif_path;

void setup()
{
  screenSetup();
  logWhite("booting V0.0.3", "");
  if(setupSD() == false) {
    return;
  };
  if(connectToWifi() ==false){
    return;
  };
  fetchCharacter();
  lv_init();

  createGifFromFile("/assets/images/boot_logo.gif");
}

void loop(){
  lv_timer_handler();
  delay(5);
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




