import { Injectable } from '@angular/core';
import { FeedbackDrawerComponent } from '@feedback/components/drawer/drawer.component';

@Injectable({
    providedIn: 'root'
})
export class FeedbackDrawerService {
    private _componentRegistry: Map<string, FeedbackDrawerComponent> = new Map<string, FeedbackDrawerComponent>();

    constructor() {
    }

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: FeedbackDrawerComponent): void {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): FeedbackDrawerComponent | undefined {
        return this._componentRegistry.get(name);
    }
}
