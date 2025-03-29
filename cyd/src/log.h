#ifndef LOG_FUNC 
#define LOG_FUNC 

    #include <Arduino.h>

    void logWhite(const char* log);
    void logWhite(char* log, const char* param);
    void logGreen(const char* log);
    void logGreen(char* log, const char* param);
    void logRed(const char* log);
    void logRed(char* log, const char* param);
#endif