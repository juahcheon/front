import Footer from "@/components/commons/Footer";
import classNames from "classnames/bind";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function Sub() {
  const [number, setNumber] = useState<string>("");
  const [hase, setHash] = useState<boolean>(false);
  useEffect(() => {
    const hashValue = window.location.hash;

    const num = hashValue.substring(1);
    setNumber(num);
  }, [hase]);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    setHash((prev) => !prev);
    e.preventDefault(); // 기본 동작 방지
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <>
      <div className={cn("container")}>
        <h1 className={cn("title")}>개인정보 처리방침</h1>

        <section className={cn("section")} id="1">
          <h2 className={cn("section-title")}>
            <span className={cn("number")}>1</span> 총칙
          </h2>
          <p className={cn("text")}>
            [웨디] (이하 "서비스명")는 이용자의 개인정보를 중요하게 생각하며,
            관련 법령을 준수하여 개인정보를 안전하게 보호하고 있습니다. 본
            개인정보처리방침은 회사가 제공하는 [웨디] (이하 "서비스")를 이용하는
            이용자의 개인정보 처리와 관련된 사항을 설명합니다.
          </p>
        </section>

        <section className={cn("section")} id="2">
          <h2 className={cn("section-title")}>
            <span className={cn("number")}>2</span> 개인정보의 수집 항목 및 방법
          </h2>
          <p className={cn("text")}>
            웨디는 다음과 같은 개인정보를 수집할 수 있습니다.
          </p>

          <h3 className={cn("sub-title")}>1) 필수 수집 항목</h3>
          <p className={cn("text")}>
            - 카카오 로그인 시 제공받는 정보: 프로필 정보(닉네임, 프로필 사진),
            이메일(선택 사항)
          </p>
          <p className={cn("text")}>
            - 서비스 이용 기록: 체크리스트 작성 및 저장 데이터
          </p>

          <h3 className={cn("sub-title")}>2) 선택 수집 항목</h3>
          <p className={cn("text")}>
            - 이용자가 추가로 입력하는 정보(선택 사항)
          </p>
          <p className={cn("text")}>
            - 서비스 이용 기록: 체크리스트 작성 및 저장 데이터
          </p>

          <h3 className={cn("sub-title")}>3) 수집 방법</h3>
          <p className={cn("text")}>
            - 이용자가 카카오 로그인을 통해 회원가입할 때
          </p>
          <p className={cn("text")}>
            - 이용자가 서비스 내에서 제공하는 체크리스트 작성, 저장, 수정할 때
          </p>
          <p className={cn("text")}>
            - 이용자가 서비스 이용 과정에서 자동으로 생성되는 정보(예: 접속
            로그, 기기 정보)
          </p>
        </section>

        <section className={cn("section")} id="3">
          <h2 className={cn("section-title")}>
            <span className={cn("number")}>3</span> 개인정보의 이용 목적
          </h2>
          <p className={cn("text")}>
            웨디는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.{" "}
          </p>
          <ul>
            <li>이용자의 결혼 준비 체크리스트 저장 및 관리</li>
            <li>서비스 운영 및 개선</li>
            <li>고객 문의 응대 및 지원</li>
            <li>서비스 이용 통계 분석 및 맞춤형 서비스 제공</li>
            <li>법적 의무 준수 및 서비스 보안 강화</li>
          </ul>
        </section>

        <section className={cn("section")} id="4">
          <h2 className={cn("section-title")}>
            <span className={cn("number")}>4</span> 개인정보의 보관 및 파기
          </h2>
          <p className={cn("text")}>
            웨디는 개인정보를 이용자가 서비스를 이용하는 동안 보관하며,
            원칙적으로 수집 및 이용 목적이 달성되면 즉시 파기합니다. 단, 관련
            법령에 의해 일정 기간 보관이 필요한 경우 다음과 같이 보관됩니다.
          </p>
          <ul>
            <li>서비스 이용 기록: 이용자의 계정 삭제 시 즉시 삭제</li>
            <li>
              법령에 따른 보관 기간: 계약 또는 청약철회 등에 관한 기록: 5년
              (전자상거래 등에서의 소비자 보호에 관한 법률)
              <ul className={cn("innerUl")}>
                <li>
                  소비자의 불만 또는 분쟁 처리에 관한 기록: 3년 (전자상거래법)
                </li>
                <li>방문 기록: 1년 (통신비밀보호법)</li>
              </ul>
            </li>
            <li>
              파기 절차 및 방법:
              <ul className={cn("innerUl")}>
                <li>
                  전자적 파일 형태의 개인정보는 복구 및 재생이 불가능한 기술적
                  방법을 사용하여 완전 삭제
                </li>
                <li>종이에 출력된 개인정보는 분쇄하거나 소각하여 파기</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className={cn("section")} id="5">
          <h2 className={cn("section-title")}>
            <span className={cn("number")}>5</span> 개인정보 제공 및 위탁
          </h2>
          <p className={cn("text")}>
            웨디는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
            다만, 다음의 경우에는 예외로 합니다.
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 의해 제공이 요구되는 경우</li>
            <li>
              서비스 운영을 위한 일부 업무를 신뢰할 수 있는 외부 업체에 위탁하는
              경우 (예: 데이터 서버 운영)
            </li>
          </ul>
        </section>

        <section className={cn("section")} id="6">
          <h2 className={cn("section-title")}>
            <span className={cn("number")}>6</span> 이용자의 권리 및 행사 방법
          </h2>
          <p className={cn("text")}>
            이용자는 언제든지 자신의 개인정보를 열람, 수정, 삭제 요청할 수
            있으며, 회원 탈퇴 시 개인정보가 즉시 삭제됩니다. 이용자는 다음
            방법을 통해 권리를 행사할 수 있습니다.
          </p>
          <ul>
            <li>서비스 내 개인정보 수정 기능 이용</li>
            <li>고객센터 문의를 통한 요청</li>
            <li>이메일을 통한 개인정보 삭제 요청 (ajh02060@naver.com)</li>
          </ul>
        </section>

        <section className={cn("section")} id="7">
          <h2 className={cn("section-title")}>
            <span className={cn("number")}>7</span> 개인정보 보호를 위한 조치
          </h2>
          <p className={cn("text")}>
            웨디는 이용자의 개인정보를 보호하기 위해 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <ul>
            <li>개인정보 접근 제한 및 관리</li>
            <li>데이터 암호화 및 보안 서버 운영</li>
            <li>주기적인 보안 점검 및 관리</li>
            <li>이용자 계정 보호를 위한 인증 절차 적용</li>
          </ul>
        </section>

        <section className={cn("section")} id="8">
          <h2 className={cn("section-title")}>
            <span className={cn("number")}>8</span> 개인정보 보호 책임자 및 문의
          </h2>
          <p className={cn("text")}>
            개인정보 보호와 관련된 문의사항은 아래의 연락처로 문의하실 수
            있습니다.
          </p>
          <ul>
            <li>개인정보 보호 책임자: 최예린</li>
            <li>이메일: ajh02060@naver.com</li>
            <li>연락처: 010-2094-3722</li>
          </ul>
        </section>

        <section className={cn("section")} id="9">
          <h2 className={cn("section-title")}>
            <span className={cn("number")}>9</span> 개인정보처리방침 변경
          </h2>
          <p className={cn("text")}>
            본 개인정보처리방침은 법령 개정 또는 서비스 정책 변경에 따라 개정될
            수 있으며, 개정 시 공지사항을 통해 안내드립니다.
          </p>
        </section>

        <nav className={cn("sidebar")}>
          <ul className={cn("sidebar-list")}>
            <li>
              <Link
                href="#1"
                onClick={(e) => handleScroll(e, "1")}
                className={cn(Number(number) === 1 && "on")}
              >
                1. 총칙
              </Link>
            </li>
            <li>
              <Link
                href="#2"
                onClick={(e) => handleScroll(e, "2")}
                className={cn(Number(number) === 2 && "on")}
              >
                2. 개인정보의 수집 항목 및 방법
              </Link>
            </li>
            <li>
              <Link
                href="#3"
                onClick={(e) => handleScroll(e, "3")}
                className={cn(Number(number) === 3 && "on")}
              >
                3. 개인정보의 이용 목적
              </Link>
            </li>
            <li>
              <Link
                href="#4"
                onClick={(e) => handleScroll(e, "4")}
                className={cn(Number(number) === 4 && "on")}
              >
                4. 개인정보의 보관 및 파기
              </Link>
            </li>
            <li>
              <Link
                href="#5"
                onClick={(e) => handleScroll(e, "5")}
                className={cn(Number(number) === 5 && "on")}
              >
                5. 개인정보 제공 및 위탁
              </Link>
            </li>
            <li>
              <Link
                href="#6"
                onClick={(e) => handleScroll(e, "6")}
                className={cn(Number(number) === 6 && "on")}
              >
                6. 이용자의 권리 및 행사 방법
              </Link>
            </li>
            <li>
              <Link
                href="#7"
                onClick={(e) => handleScroll(e, "7")}
                className={cn(Number(number) === 7 && "on")}
              >
                7. 개인정보 보호를 위한 조치
              </Link>
            </li>
            <li>
              <Link
                href="#8"
                onClick={(e) => handleScroll(e, "8")}
                className={cn(Number(number) === 8 && "on")}
              >
                8. 개인정보 보호 책임자 및 문의
              </Link>
            </li>
            <li>
              <Link
                href="#9"
                onClick={(e) => handleScroll(e, "9")}
                className={cn(Number(number) === 9 && "on")}
              >
                9. 개인정보처리방침 변경
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
}
