class LinkedInProgram extends Program {
    isMobileBrowser() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    getDocumentURL() {
        return 'https://www.linkedin.com/in/mish-wilson';
    }

    getDocumentTitle() {
        return 'LinkedIn';
    }

    createWindow() {
        let body = '';
        let wminfo = {
            title: `Document Viewer - ${this.getDocumentTitle()}`,
            name: `Document Viewer (${this.getDocumentTitle()})`,
            icon: 'img/desktop/WordPad.png',
            resizable: true
        };

        if (this.isMobileBrowser()) {
            // On mobile, show a prompt to open in a new tab
            body = `
                <div class="window__dialog">
                    <div class="window__dialog-info">
                        <img src="img/desktop/TextFile.png"/>
                        <p>
                            Open ${this.getDocumentTitle().toLowerCase()} in a new tab?
                        </p>
                    </div>
                    <div class="window__dialog-action">
                        <button class="linkedin_close">No</button>
                        <a href="${this.getDocumentURL()}" target="_blank">
                            <button autofocus>Yes</button>
                        </a>
                    </div>
                </div>
            `;
            wminfo = {
                ...wminfo,
                resizable: false
            };
        } else {
            // On desktop, directly open the GitHub page in a new tab
            window.open(this.getDocumentURL(), '_blank');
            this.closeWindow();
            return;
        }

        return [wminfo, body];
    }

    onAttach() {
        this.getBodyHandle().classList.add('window__linkedin');
        if (this.isMobileBrowser()) {
            this.getBodyHandle()
                .querySelector('button.linkedin__close')
                .addEventListener('click', this.closeWindow.bind(this));
        }
    }
}

window.pm.registerPrototype('linkedin', LinkedInProgram);
