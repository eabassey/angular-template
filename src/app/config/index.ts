
import { testApp } from './test-app';
import { ClientConfig } from '4sure-wilo';

export const clientConfig: ClientConfig = {
    name: 'Sample company',
    startApp: 'testApp',
    apps: {
        testApp,
    }
};
