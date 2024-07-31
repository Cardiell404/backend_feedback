import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeedbackScrollbarModule } from '@feedback/directives/scrollbar/public-api';
import { FeedbackHorizontalNavigationBasicItemComponent } from '@feedback/components/navigation/horizontal/components/basic/basic.component';
import { FeedbackHorizontalNavigationBranchItemComponent } from '@feedback/components/navigation/horizontal/components/branch/branch.component';
import { FeedbackHorizontalNavigationDividerItemComponent } from '@feedback/components/navigation/horizontal/components/divider/divider.component';
import { FeedbackHorizontalNavigationSpacerItemComponent } from '@feedback/components/navigation/horizontal/components/spacer/spacer.component';
import { FeedbackHorizontalNavigationComponent } from '@feedback/components/navigation/horizontal/horizontal.component';
import { FeedbackVerticalNavigationAsideItemComponent } from '@feedback/components/navigation/vertical/components/aside/aside.component';
import { FeedbackVerticalNavigationBasicItemComponent } from '@feedback/components/navigation/vertical/components/basic/basic.component';
import { FeedbackVerticalNavigationCollapsableItemComponent } from '@feedback/components/navigation/vertical/components/collapsable/collapsable.component';
import { FeedbackVerticalNavigationDividerItemComponent } from '@feedback/components/navigation/vertical/components/divider/divider.component';
import { FeedbackVerticalNavigationGroupItemComponent } from '@feedback/components/navigation/vertical/components/group/group.component';
import { FeedbackVerticalNavigationSpacerItemComponent } from '@feedback/components/navigation/vertical/components/spacer/spacer.component';
import { FeedbackVerticalNavigationComponent } from '@feedback/components/navigation/vertical/vertical.component';

@NgModule({
    declarations: [
        FeedbackHorizontalNavigationBasicItemComponent,
        FeedbackHorizontalNavigationBranchItemComponent,
        FeedbackHorizontalNavigationDividerItemComponent,
        FeedbackHorizontalNavigationSpacerItemComponent,
        FeedbackHorizontalNavigationComponent,
        FeedbackVerticalNavigationAsideItemComponent,
        FeedbackVerticalNavigationBasicItemComponent,
        FeedbackVerticalNavigationCollapsableItemComponent,
        FeedbackVerticalNavigationDividerItemComponent,
        FeedbackVerticalNavigationGroupItemComponent,
        FeedbackVerticalNavigationSpacerItemComponent,
        FeedbackVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        FeedbackScrollbarModule
    ],
    exports     : [
        FeedbackHorizontalNavigationComponent,
        FeedbackVerticalNavigationComponent
    ]
})
export class FeedbackNavigationModule
{
}
