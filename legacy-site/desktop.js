class DesktopManager {

    constructor() {
        window.addEventListener('load', this.resizeSelectionCanvas.bind(this));
        window.addEventListener('resize', this.resizeSelectionCanvas.bind(this));
        window.addEventListener('orientationchange', this.resizeSelectionCanvas.bind(this));

        this.desktop = document.querySelector('.desktop');
        this.desktop_container = document.querySelector('.desktop-container');

        // Attach icon behaviors
        this.desktop
            .querySelectorAll('.desktop-icon')
            .forEach(icon => {
                this.attachIconSelection(icon);
                // ICON MOVEMENT --> slightly buggy
                // TODO: ADD CLICK AND HOLD
                this.attachIconMovement(icon);  
            });

        document.querySelector('.desktop')
            .addEventListener('click', this.handleClick.bind(this));

        this.canvas = document.querySelector('canvas#selections');
        this.sel_ctx = this.canvas.getContext('2d');
        this.drawing_selection = false;
        this.skip_click = false;
        this.isDraggingIcon = false;  // Add this flag

        this.resizeSelectionCanvas();

        // Taskbar quick launch
        document.querySelectorAll('.task-bar__quick[data-launch]')
            .forEach(el => {
                el.addEventListener('click', () => window.pm.createInstance(el.dataset.launch));
            });
    }

    attachIconSelection(icon) {
        icon.addEventListener('click', () => {
            document.querySelector('.desktop')
                .querySelectorAll('.desktop-icon[data-active="true"]')
                .forEach(el => el.dataset.active = false);

            icon.dataset.active = true;
        });

        const openProgram = e => {
            e.preventDefault();
            if ('launch' in icon.dataset) {
                window.pm.createInstance(icon.dataset.launch);
            } else {
                window.wm.openWindow({ title: 'Sorry!' }, `
                    <p>It doesn't work.</p>
                `);
            }
        };

        icon.addEventListener('dblclick', openProgram);

        if (isMobileBrowser()) {
            // On mobile, fire this on a single click
            icon.addEventListener('click', openProgram);
        }
    }

    attachIconMovement(icon) {
        let startX, startY, initialX, initialY;

        const onMouseMove = (e) => {
            if (!this.isDraggingIcon) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            icon.style.transform = `translate(${initialX + dx}px, ${initialY + dy}px)`;
        };

        const onMouseUp = () => {
            if (this.isDraggingIcon) {
                this.isDraggingIcon = false;
                icon.style.zIndex = 1;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };

        icon.addEventListener('mousedown', (e) => {
            this.isDraggingIcon = true;
            startX = e.clientX;
            startY = e.clientY;
            const transform = getComputedStyle(icon).transform;

            if (transform !== 'none') {
                const matrix = new DOMMatrix(transform);
                initialX = matrix.m41;
                initialY = matrix.m42;
            } else {
                initialX = 0;
                initialY = 0;
            }

            icon.style.zIndex = 1000;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    clearIconSelections() {
        document.querySelector('.desktop')
            .querySelectorAll('.desktop-icon[data-active="true"]')
            .forEach(el => el.dataset.active = false);
    }

    handleClick(e) {
        if (this.skip_click === true) {
            this.skip_click = false;
            return;
        }

        let assertNotIcon = target => {
            if (target === document.body) return true;
            if (target.classList.contains('desktop-icon')) return false;
            return assertNotIcon(target.parentNode);
        };

        if (!assertNotIcon(e.target)) return;

        this.clearIconSelections();
    }

    checkIconOverlap(icon, x1, y1, x2, y2) {
        let rect = icon.getBoundingClientRect();

        let i_x1 = rect.x * window.devicePixelRatio;
        let i_y1 = rect.y * window.devicePixelRatio;

        let i_x2 = (rect.x + rect.width) * window.devicePixelRatio;
        let i_y2 = (rect.y + rect.height) * window.devicePixelRatio;

        if (!(Math.min(y1, y2) > i_y2 ||
            Math.max(y1, y2) < i_y1) &&
            !(Math.min(x1, x2) > i_x2 ||
            Math.max(x1, x2) < i_x1)
        ) {
            return true;
        }
        return false;
    }

    resizeSelectionCanvas() {
        const canvas = document.querySelector('canvas#selections');
        const taskbarHeight = document
            .querySelector('.task-bar')
            .getBoundingClientRect()
            .height;

        let canvas_width = window.innerWidth;
        let canvas_height = window.innerHeight - taskbarHeight;

        canvas.style.height = `${canvas_height}px`;
        canvas.style.width = `${canvas_width}px`;

        let dpi = window.devicePixelRatio;

        canvas.setAttribute('width', canvas_width * dpi);
        canvas.setAttribute('height', canvas_height * dpi);

        this.canvas_size = {
            width: canvas_width * dpi,
            height: canvas_height * dpi
        };

    }

    clearSelectionRect() {
        this.sel_ctx.clearRect(0, 0, this.canvas_size.width, this.canvas_size.height);
    }

    drawSelectionRect(x1, y1, x2, y2) {
        let dpi = window.devicePixelRatio;
        x1 *= dpi;
        y1 *= dpi;
        x2 *= dpi;
        y2 *= dpi;

        this.clearSelectionRect();

        this.sel_ctx.beginPath();

        this.sel_ctx.lineWidth = '1px';
        this.sel_ctx.strokeStyle = 'red';
        this.sel_ctx.setLineDash([1]);

        this.sel_ctx.rect(x1, y1, x2 - x1, y2 - y1);

        this.sel_ctx.stroke();

        for (let icon of this.desktop.querySelectorAll('.desktop-icon')) {
            if (this.checkIconOverlap(icon, x1, y1, x2, y2)) {
                icon.dataset.active = true;
            } else {
                icon.dataset.active = false;
            }
        }
    }

    handleSelectionStart(e) {
        window.mm.updateMousePos(e);

        this.drawing_selection = true;
        this.initial_selection_start = {
            x: window.mouse.x,
            y: window.mouse.y
        };

        const updateSelection = () => {
            if (this.drawing_selection) {
                this.skip_click = true;

                this.drawSelectionRect(
                    this.initial_selection_start.x,
                    this.initial_selection_start.y,
                    window.mouse.x,
                    window.mouse.y
                );

                window.requestAnimationFrame(updateSelection);
            }
        };
        setTimeout(updateSelection, 250);
    }

    handleSelectionEnd(e) {
        this.drawing_selection = false;
        this.clearSelectionRect();
        setTimeout(() => this.skip_click = false, 100);
    }

    updateMousePos(e) {
        // This is required because you can drag faster than a DOM event
        // can fire, and when your mouse exits a window title bar you can
        // no longer drag it.
        e = convertIfTouch(e);
        window.mouse = { x: e.clientX, y: e.clientY };
    }

}

window.dm = new DesktopManager();
