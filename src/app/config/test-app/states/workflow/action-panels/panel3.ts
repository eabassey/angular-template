import * as TP from '4sure-templates';
import { ActionPanelConfig } from '4sure-wilo';


export const panel3: ActionPanelConfig = {
    id: 'panel3',
    icon: 'notes',
    instruction: 'showing panel 2',
    startNode: 'node2',
    nodes: {
        node2: {
            component: TP.Node2Component,
            footerType: 'none'
        }
    }
};
