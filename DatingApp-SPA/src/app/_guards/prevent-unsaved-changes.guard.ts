import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';


@Injectable()
// check only if user is logged in if not gives error
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  canDeactivate(component: MemberEditComponent): boolean {
    if (component.editForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
    }
    return true;
  }
}
