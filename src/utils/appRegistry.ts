// src/utils/applications.ts
// Contains definitions of all applications shown on the desktop and in the Start menu.

import Credit from '../windows/Credit';
import Resume from '../windows/Resume';
import PortfolioExplorer from '../windows/PortolioExplorer';
import InternetExplorerContent from '../windows/InternetExplorer';
import EmailClientContent from '../windows/EmailClientContent';
import { AppDefinition } from '../constants/types';

export const APPLICATIONS: Record<string, AppDefinition> = {
  portfolio: {
    key: 'portfolio',
    name: 'Portfolio',
    shortcutIcon: '/img/desktop/MyComputer.png',
    component: PortfolioExplorer,
    widthRatio: 0.55,
    heightRatio: 0.85,
    bottomLeftText: 'Projects & Demos',
  },
  credit: {
    key: 'credit',
    name: 'Credit',
    shortcutIcon: '/img/desktop/BatchFile.png',
    component: Credit,
    widthRatio: 0.39,
    heightRatio: 0.6,
    bottomLeftText: 'Welcome to MishOS',
  },
  resume: {
    key: 'resume',
    name: 'Resume',
    shortcutIcon: '/img/desktop/TextFile.png',
    component: Resume,
    widthRatio: 0.3,
    heightRatio: 0.4,
    bottomLeftText: 'My Resume',
  },
  ie: {
    key: 'ie',
    name: 'Internet Explorer',
    shortcutIcon: '/img/taskbar/IESmall.png',
    component: InternetExplorerContent,
    widthRatio: 0.7,
    heightRatio: 0.7,
    bottomLeftText: 'Internet Explorer',
  },
  email: {
    key: 'email',
    name: 'Mail',
    shortcutIcon: '/img/taskbar/OutlookExpress.png',
    component: EmailClientContent,
    widthRatio: 0.6,
    heightRatio: 0.6,
    bottomLeftText: 'Mish Wilson Mail',
  },
};

export type AppKey = keyof typeof APPLICATIONS;
