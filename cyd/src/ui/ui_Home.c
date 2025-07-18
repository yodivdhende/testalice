// This file was generated by SquareLine Studio
// SquareLine Studio version: SquareLine Studio 1.5.1
// LVGL version: 9.1.0
// Project name: cyd-interface

#include "ui.h"

void ui_Home_screen_init(void)
{
    ui_Home = lv_obj_create(NULL);
    lv_obj_remove_flag(ui_Home, LV_OBJ_FLAG_SCROLLABLE);      /// Flags

    ui_Header = ui_Header_create(ui_Home);
    lv_obj_set_x(ui_Header, -1);
    lv_obj_set_y(ui_Header, -107);

    ui_SkillsButton = lv_button_create(ui_Home);
    lv_obj_set_width(ui_SkillsButton, 70);
    lv_obj_set_height(ui_SkillsButton, 70);
    lv_obj_set_x(ui_SkillsButton, -70);
    lv_obj_set_y(ui_SkillsButton, -35);
    lv_obj_set_align(ui_SkillsButton, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_SkillsButton, LV_OBJ_FLAG_SCROLL_ON_FOCUS);     /// Flags
    lv_obj_remove_flag(ui_SkillsButton, LV_OBJ_FLAG_SCROLLABLE);      /// Flags
    lv_obj_set_style_bg_color(ui_SkillsButton, lv_color_hex(0x3D3D3D), LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_opa(ui_SkillsButton, 0, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_color(ui_SkillsButton, lv_color_hex(0x656565), LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_bg_opa(ui_SkillsButton, 255, LV_PART_MAIN | LV_STATE_PRESSED);

    ui_SkillsButtonImage = lv_image_create(ui_SkillsButton);
    lv_image_set_src(ui_SkillsButtonImage, &ui_img_user_png);
    lv_obj_set_width(ui_SkillsButtonImage, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_SkillsButtonImage, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_SkillsButtonImage, 0);
    lv_obj_set_y(ui_SkillsButtonImage, -5);
    lv_obj_set_align(ui_SkillsButtonImage, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_SkillsButtonImage, LV_OBJ_FLAG_CLICKABLE);     /// Flags
    lv_obj_remove_flag(ui_SkillsButtonImage, LV_OBJ_FLAG_SCROLLABLE);      /// Flags

    ui_SkillButtonLabel = lv_label_create(ui_SkillsButton);
    lv_obj_set_width(ui_SkillButtonLabel, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_SkillButtonLabel, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_SkillButtonLabel, 0);
    lv_obj_set_y(ui_SkillButtonLabel, 24);
    lv_obj_set_align(ui_SkillButtonLabel, LV_ALIGN_CENTER);
    lv_label_set_text(ui_SkillButtonLabel, "Skills");
    lv_obj_set_style_text_font(ui_SkillButtonLabel, &lv_font_montserrat_12, LV_PART_MAIN | LV_STATE_DEFAULT);

    ui_ImplantsButton = lv_button_create(ui_Home);
    lv_obj_set_width(ui_ImplantsButton, 70);
    lv_obj_set_height(ui_ImplantsButton, 70);
    lv_obj_set_x(ui_ImplantsButton, 70);
    lv_obj_set_y(ui_ImplantsButton, -35);
    lv_obj_set_align(ui_ImplantsButton, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_ImplantsButton, LV_OBJ_FLAG_SCROLL_ON_FOCUS);     /// Flags
    lv_obj_remove_flag(ui_ImplantsButton, LV_OBJ_FLAG_SCROLLABLE);      /// Flags
    lv_obj_set_style_bg_color(ui_ImplantsButton, lv_color_hex(0x3D3D3D), LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_opa(ui_ImplantsButton, 0, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_color(ui_ImplantsButton, lv_color_hex(0x656565), LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_bg_opa(ui_ImplantsButton, 255, LV_PART_MAIN | LV_STATE_PRESSED);

    ui_ImplantButtonImage = lv_image_create(ui_ImplantsButton);
    lv_image_set_src(ui_ImplantButtonImage, &ui_img_1577569611);
    lv_obj_set_width(ui_ImplantButtonImage, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_ImplantButtonImage, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_ImplantButtonImage, 0);
    lv_obj_set_y(ui_ImplantButtonImage, -5);
    lv_obj_set_align(ui_ImplantButtonImage, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_ImplantButtonImage, LV_OBJ_FLAG_CLICKABLE);     /// Flags
    lv_obj_remove_flag(ui_ImplantButtonImage, LV_OBJ_FLAG_SCROLLABLE);      /// Flags

    ui_ImplantsButtonLabel = lv_label_create(ui_ImplantsButton);
    lv_obj_set_width(ui_ImplantsButtonLabel, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_ImplantsButtonLabel, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_ImplantsButtonLabel, 0);
    lv_obj_set_y(ui_ImplantsButtonLabel, 25);
    lv_obj_set_align(ui_ImplantsButtonLabel, LV_ALIGN_CENTER);
    lv_label_set_text(ui_ImplantsButtonLabel, "Implants");
    lv_obj_set_style_text_font(ui_ImplantsButtonLabel, &lv_font_montserrat_12, LV_PART_MAIN | LV_STATE_DEFAULT);

    ui_ItemsButton = lv_button_create(ui_Home);
    lv_obj_set_width(ui_ItemsButton, 70);
    lv_obj_set_height(ui_ItemsButton, 70);
    lv_obj_set_x(ui_ItemsButton, -70);
    lv_obj_set_y(ui_ItemsButton, 50);
    lv_obj_set_align(ui_ItemsButton, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_ItemsButton, LV_OBJ_FLAG_SCROLL_ON_FOCUS);     /// Flags
    lv_obj_remove_flag(ui_ItemsButton, LV_OBJ_FLAG_SCROLLABLE);      /// Flags
    lv_obj_set_style_bg_color(ui_ItemsButton, lv_color_hex(0x3D3D3D), LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_opa(ui_ItemsButton, 0, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_color(ui_ItemsButton, lv_color_hex(0x656565), LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_bg_opa(ui_ItemsButton, 255, LV_PART_MAIN | LV_STATE_PRESSED);

    ui_ItemsButtonImage = lv_image_create(ui_ItemsButton);
    lv_image_set_src(ui_ItemsButtonImage, &ui_img_1177636178);
    lv_obj_set_width(ui_ItemsButtonImage, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_ItemsButtonImage, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_ItemsButtonImage, 0);
    lv_obj_set_y(ui_ItemsButtonImage, -5);
    lv_obj_set_align(ui_ItemsButtonImage, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_ItemsButtonImage, LV_OBJ_FLAG_CLICKABLE);     /// Flags
    lv_obj_remove_flag(ui_ItemsButtonImage, LV_OBJ_FLAG_SCROLLABLE);      /// Flags

    ui_ItemsButtonLabel = lv_label_create(ui_ItemsButton);
    lv_obj_set_width(ui_ItemsButtonLabel, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_ItemsButtonLabel, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_ItemsButtonLabel, 0);
    lv_obj_set_y(ui_ItemsButtonLabel, 25);
    lv_obj_set_align(ui_ItemsButtonLabel, LV_ALIGN_CENTER);
    lv_label_set_text(ui_ItemsButtonLabel, "Items");
    lv_obj_set_style_text_font(ui_ItemsButtonLabel, &lv_font_montserrat_12, LV_PART_MAIN | LV_STATE_DEFAULT);

    ui_MessagesButton = lv_button_create(ui_Home);
    lv_obj_set_width(ui_MessagesButton, 70);
    lv_obj_set_height(ui_MessagesButton, 70);
    lv_obj_set_x(ui_MessagesButton, 70);
    lv_obj_set_y(ui_MessagesButton, 50);
    lv_obj_set_align(ui_MessagesButton, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_MessagesButton, LV_OBJ_FLAG_SCROLL_ON_FOCUS);     /// Flags
    lv_obj_remove_flag(ui_MessagesButton, LV_OBJ_FLAG_SCROLLABLE);      /// Flags
    lv_obj_set_style_bg_color(ui_MessagesButton, lv_color_hex(0x3D3D3D), LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_opa(ui_MessagesButton, 0, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_color(ui_MessagesButton, lv_color_hex(0x656565), LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_bg_opa(ui_MessagesButton, 255, LV_PART_MAIN | LV_STATE_PRESSED);

    ui_MessagesButtonImage = lv_image_create(ui_MessagesButton);
    lv_image_set_src(ui_MessagesButtonImage, &ui_img_9038990);
    lv_obj_set_width(ui_MessagesButtonImage, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_MessagesButtonImage, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_MessagesButtonImage, 0);
    lv_obj_set_y(ui_MessagesButtonImage, -5);
    lv_obj_set_align(ui_MessagesButtonImage, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_MessagesButtonImage, LV_OBJ_FLAG_CLICKABLE);     /// Flags
    lv_obj_remove_flag(ui_MessagesButtonImage, LV_OBJ_FLAG_SCROLLABLE);      /// Flags

    ui_MessagesButtonLabel = lv_label_create(ui_MessagesButton);
    lv_obj_set_width(ui_MessagesButtonLabel, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_MessagesButtonLabel, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_MessagesButtonLabel, 0);
    lv_obj_set_y(ui_MessagesButtonLabel, 25);
    lv_obj_set_align(ui_MessagesButtonLabel, LV_ALIGN_CENTER);
    lv_label_set_text(ui_MessagesButtonLabel, "Messages");
    lv_obj_set_style_text_font(ui_MessagesButtonLabel, &lv_font_montserrat_12, LV_PART_MAIN | LV_STATE_DEFAULT);

    lv_obj_add_event_cb(ui_SkillsButton, ui_event_SkillsButton, LV_EVENT_ALL, NULL);
    lv_obj_add_event_cb(ui_ImplantsButton, ui_event_ImplantsButton, LV_EVENT_ALL, NULL);
    lv_obj_add_event_cb(ui_ItemsButton, ui_event_ItemsButton, LV_EVENT_ALL, NULL);
    lv_obj_add_event_cb(ui_MessagesButton, ui_event_MessagesButton, LV_EVENT_ALL, NULL);

}
