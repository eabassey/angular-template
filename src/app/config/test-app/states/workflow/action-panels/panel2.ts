import * as TP from '4sure-templates';
import { ActionPanelConfig } from '4sure-wilo';

export const panel2: ActionPanelConfig = {
    id: 'panel2',
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
