#ifndef CHARACTER_FUNC
#define CHARACTER_FUNC
    #include <Arduino.h>
    bool fetchCharacter();
    class Character {
    public:
        int id;
        String name;
        int currentHp;
        int maxHp;
    };

    extern Character currentCharacter;
#endif