import { DashboardService } from 'app/modules/admin/pages/dashboard/dashboard.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { UniversalCard } from '../../dashboard.models';

@Component({
    selector       : 'dashboard-select-universal-card',
    templateUrl    : './select-universal-card.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectUniversalCardComponent implements OnInit {
    universalCards: UniversalCard[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( public matDialogRef: MatDialogRef<SelectUniversalCardComponent>, private _dashboardService: DashboardService,
                 private _changeDetectorRef: ChangeDetectorRef, ) {
    }


    ngOnInit(): void {
        this._dashboardService.universalCards$.pipe(takeUntil(this._unsubscribeAll)).subscribe((universalCards: UniversalCard[]) => {
            this.universalCards = [...universalCards];
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
