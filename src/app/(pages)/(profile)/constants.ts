import { Tab } from '@/app/(pages)/(authentication)/types';
import myMenusIcon from '@/assets/images/my-menus-icon.png';
import myMenusInActiveIcon from '@/assets/images/my-menus-icon-in-active.png';
import tariffsIcon from '@/assets/images/tariffs-icon.png';
import tariffsInActiveIcon from '@/assets/images/tariffs-icon-in-active.png';
import cabinetIcon from '@/assets/images/sign-in-icon.png';
import cabinetInActiveIcon from '@/assets/images/sign-in-icon-in-active.png';
import advertisersIcon from '@/assets/images/advertisers-icon.png';
import advertisersInActiveIcon from '@/assets/images/advertisers-icon-in-active.png';

export const PROFILE_TABS: Tab[] = [
  {
    href: '/my-menus',
    title: 'Мои меню',
    icon: myMenusIcon.src,
    inActiveIcon: myMenusInActiveIcon.src,
  },
  {
    href: '/tariffs',
    title: 'Тарифы',
    icon: tariffsIcon.src,
    inActiveIcon: tariffsInActiveIcon.src,
  },
  {
    href: '/cabinet',
    title: 'Кабинет',
    icon: cabinetIcon.src,
    inActiveIcon: cabinetInActiveIcon.src,
  },
  {
    href: '/advertisers',
    title: 'Для рекламодателей',
    icon: advertisersIcon.src,
    inActiveIcon: advertisersInActiveIcon.src,
  },
];
