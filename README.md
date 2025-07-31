# mishOS
A pixel-styled, web-based desktop interface — part portfolio, part experiment, fully custom.

## What Is This?
mishOS is a fake operating system built entirely in React. Instead of clicking through traditional sections of a portfolio website, you're dropped into a interactive desktop. You can launch apps, drag and resize windows, open my resume, and explore my projects — all inside a fully functioning, browser-based environment.

This project started as a technical playground where I could practice component design, dynamic rendering, global state management, and UI aesthetics I grew up loving. Think Windows 95 meets modern React tooling. The goal was to make something weird, fun, and surprisingly functional.

## Why I Made This
I wanted to build a portfolio that reflected how I think: creatively! Early operating systems had charm (which I sincerly miss), colorful icons, pixel art and just enough jank to make interactions feel tactile. I wanted to recreate that vibe while showcasing my skills in React, TypeScript, and UI systems.

I also needed a space to test out architecture patterns like context providers, dynamic rendering, stateful window management, and full modularization. I didn’t want to use any templates, and wanted too see how much I could build from the groud up. (turns out? a lot)

## What’s Inside
Everything here is handmade and componentized. Below are the files worth checking out if you want to see how things work under the hood:

### `DesktopContext.tsx`
Provides a global context with the `launchWindow()` function so that any app (or subcomponent) can open another app window. This lets the system mimic the behavior of real desktop environments. 

### `Window.tsx`
The core window shell. It’s a movable, optionally resizable window component that wraps each app. Handles dragging with mouse events, layering with z-index, and app state toggling like minimize/maximize. Windows Magic!! 

### `ResumeApp.tsx`
A full resume rendered inside a scrollable app window. Shows my academic background, work experience, and skills — but styled to fit right into the OS. Built using basic layout components, scroll containers, and responsive typography.

### `ProjectGalleryApp.tsx`
This one’s a bit of a beast. It showcases selected projects in a rotating carousel, with fullscreen image modals and per-project navigation. Each image supports captions, click-to-zoom, and smooth transitions. There's a lot of conditional rendering and indexed state management here.

### `Experience.tsx`
The most data-heavy component. It renders my entire job and teaching history using a sticky year-based side nav and a timeline-style scroll viewer. IntersectionObservers detect which year is currently in view and highlight it in the side panel. It also shows each experience with custom bullets, and visual identity.

### `StartMenu.tsx`, `Taskbar.tsx`, and `AppRegistry.ts`
The foundational UI for interacting with the OS. The Start Menu pulls from a registry of apps and launches them. The Taskbar tracks open apps and lets you minimize, close, or switch between windows. 

### Styling
I use inline styles for pixel precision and encapsulation. Fonts are retro (Millennium, Pixelout), and every UI element is tuned for clarity and playfulness. 

## Is This Still a Work in Progress?
Yes! While I'm taking a break for now to learn more about TypeScript and React best practices, this is definitely still under development. I'm especially excited to add nostalgic early Windows applications — like Microsoft Paint! :) That's high on my list of features to build next.

Other ideas I’m playing with:
- Movable desktop icons and a context menu
- Fake control panel or file explorer
- Minigames or easter eggs
- Theme toggling (classic, vaporwave, high contrast)

## Just Want to See the Site?
Check out the live version here:
** https://mish-portfolio.net/ **
(no need to clone anything)

## How to Run This Locally
1. Clone the repo:
```bash
git clone https://github.com/mishwilso/mishwilso.github.io.git
cd mishwilso.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Run the dev server:
```bash
npm start
```

4. Open your browser to:
```
http://localhost:3000/
```

## Inspired By
- Windows 95, Mac OS 8, and classic Linux desktops
- Creative portfolios and UIs
- A little bit of nostalgia and a lot of curiosity :)

## Final Thoughts
Thanks for stopping by. If you’re from the MLH Fellowship or just checking out the code — I hope this gave you a glimpse into how I think, what I build, and why I love building it. Feel free to explore the codebase, file issues, or reach out if you have thoughts!

Have fun poking around. I hope it makes you smile :)
