#include <lvgl.h>
#include <ui/ui.h>

void UiVirusSetup()
{
    _ui_screen_change(&ui_VirusScreen, LV_SCR_LOAD_ANIM_MOVE_LEFT, 500, 0, &ui_VirusScreen_screen_init);
}