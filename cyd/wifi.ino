bool connectToWifi()
{
  WiFi.begin(wifi_ssid, wifi_password);
  logWhite("connecting to: %s",wifi_ssid);
  while (WiFi.status() != WL_CONNECTED)
  {
    logWhite(".", "");
    delay(1000);
  }
  tft.print("\n");
  logGreen("connected with Ip: %s", String(WiFi.localIP()));
  return true;
}