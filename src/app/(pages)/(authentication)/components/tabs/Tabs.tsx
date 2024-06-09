import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { TABS } from '@/app/(pages)/(authentication)/constants';
import { Tab } from '@/app/(pages)/(authentication)/types';
import styles from './Tabs.module.css';

const Tabs = () => {
  const pathname = usePathname();
  const [currentTab, setTab] = useState<Tab | null>(null);

  useEffect(() => {
    const foundTab = TABS.find((tab) => tab.href === pathname);
    setTab(foundTab ?? TABS[0]);
  }, [pathname]);

  return (
    <div className={styles.tabs}>
      {TABS.map((tab, i) => {
        const isActive = tab.href === currentTab?.href;

        return (
          <Link href={tab.href} className={isActive ? styles.in_active : ''} key={tab.href + i}>
            <Image src={isActive ? tab.inActiveIcon : tab.icon} width={28} height={28} priority alt={tab.title} />

            <span>{tab.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
