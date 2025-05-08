import type { Component } from "svelte";

export class SidePanelManager {
    public component: Component | undefined = $state();

    public open(component: Component){
        this.component = component;
    }

    public close(){
        this.component = undefined;
    }
}

export const sidePanelManager = new SidePanelManager();