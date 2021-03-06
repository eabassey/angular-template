import { Component, Input, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from "@angular/core";
import {Observable, of, Subscription} from 'rxjs';
import { CoreServices, getVariable, CLIENT_CONFIG, ClientConfig } from '4sure-wilo';
import { map, skipWhile } from 'rxjs/operators';
import { select } from '@ngrx/store';



@Component({
    selector: 'workflow-list',
    template: `
    <div
    class="workflow-shell"
    [ngClass]="{
        'local-workflow-push': opened,
        'search-panel-padding': hasSearchValues
    }"
    >
        <ng-container>
            <ng-container *ngIf="(claims$ | async) as claims">
                <ng-container *ngIf="claims.length >= 1">
                <div
                *ngFor="let claim of (claims | paginate: { itemsPerPage: pageSize, currentPage: currentPage, id: 'list' }); index as i; trackBy: trackByFunc"
                >
                 {{claim.id}}
                    <!-- <claim-card
                    [skillsMap]="skillsMap"
                    [statesMap]="statesMap"
                    [spsMap]="spsMap"
                    [appointmentsMap]="appointmentsMap"
                    [instructionsMap]="instructionsMap"
                    [user]="user"
                    [claim]="claim"
                    ></claim-card> -->
                </div>
                </ng-container>
            </ng-container>
        </ng-container>
    </div>
    `,
    styles: [`
    :host {
        width: 100%;
        }
        .workflow-shell {
        margin-bottom: 6rem;
        width: 100%;
        &.search-panel-padding {
            padding-top: 2rem;
        }
        }

        // .flx-pagination /deep/ .ngx-pagination .small-screen {
        //   display: none;
        // }
        .side-header-icon {
        display: flex;
        align-items: center;
        // background-color: #4d4b4b;
        }

        .search-page {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: var(--app-menu);
        box-sizing: border-box; //TODO: Create shadow mixin
        box-shadow: 5px 15px 15px -5px rgba(#2c2b2b, 0.25);
        // border-bottom-right-radius: 0.3rem;
        position: fixed;
        padding: 0.5rem;
        top: 3.5rem;
        left: 0;
        z-index: 4;
        transition: all 350ms;
        width: 100%;
        float: right;

        &.opened {
            opacity: 1;
            left: 0;
        }

        &.closed {
            opacity: 0;
            left: -300px;
        }
        }

        .search-form {
        display: flex;
        flex-direction: row;
        margin-right: 30px;
        }

        .nav-closed {
        display: none;
        }

        .clear-input-local {
        margin: 15px;
        }

        .local-workflow-push {
        margin-top: 62px;
        }

        .button-align {
        align-content: center;
        }
        .pagination-container {
        background-color: var(--bar);
        box-shadow: 0px -7px 22px 2px rgba(0, 0, 0, 0.63);
        padding: 0.1rem;
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 4;

        .small-screen {
            display: none;
        }
        }

        .center-load {
        margin: 0 auto;
        }

        @media only screen and (max-width: 680px) {
        .search-page {
            flex-direction: column;
        }
        .search-form {
            margin-bottom: 20px;
        }
        }

        .active-item {
        // position: absolute;
        // top: 10px;
        // right: 10px;
        padding: 5px;
        border-radius: 100%;
        background: #767770;
        // color: white;
        }

    `]
})
export class WorkflowListComponent implements OnInit, OnDestroy {
    opened = false;
    hasSearchValues = false;
    @Input() claims$!: Observable<any>;
    // currentPage$: Observable<number |string | undefined | null> = of(1);
    currentPageSub!: Subscription | null;
    currentPage: number = 1;
    pageSize = 30;
    statesMap!: {[id: number]: any};
    skillsMap!: {[id: number]: any};
    spsMap!: {[id: number]: any};
    appointmentsMap!: {[id: number]: any};
    instructionsMap!: {[id: number]: any};
    user!: any;
    userSub!: Subscription;
    allInfoSub!: Subscription;
    constructor(private svc: CoreServices) {}

    ngOnInit() {
        this.currentPageSub = this.svc.route.queryParamMap.subscribe(paramMap => {
            const currentPage = paramMap.get('currentPage');
            this.currentPage = !!currentPage ? +currentPage : 1;
        });
        // this.instructionsMap = this.getStateInstructions(this.svc.clientConfig);
        // this.allInfoSub = this.svc.store.pipe(
        //   select(getVariable('all_info')),
        //   skipWhile(x => !x)
        //   ).subscribe(({dataset}) => {
        //     this.statesMap =  dataset.states
        //        .reduce((acc: any, state: any) => ({ ...acc, [state.id]: state }), {});
        //     this.skillsMap = dataset.skills.reduce((acc: any, skill: any) => ({...acc, [skill.id]: skill}), {});
        //     this.spsMap = dataset.sps.reduce((acc: any, sp: any) => ({...acc, [sp.id]: sp}), {});
        //     this.appointmentsMap = dataset.appointment_types.reduce((acc: any, apt: any) => ({...acc, [apt.id]: apt}), {});
        //    });

        // this.userSub = this.svc.auth.getUser().pipe(skipWhile(user => !user)).subscribe(user => this.user = user);
    }

    getStateInstructions(clientConfig: ClientConfig) {
      return Object.entries(clientConfig.apps[clientConfig.startApp].appStates).reduce(
        (acc, [st, config]) => (config?.instructions ? {...acc, [st]: config.instructions} : {...acc}), {}
      );
    }

    trackByFunc(idx: any, item: any) {
        return item.id;
      }

    ngOnDestroy() {
      if (this.allInfoSub) this.allInfoSub.unsubscribe();
      if (this.userSub) this.userSub.unsubscribe();
      if (this.currentPageSub) this.currentPageSub.unsubscribe();
    }
}
