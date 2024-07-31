import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { feedbackAnimations } from '@feedback/animations';
import { FeedbackAlertType } from '@feedback/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-forgot-password',
    templateUrl  : './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : feedbackAnimations
})
export class AuthForgotPasswordComponent implements OnInit {
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FeedbackAlertType; message: string } = { type: 'success', message: '' };
    forgotPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    constructor( private _authService: AuthService, private _formBuilder: UntypedFormBuilder ) {
    }

    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        if ( this.forgotPasswordForm.invalid ) {
            return;
        }

        this.forgotPasswordForm.disable();
        this.showAlert = false;
        this._authService.forgotPassword(this.forgotPasswordForm.get('email').value).pipe(finalize(() => {
                this.forgotPasswordForm.enable();
                this.forgotPasswordNgForm.resetForm();
                this.showAlert = true;
            })).subscribe( (response) => {
                    this.alert = { type: 'success', message: 'Password reset sent! You\'ll receive an email if you are registered on our system.' };
                }, (response) => {
                    this.alert = { type: 'error', message: 'Email does not found! Are you sure you are already a member?' };
                }
            );
    }
}
