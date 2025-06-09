#include <Arduino.h>
#include <log.h>
#include <globals.h>
#include <web-socket.h>

unsigned long lastTimeStamp = millis();
String receivedMessage = "";

boolean shouldCheckSerial()
{
    long currentTimeStamp = millis();
    if (currentTimeStamp - lastTimeStamp > 1000)
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
                sendLink(receivedMessage);
                receivedMessage = "";
            }
            else
            {
                receivedMessage += incommingChar;
            }
        }
    }
}
