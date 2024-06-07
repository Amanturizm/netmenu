import React from 'react';
import Link from 'next/link';
import styles from './Tabs.module.css';
import { Tab } from '@/app/(pages)/(authentication)/types';
import { TABS } from '@/app/(pages)/(authentication)/constants';

interface Props {
  currentTab: Tab | null;
}

const Tabs: React.FC<Props> = ({ currentTab }) => {
  return (
    currentTab && (
      <div className={styles.tabs}>
        {TABS.map((tab, i) => (
          <Link href={tab.href} className={tab.href === currentTab.href ? styles.in_active : ''} key={tab.href + i}>
            {tab.title}
          </Link>
        ))}
      </div>
    )
  );
};

export default Tabs;
