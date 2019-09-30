import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDeatailComponent } from './members/member-deatail/member-deatail.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';





// add protected routhes as children routes with 1 authGuard or add canActivate: [AuthGuard] to every protected component
export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
            children: [
                { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
                                                                            // for resolver
                { path: 'members/:id', component: MemberDeatailComponent, resolve: {user: MemberDetailResolver}},
                { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}},
                { path: 'messages', component: MessagesComponent},
                { path: 'lists', component: ListsComponent},
            ]
    },
    // use empty '' to redirect to home component
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
// use full to grab all url to redirect
