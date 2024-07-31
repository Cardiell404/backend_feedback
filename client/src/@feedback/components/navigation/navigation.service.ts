import { Injectable } from '@angular/core';
import { FeedbackNavigationItem } from '@feedback/components/navigation/navigation.types';

@Injectable({
    providedIn: 'root'
})
export class FeedbackNavigationService {
    private _componentRegistry: Map<string, any> = new Map<string, any>();
    private _navigationStore: Map<string, FeedbackNavigationItem[]> = new Map<string, any>();

    constructor() {
    }

    /**
     * Register navigation component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: any): void {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister navigation component
     *
     * @param name
     */
    deregisterComponent(name: string): void {
        this._componentRegistry.delete(name);
    }

    /**
     * Get navigation component from the registry
     *
     * @param name
     */
    getComponent<T>(name: string): T {
        return this._componentRegistry.get(name);
    }

    /**
     * Store the given navigation with the given key
     *
     * @param key
     * @param navigation
     */
    storeNavigation(key: string, navigation: FeedbackNavigationItem[]): void {
        this._navigationStore.set(key, navigation);
    }

    /**
     * Get navigation from storage by key
     *
     * @param key
     */
    getNavigation(key: string): FeedbackNavigationItem[] {
        return this._navigationStore.get(key) ?? [];
    }

    /**
     * Delete the navigation from the storage
     *
     * @param key
     */
    deleteNavigation(key: string): void {
        if ( !this._navigationStore.has(key) ) {
            console.warn(`Navigation with the key '${key}' does not exist in the store.`);
        }
        this._navigationStore.delete(key);
    }

    /**
     * Utility function that returns a flattened
     * version of the given navigation array
     *
     * @param navigation
     * @param flatNavigation
     */
    getFlatNavigation(navigation: FeedbackNavigationItem[], flatNavigation: FeedbackNavigationItem[] = []): FeedbackNavigationItem[] {
        for ( const item of navigation ) {
            if ( item.type === 'basic' ) {
                flatNavigation.push(item);
                continue;
            }

            if ( item.type === 'aside' || item.type === 'collapsable' || item.type === 'group' ) {
                if ( item.children ) {
                    this.getFlatNavigation(item.children, flatNavigation);
                }
            }
        }
        return flatNavigation;
    }

    /**
     * Utility function that returns the item
     * with the given id from given navigation
     *
     * @param id
     * @param navigation
     */
    getItem(id: string, navigation: FeedbackNavigationItem[]): FeedbackNavigationItem | null {
        for ( const item of navigation ) {
            if ( item.id === id ) {
                return item;
            }

            if ( item.children ) {
                const childItem = this.getItem(id, item.children);
                if ( childItem ) {
                    return childItem;
                }
            }
        }
        return null;
    }

    /**
     * Utility function that returns the item's parent
     * with the given id from given navigation
     *
     * @param id
     * @param navigation
     * @param parent
     */
    getItemParent( id: string, navigation: FeedbackNavigationItem[], parent: FeedbackNavigationItem[] | FeedbackNavigationItem ): FeedbackNavigationItem[] | FeedbackNavigationItem | null {
        for ( const item of navigation ) {
            if ( item.id === id ) {
                return parent;
            }

            if ( item.children ) {
                const childItem = this.getItemParent(id, item.children, item);
                if ( childItem ) {
                    return childItem;
                }
            }
        }
        return null;
    }
}
