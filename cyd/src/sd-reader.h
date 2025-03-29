#ifndef SD_READER_FUNC
#define SD_READER_FUNC
    #include <FS.h>
    bool setupSD();
    bool readConfig(fs::FS &fs);
#endif
