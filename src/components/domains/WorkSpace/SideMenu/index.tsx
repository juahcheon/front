import checkIconOn from "@/../public/icons/checkIcon.svg";
import checkIconOff from "@/../public/icons/check-icon-off.svg";
import dashIconOn from "@/../public/icons/dash-icon-on.svg";
import dashIconOff from "@/../public/icons/dashIcon.svg";

import Filter from "@/components/commons/Filter";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);

export default function SideMenu({ state }: { state: boolean }) {
  const [check, setCheck] = useState<boolean>(false);
  const router = useRouter();
  const isOnDashboard = router.pathname === '/dashBoard';
  const isOnWorkSpace = router.pathname === '/workSpace';

  return (
    <aside className={cn("wrap", { active: state })}>
      <div className={cn("sideMenuWrap")}>
        <ul>
          <li className={cn({ choiceMenu : isOnWorkSpace})}>
            {isOnWorkSpace ? (
              <Image
                src={checkIconOn}
                alt="체크리스트"
                width={18}
                height={18}
              />
            ) : (
              <Image
                src={checkIconOff}
                alt="체크리스트"
                width={18}
                height={18}
              />
            )}
            <Link href='/workSpace'>체크리스트</Link>
          </li>
          <li className={cn({ choiceMenu: isOnDashboard })}>
            {isOnDashboard ? (
              <Image src={dashIconOn} alt="대시보드" width={18} height={18} />
            ) : (
              <Image src={dashIconOff} alt="대시보드" width={18} height={18} />
            )}
            <Link href='/dashBoard'>대시보드</Link>
          </li>
        </ul>
      </div>

      {!isOnDashboard && (
        <div className={cn("sideFilter")}>
          <Filter />
        </div>
      )}
    </aside>
  );
}
