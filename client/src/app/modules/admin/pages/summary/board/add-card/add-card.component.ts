import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector       : 'dashboard-board-add-card',
    templateUrl    : './add-card.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardBoardAddCardComponent implements OnInit
{
    @ViewChild('titleInput') titleInput: ElementRef;
    @ViewChild('titleAutosize') titleAutosize: CdkTextareaAutosize;
    @Input() buttonTitle: string = 'Add a card';
    @Output() readonly saved: EventEmitter<string> = new EventEmitter<string>();
    note$: Observable<any>;

    form: UntypedFormGroup;
    formVisible: boolean = false;

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: { note: any },
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        public matDialogRef: MatDialogRef<DashboardBoardAddCardComponent>

    )
    {
    }

    
    // @ Lifecycle hooks
    

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Initialize the new list form
        this.form = this._formBuilder.group({
            title: ['']
        });

                    // Create an empty note
                    const note = {
                        id       : null,
                        title    : '',
                        content  : '',
                        tasks    : null,
                        image    : null,
                        reminder : null,
                        labels   : [],
                        archived : false,
                        createdAt: null,
                        updatedAt: null
                    };
        
                    this.note$ = of(note);
    }

    
    // @ Public methods
    

    /**
     * Save
     */
    save(): void
    {
        // Get the new list title
        const title = this.form.get('title').value;

        // Return, if the title is empty
        if ( !title || title.trim() === '' )
        {
            return;
        }

        // Execute the observable
        this.saved.next(title.trim());

        // Clear the new list title and hide the form
        this.formVisible = false;
        this.form.get('title').setValue('');

        // Reset the size of the textarea
        setTimeout(() => {
            this.titleInput.nativeElement.value = '';
            this.titleAutosize.reset();
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the visibility of the form
     */
    toggleFormVisibility(): void
    {
        // Toggle the visibility
        this.formVisible = !this.formVisible;

        // If the form becomes visible, focus on the title field
        if ( this.formVisible )
        {
            this.titleInput.nativeElement.focus();
        }
    }
}
