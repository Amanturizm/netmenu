import { Tab } from '@/app/(pages)/(authentication)/types';
import signInIcon from '@/assets/images/sign-in-icon.png';
import signInInActiveIcon from '@/assets/images/sign-in-icon-in-active.png';
import signUpIcon from '@/assets/images/sign-up-icon.png';
import signUpInActiveIcon from '@/assets/images/sign-up-icon-in-active.png';

export const AUTHENTICATION_TABS: Tab[] = [
  { href: '/sign-in', title: 'Вход', icon: signInIcon.src, inActiveIcon: signInInActiveIcon.src },
  { href: '/sign-up', title: 'Регистрация', icon: signUpIcon.src, inActiveIcon: signUpInActiveIcon.src },
];
