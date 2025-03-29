
void createGifFromFile(char *path) {
  lv_obj_t *gif = lv_gif_create(lv_scr_act());
  lv_gif_set_src(gif, path);
  lv_obj_center(gif);
}