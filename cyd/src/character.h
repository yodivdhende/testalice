#ifndef CHARACTER_FUNC
#define CHARACTER_FUNC
    #include <Arduino.h>
    bool fetchCharacter();
    const char* httpGETRequest(const char *serverName);
    class Character {
    public:
        int id;
        String name;
        int currentHp;
        int maxHp;
    };

    extern Character currentCharacter;
#endif