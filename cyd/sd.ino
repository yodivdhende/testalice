void setupSD() {
  Serial.begin(115200);

  SPIClass spi = SPIClass(VSPI);

  if (!SD.begin(SS, spi, 80000000)) {
    logRed("Card Mount Failed");
    return;
  }
  uint8_t cardType = SD.cardType();

  if (cardType == CARD_NONE) {
    logRed("No SD card attached");
    return;
  }

  Serial.print("SD Card Type: ");
  if (cardType == CARD_MMC) {
    logWhite("MMC");
  } else if (cardType == CARD_SD) {
    logWhite("SDSC");
  } else if (cardType == CARD_SDHC) {
    logWhite("SDHC");
  } else {
    logWhite("UNKNOWN");
  }

  uint64_t cardSize = SD.cardSize() / (1024 * 1024);
  logGreen("SD Card Size: %lluMB\n", String(cardSize));

  readFile(SD, "/config.json");
}

bool readConfig(fs::FS &fs) {
  char *path = "/config.json";
  logWhite("Reading file: %s",path);

  File file = fs.open(path);
  if (!file)
  {
    logRed("Failed to open file for reading");
    return false;
  }

  String jsonString;
  while(file.available()) {
    jsonString += (char)file.read();
  }
  file.close();

  logGreen(jsonString.c_str());

  return false;

  // StaticJsonDocument<255> doc;
  // DeserializationError error = deserializeJson(doc, jsonString.c_str());

  // if (error) {
  //     logRed("JSON parsing failed: ", error.f_str());
  //     return false;
  //   }

  // wifi_ssid = String(doc["wifi"]["ssid"].as<const char*>());
  // wifi_password = String(doc["wifi"]["password"].as<const char*>());

  // logGreen("Config set");

  // return true;
}

void readFile(fs::FS &fs, const char * path) {
  logWhite("Reading file: %s\n", path);

  File file = fs.open(path);
  if (!file) {
    logRed("Failed to open file for reading");
    return;
  }

  logWhite("Read from file: ");
  while (file.available()) {
    Serial.write(file.read());
  }
  file.close();
}