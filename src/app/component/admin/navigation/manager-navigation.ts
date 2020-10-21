import { Injectable } from '@angular/core';

export interface ManagerNavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends ManagerNavigationItem {
  children?: ManagerNavigationItem[];
}

const ManagerNavigationItems = [
  {
    id: 'navigation',
    title: 'Menu',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/team-manager-dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'players',
        title: 'players',
        type: 'item',
        url: '/manager-team-players',
        icon: 'feather icon-user',
        classes: 'nav-item',
      },
      {
        id: 'match',
        title: 'Match',
        type: 'item',
        url: '/manager-team-matches',
        icon: 'feather icon-home',
        classes: 'nav-item',
      }
    ]
  }
];

@Injectable()
export class ManagerNavigationItem {
  get() {
    return ManagerNavigationItems;
  }
}
