#include <Arduino.h>
#include <log.h>

unsigned long lastTimeStamp = millis();
String receivedMessage = "";

void uartSetup()
{
    Serial.begin(9600);
}

boolean shouldCheckSerial()
{
    long currentTimeStamp = millis();
    if (currentTimeStamp - lastTimeStamp > 500)
    {
        lastTimeStamp = currentTimeStamp;
        return true;
    }
    return false;
}

void uartSerialLoop()
{
    if (shouldCheckSerial() || receivedMessage != "")
    {
        if (Serial.available())
        {
            char incommingChar = Serial.read();
            if (incommingChar == '\n')
            {
                logGreen(receivedMessage.c_str());
                receivedMessage = "";
            }
            else
            {
                receivedMessage += incommingChar;
            }
        }
    }
}
