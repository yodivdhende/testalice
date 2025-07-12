SET(SOURCES ui_LogoScreen.c
    ui_DownloadScreen.c
    ui_LootScreen.c
    ui_VirusScreen.c
    ui.c
    ui_comp_hook.c
    ui_helpers.c)

add_library(ui ${SOURCES})
