import call from "@/../public/icons/call.svg";
import mail from "@/../public/icons/mail.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={cn("footerWrap")}>
      <p>© 2025 Weddy. All Rights Reserved</p>
      <Link href="/sub" className={cn("link")}>
        개인정보 처리방침
      </Link>
      <div className={cn("footerBottom")}>
        <p>고객 문의</p>
        <p>
          <Image src={mail} alt="이메일 아이콘" width={20} height={20} />
          <a href="mailto:ajh02060@naver.com">ajh02060@naver.com</a>
        </p>
        <p>
          <Image src={call} alt="전화 아이콘" width={20} height={20} />
          <a href="tel:01020943722">010-2094-3722</a>
        </p>
      </div>
    </footer>
  );
}
