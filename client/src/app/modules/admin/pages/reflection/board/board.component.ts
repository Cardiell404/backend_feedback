import { NewReflectionComponent } from './new-reflection/new-reflection.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReflectionService } from '../reflection.service';
import { Reflection } from '../reflection.models';

@Component({
    selector       : 'reflection-board',
    templateUrl    : './board.component.html',
    styleUrls      : ['./board.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReflectionBoardComponent implements OnInit, OnDestroy {
    reflections: Reflection[];
    page: number = 1;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _matDialog: MatDialog, private _changeDetectorRef: ChangeDetectorRef, private _reflectionService: ReflectionService, ) {
    }


    ngOnInit(): void {
        this._reflectionService.reflections$.pipe(takeUntil(this._unsubscribeAll)).subscribe((reflections: Reflection[]) => {
            this.reflections = [...reflections];
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * 
     * Add reflection
     */
    addReflection() {
        this._matDialog.open(NewReflectionComponent, { autoFocus: false,
            maxWidth: '100vw',
            maxHeight: '100vw',
            width: '95vw',
            height: '95vh',
            data     : {
                note: {}
            }
        });
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    
    onScroll() {
        console.log('ENTRE');
        this._reflectionService.searchReflections(++this.page).subscribe((reflections: Reflection[]) => {
          this.reflections.push(...reflections);
        });
    }
}
