import {
  Calendar,
  Table,
  Leaf,
  Calculator,
  Columns2,
  Columns3,
  Columns4,
} from 'lucide-react';
import type { JSX } from 'react';

export interface SidebarLink {
  label: string;
  path: string;
  icon: JSX.Element;
}

export interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

// 👉 Die komplette Sidebar-Konfiguration
export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: 'Anbauplanung',
    links: [
      {
        label: 'Schläge & Beete',
        path: '/dashboard/felder',
        icon: <Leaf className='w-4 h-4' />,
      },
      {
        label: 'Anbau-Kalender',
        path: '/dashboard/kalender',
        icon: <Calendar className='w-4 h-4' />,
      },
      {
        label: 'Tabelle',
        path: '/dashboard/tabelle',
        icon: <Table className='w-4 h-4' />,
      },
    ],
  },
  {
    title: 'Aufgaben',
    links: [
      {
        label: 'Monatsansicht',
        path: '/dashboard/aufgaben/monat',
        icon: <Columns2 className='w-4 h-4' />,
      },
      {
        label: 'Wochenansicht',
        path: '/dashboard/aufgaben/woche',
        icon: <Columns3 className='w-4 h-4' />,
      },
      {
        label: 'Tagesansicht',
        path: '/dashboard/aufgaben/tag',
        icon: <Columns4 className='w-4 h-4' />,
      },
    ],
  },
  {
    title: 'Ressourcen',
    links: [
      {
        label: 'Kulturen',
        path: '/dashboard/kulturen',
        icon: <Leaf className='w-4 h-4' />,
      },
      {
        label: 'Saatgutrechner',
        path: '/dashboard/saatgut',
        icon: <Calculator className='w-4 h-4' />,
      },
    ],
  },
];
