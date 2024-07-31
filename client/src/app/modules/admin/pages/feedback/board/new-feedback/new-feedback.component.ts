import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,  ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { assign } from 'lodash-es';
import { IUser } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { Feedback } from '../../feedback.models';
import { FeedbackService } from '../../feedback.service';

@Component({
    selector       : 'dashboard-board-new-feedback',
    templateUrl    : './new-feedback.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFeedbackComponent implements OnInit {

    user: IUser;
    feedback: Feedback;
    feedbackForm: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( public matDialogRef: MatDialogRef<NewFeedbackComponent>,
                 private _feedbackService: FeedbackService,
                 private _formBuilder: UntypedFormBuilder,
                 private _userService: UserService,
                 private _changeDetectorRef: ChangeDetectorRef, ) {
    }


    ngOnInit(): void {
        this.feedback = new Feedback({});
        this.feedbackForm = this._formBuilder.group({
            title            : ['', [Validators.required]],
            description      : ['', [Validators.required]],
            additionalDetails: ['']
        });
        this._userService.user$.subscribe((user) => {
            this.user = user;
        })
        document.getElementById("help-text").innerHTML = `Each companier contributes to Companys success in different ways, and each individuals goals should reflect those contributions. You can create specific goals related to key milestones, innovative solutions, deliverables, financial objectives, client satisfaction, skill gaps, growth behaviors or new skills for the future. It is also important to set goals that demostrate a commitment to Companys culture of divertisty and inclusion. Think about what you can do to support the inclusive workplace that drives innovation and differentiales Company as an employer.
        <strong>Before setting your goals, consider feedback you have received and ask yourself:</strong><br/><br/>
        <ul>
            <li>What organizational pritorities should my objectives be aligned to?</li>
            <li>What are the top three to five goals i should achieve in the next few months to work toward my objectives?</li>
            <li>What are the strategies that will hekp me to archieve these goals?</li>
            <li>What behaviors or skills do I need to learn and apply to execute these strategies?</li>
            <li>What current behaviors and processes dont support these strategies and need to be eliminated?</li>
        </ul>
                Hi Brian,

        Ullamco deserunt commodo esse deserunt deserunt quis eiusmod. Laborum sint excepteur non sit eiusmod sunt voluptate ipsum nisi ullamco magna. Lorem consectetur est dolor minim exercitation deserunt quis duis fugiat ipsum incididunt non. Anim aute ipsum cupidatat nisi occaecat quis sit nisi labore labore dolore do. Pariatur veniam culpa quis veniam nisi exercitation veniam ut. Quis do sint proident fugiat ad.

        Non id nisi commodo veniam. Veniam veniam minim ea laborum voluptate id duis deserunt. Anim ut ut amet et ullamco nulla fugiat id incididunt adipisicing excepteur amet. Ex amet eu cillum non fugiat velit dolore. Incididunt duis est eu et ex sunt consectetur cillum nisi aute proident.

        Incididunt excepteur laborum quis sit. Ex quis officia incididunt proident aliqua adipisicing. Irure ad in Lorem laborum deserunt nulla consequat. Pariatur excepteur exercitation cupidatat aute.

        Cheers!
        Myra Dudley`
        this.feedbackForm.valueChanges.pipe(tap((value) => {
            this.feedback = assign(this.feedback, value);
            this._changeDetectorRef.markForCheck();
        }),
        debounceTime(300),
        takeUntil(this._unsubscribeAll)).subscribe();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Create a new Feedback
     */
    createFeedback(): void {
        const data: Feedback = {...this.feedbackForm.getRawValue()};
        this.feedbackForm.disable();
        this._feedbackService.createFeedback(data).subscribe( () => {
          this.matDialogRef.close();
        }, _ => {
          this.feedbackForm.enable();
        });
    }
    
}
