// This file was generated by SquareLine Studio
// SquareLine Studio version: SquareLine Studio 1.5.1
// LVGL version: 9.1.0
// Project name: cyd-interface

#include "ui.h"

void ui_Skills_screen_init(void)
{
    ui_Skills = lv_obj_create(NULL);
    lv_obj_remove_flag(ui_Skills, LV_OBJ_FLAG_SCROLLABLE);      /// Flags

    ui_Header4 = ui_Header_create(ui_Skills);
    lv_obj_set_x(ui_Header4, -1);
    lv_obj_set_y(ui_Header4, -107);

    ui_SkillTitle = lv_label_create(ui_Skills);
    lv_obj_set_width(ui_SkillTitle, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_SkillTitle, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_align(ui_SkillTitle, LV_ALIGN_CENTER);
    lv_label_set_text(ui_SkillTitle, "Skills");

}
