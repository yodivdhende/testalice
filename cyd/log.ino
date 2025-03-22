void logWhite(const char* log)
{
    Serial.println(log);
    tft.setTextColor(TFT_WHITE, TFT_BLACK);
    tft.println(log);
}
void logWhite(char* log, String param)
{
  char buffer[253];
  sprintf(buffer,log, param);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  Serial.println(buffer);
  tft.println(buffer);
}

void logGreen(const char* log)
{
  tft.setTextColor(TFT_GREEN, TFT_BLACK);
  Serial.println(log);
  tft.println(log);
}
void logGreen(char* log, String param)
{
  char buffer[253];
  sprintf(buffer,log, param);
  tft.setTextColor(TFT_GREEN, TFT_BLACK);
  Serial.println(buffer);
  tft.println(buffer);
}

void logRed(const char* log)
{
  tft.setTextColor(TFT_RED, TFT_BLACK);
  Serial.println(log);
  tft.println(log);
}
void logRed(char* log, String param)
{
  char buffer[253];
  sprintf(buffer,log, param);
  tft.setTextColor(TFT_RED, TFT_BLACK);
  Serial.println(buffer);
  tft.println(buffer);
}