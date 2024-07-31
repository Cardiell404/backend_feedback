import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLuxonDateModule, MAT_LUXON_DATE_FORMATS } from '@angular/material-luxon-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardComponent } from 'app/modules/admin/pages/dashboard/dashboard.component';
import { DashboardBoardComponent } from 'app/modules/admin/pages/dashboard/board/board.component';
import { SelectUniversalCardComponent } from 'app/modules/admin/pages/dashboard/board/select-universal-card/select-universal-card.component';
import { dashboardRoutes } from 'app/modules/admin/pages/dashboard/dashboard.routing';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardBoardComponent,
        SelectUniversalCardComponent,
    ],
    imports     : [
        RouterModule.forChild(dashboardRoutes),
        DragDropModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatProgressBarModule,
        SharedModule,
        MatDividerModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule
    ],
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: MAT_LUXON_DATE_FORMATS
        }
    ]
})
export class DashboardModule
{
}
