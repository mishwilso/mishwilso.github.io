class ProgramManager {
    constructor() {
        // Initialize the prototypes and instances storage objects
        this.prototypes = {}
        this.instances = {}
    }

    registerPrototype(name, class_prototype) {
        // Register a new program prototype with a given name
        this.prototypes[name] = class_prototype
    }

    hasPrototype(name) {
        // Check if a program prototype with the given name is registered
        return (name in this.prototypes)
    }

    createID() {
        // Generate a random 10-character hexadecimal string as an ID
        // The chance of collision is extremely low (~1 in a trillion)
        const alphabet = 'abcdef0123456789'
        let str = ''
        for (let i = 0; i < 10; i++) {
            str += alphabet[Math.floor(Math.random() * alphabet.length)]
        }
        return str
    }

    hasInstance(id) {
        // Check if an instance with the given ID exists
        return (id in this.instances)
    }

    async createInstance(name) {
        // Special case to handle opening web links in a new tab
        if (name.length > 4 && name.slice(0,4) === 'web:') {
            console.log('opening web link')
            document.querySelector('#dummy')
                .setAttribute('href', name.slice(4))

            document.querySelector('#dummy').click()

            return
        }

        if (name === 'nop') {
            return
        }

        // Handle arguments passed to the program
        let arg = null;
        if (name.indexOf(':') !== -1) {
            [name, arg] = name.split(/:(.+)/)
        }
        console.log('launching ', name, ' with arg ', arg)

        if (!this.hasPrototype(name)) {
            console.warn(`attempted to open unregistered program ${name}, ignoring...`)
            return
        }
        const id = this.createID()

        // Create a new instance of the program and store it
        const handle = this.instances[id] = new (this.prototypes[name])(id)

        const [wminfo, body] = await handle.createWindow(arg)

        // Open the window associated with the program instance
        window.wm.openWindow(wminfo, body, win => {
            win.dataset._pm_id = id

            // Attach the window handle to the program instance
            handle.setWindowHandle(win)

            // Dispatch the onAttach handler
            handle.onAttach(win)
        })
    }

    getInstance(id) {
        // Retrieve an instance by its ID
        if (!this.hasInstance(id)) {
            console.warn(`attempted to get unknown instance ${id}, ignoring...`)
            return
        }

        return this.instances[id]
    }

    closeInstance(id) {
        // Close and remove an instance by its ID
        if (!this.hasInstance(id)) {
            console.warn(`attempted to close unknown instance ${id}, ignoring...`)
            return
        }

        this.instances[id].onClose()

        delete this.instances[id]
    }
}

// Base class for programs that can be extended
class Program {
    constructor(id) {
        // Store the program's unique ID
        this._pm_id = id
    }

    async createWindow(arg) {
        // Create a default window body and window information
        let body = `
            <p> Default window </p>
        `

        let wminfo = {
            title: 'Hello!',
            name:  'Default Program',
            icon:  'img/desktop/EXE.png'
        }

        return [wminfo, body]
    }

    initializeMenuHandler() {
        // Set up event listeners for menu items in the window's menu bar
        const menus = this
            .getBodyHandle()
            .querySelectorAll('.menu-bar__item')

        // Function to close all active menus
        const closeMenu = () => {
            document.querySelectorAll('.menu-bar__submenu-bg')
                .forEach(el => {
                    el.classList.remove('menu-bar__submenu-bg--active')
                })
            document.querySelectorAll('.menu-bar__submenu')
                .forEach(el => {
                    el.classList.remove('menu-bar__submenu--active')
                })
            document.querySelectorAll('.menu-bar__item')
                .forEach(el => el.classList.remove('menu-bar__item--active'))
        }

        let bg = this.getBodyHandle()
            .parentElement
            .querySelector('.menu-bar__submenu-bg')

        if (bg === null) {
            // Create a background overlay for closing menus when clicking outside
            bg = document.createElement('div')
            bg.classList.add('menu-bar__submenu-bg')

            bg.addEventListener('click', () => {
                closeMenu()
            })

            // Append the background overlay to the window
            this
                .getBodyHandle()
                .parentElement
                .appendChild(bg)
        }

        for (let menu of menus) {
            let submenu = menu.querySelector('.menu-bar__submenu')
            if (submenu !== null) {
                // Add click event listeners to menu items
                menu.addEventListener('click', e => {

                    if (e.target !== menu) {return}

                    bg.classList.add('menu-bar__submenu-bg--active')
                    menu.classList.add('menu-bar__item--active')
                    submenu.classList.add('menu-bar__submenu--active')
                })

                // Add event listeners to submenu items for click actions
                submenu
                    .querySelectorAll('[data-name]')
                    .forEach(el => {
                        el.addEventListener('click', e => {
                            this.handleMenuClick(e.target.dataset.name)

                            closeMenu()
                        })
                    })
            }
        }
    }

    handleMenuClick(name) {
        // Handle menu item click events
    }

    setWindowHandle(win) {
        // Set the window handle for the program instance
        this.handle = win
    }

    getBodyHandle() {
        // Get the body element of the program's window
        if (this.handle === null) {
            return null
        }
        return this.handle.querySelector('.window-body')
    }

    setWindowTitle(title) {
        // Set the title of the program's window
        this.handle
            .querySelector('.title-bar-text')
            .innerText = title
    }

    setWindowIcon(icon) {
        // Set the icon of the program's window
        this.handle.dataset.icon = icon
        window.wm.redrawTaskbarMain()
    }

    setWindowName(name) {
        // Set the name of the program's window
        this.handle.dataset.name = name
        window.wm.redrawTaskbarMain()
    }

    onAttach() {
        // Handle actions when the program is attached to a window
    }

    onClose() {
        // Handle actions when the program's window is closed
    }

    onResize() {
        // Handle actions when the program's window is resized
    }

    onResizeEnd() {
        // Handle actions when the program's window resizing ends
    }

    closeWindow() {
        // Programmatically close the program's window
        this.handle.querySelector('button[aria-label="Close"]').click()
    }
}

// Create a global instance of ProgramManager
window.pm = new ProgramManager()



window.pm.registerPrototype('react-about', class extends Program {
  async createWindow() {
    const wminfo = {
      title: 'About Me?',
      icon: 'img/desktop/WordPad.png',
      name: 'AboutWindow',
    };

    const body = '<div id="react-host" style="width: 100%; height: 100%; overflow: auto;"></div>';
    return [wminfo, body];
  }

  onAttach() {
    this.sendReactMessage();
  }

  onResizeEnd() {
    this.sendReactMessage();
  }

  sendReactMessage() {
    window.postMessage({
      type: 'launch-react-component',
      component: 'AboutWindow',
    }, '*');
  }
});
