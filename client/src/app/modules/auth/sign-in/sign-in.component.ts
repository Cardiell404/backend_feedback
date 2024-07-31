import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { feedbackAnimations } from '@feedback/animations';
import { FeedbackAlertType } from '@feedback/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'sign-in-fullscreen-reversed',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : feedbackAnimations
})
export class AuthSignInComponent implements OnInit {
    
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FeedbackAlertType; message: string } = { type   : 'success', message: '' };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    constructor( private _activatedRoute: ActivatedRoute, private _authService: AuthService, private _formBuilder: UntypedFormBuilder,
                 private _router: Router) {
    }

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email     : ['carlos@gmail.com', [Validators.required, Validators.email]],
            password  : ['Carlos123', Validators.required],
        });
    }

    /**
     * Sign in
     */
    signIn(): void {
        if ( this.signInForm.invalid ) {
            return;
        }
        this.signInForm.disable();
        this.showAlert = false;
        this._authService.signIn(this.signInForm.value).subscribe(() => {
            const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
            this._router.navigateByUrl(redirectURL);
        }, (error) => {
            this.signInForm.enable();
            this.signInNgForm.resetForm();
            this.alert = { type   : 'error', message: 'Wrong email or password' };
            this.showAlert = true;
        });
    }
}
