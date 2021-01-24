import {panel1, panel2, panel3, silSearchPanel} from './action-panels';
import { StateConfig } from '4sure-wilo';
import { map } from 'rxjs/operators';
import * as TP from '4sure-templates';
import { WorkflowListComponent } from 'src/app/components/workflow/workflow-list.component';
import { of } from 'rxjs';


export const workflow: StateConfig = {
    id: 'workflow',
    name: 'Workflow',
    title: 'Workflow',
    startNode: 'list',
    nodes: {
        list: {
          component: WorkflowListComponent,
          inputs: {
              // list$: 'variables.claims.dataset'
              // list$: {
              //     variableName: 'claims',
              //     filterFunctions: {filter_down: (id) => p => p.id < id, filter_top: (id) => p => p.id > id}
              // },
              claims$: {
                  variableName: 'claims',
                  filterFunctions: {filter_down: (id: any) => (p: any) => p.id < id, filter_top: (id: any) => (p: any) => p.id > id}
              }
          },
          serverCalls: [
              {
                  key: 'claims',
                  errorMessage: '',
                  filterable: true,
                  sortable: false,
                  directCall: (svc, route) => {
                      return of([{id: 1}, {id: 2}]);
                  },
              }
          ],
          footerType: 'pagination'
      },
    },
    actionPanel: {
      search: silSearchPanel,
      // filter: silFilterPanel,
        panel1,
        panel2,
        panel3
    }
}
