import dblArrow from "@/../public/icons/dblArrow.svg";
import logoImg from "@/../public/images/Homepage Logo.svg";
import { getMyData } from "@/lib/apis/authme";
import useLoginData from "@/lib/store/loginData";
import useSideMenuStore from "@/lib/store/sideMenu";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function GNB() {
  const { data: session } = useSession();
  const { sideMenuState, setSideMenuState } = useSideMenuStore();
  const { data: loginData, setData } = useLoginData();
  const [page, setPage] = useState<String>("");
  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
    setPage(router.pathname);
  }, [router]);

  const handleLogin = () => {
    router.push("/logIn");
  };

  useEffect(() => {
    console.log("Session 데이터:", session);

    if (session?.accessToken) {
      fetch("https://your-weddy.pe.kr/auth/login/kakao", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: session.accessToken }),
      })
        .then((res) => res.json())
        .then((data) => console.log("쿠키 설정 완료", data))
        .catch((err) => console.error("쿠키 설정 실패", err));
    }
  }, [session]);

  const { data, isSuccess } = useQuery({
    queryKey: ["getMyData"],
    queryFn: getMyData,
  });
  useEffect(() => {
    setData(data);
  }, [isSuccess]);
  return (
    <nav className={cn("navWrap")}>
      {page === "/workSpace" ? (
        <div
          className={cn("side")}
          onClick={() => setSideMenuState(!sideMenuState)}
        >
          {sideMenuState ? (
            <div className={cn("sideControl")}>
              <Image
                src={dblArrow}
                alt="사이드바 제어"
                width={26}
                height={26}
              />
              <p>사이드바 닫기</p>
            </div>
          ) : (
            <div className={cn("sideControl")}>
              <Image
                src={dblArrow}
                alt="사이드바 제어"
                width={26}
                height={26}
                style={{ transform: "rotate(180deg)" }}
              />
              <p>사이드바 열기</p>
            </div>
          )}
        </div>
      ) : (
        <div className={cn("linkWrap")}>
          <Link href="/" className={cn("logoImgWrap")}>
            <Image
              className={cn("logoImg")}
              src={logoImg}
              alt="로고 사진"
              width={80}
              height={50}
            />
          </Link>
          <Link className={cn("aboutWeddy")} href="/">
            <p>웨디 소개</p>
          </Link>
        </div>
      )}

      <div className={cn("lonInWrap")}>
        {!loginData ? (
          <button className={cn("logInBtn")} onClick={handleLogin}>
            {" "}
            로그인
          </button>
        ) : (
          <button className={cn("logOutBtn")}> 로그아웃</button>
        )}
      </div>
    </nav>
  );
}
