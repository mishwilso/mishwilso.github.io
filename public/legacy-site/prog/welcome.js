import { mountReactApp } from '../reactMount.js';
import WelcomePage from './windows/WelcomePage.jsx'; // create this too


class WelcomeProgram extends Program {
    // Override the createWindow method to set up the welcome window
    async createWindow() {
        const wminfo = {
        title: 'Welcome!',
        name:  'Welcome!',
        icon:  'img/taskbar/WindowsFlagSmall.png',
        };

        const body = `<div id="react-mount" style="width:100%;height:100%;overflow:auto;"></div>`;
        return [wminfo, body];
    }

    onAttach() {
        const container = this.getBodyHandle().querySelector('#react-mount');
        mountReactApp(container, WelcomePage);
    }
}

// Register the WelcomeProgram as a prototype with the ProgramManager
window.pm.registerPrototype('welcome', WelcomeProgram);
