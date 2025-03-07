import ScrollArrow from "@/components/commons/ScrollArrow";
import { getMyData } from "@/lib/apis/authme";
import useLoginData from "@/lib/store/loginData";
import { useWorkSpaceStore } from "@/lib/store/workSpaceData";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

import main1 from "@/../public/images/main1.png";
import main2 from "@/../public/images/main2.png";
import Footer from "@/components/commons/Footer";

const cn = classNames.bind(styles);

export default function Home() {
  const router = useRouter();
  const { data: loginData, setData } = useLoginData();
  const setChecklistId = useWorkSpaceStore((state) => state.setChecklistId);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 4;
  const containerRef = useRef(null);
  const [overlayElement, setOverlayElement] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";
    if (isLoggedOut) {
      setData(null);
    }
  }, [setData]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getMyData"],
    queryFn: getMyData,
  });

  const handleWorkSpaceClick = (checklistId: number) => {
    const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";
    if (isLoggedOut) {
      router.push("/logIn");
      return;
    }

    if (isSuccess) {
      console.log("Navigating to workspace");
      setChecklistId(checklistId);
      router.push("/workSpace");
    } else if (!isSuccess) {
      console.log("Navigating to login");
      router.push("/logIn");
    }
  };

  const handleGNBVisibility = (show: boolean) => {
    if (show) {
      document.documentElement.style.setProperty(
        "--gnb-transform",
        "translateY(0)"
      );
      document.documentElement.style.setProperty("--gnb-opacity", "1");
    } else {
      document.documentElement.style.setProperty(
        "--gnb-transform",
        "translateY(-100%)"
      );
      document.documentElement.style.setProperty("--gnb-opacity", "0");
    }
  };

  useEffect(() => {
    handleGNBVisibility(currentPage === 0);
    return () => {
      handleGNBVisibility(true);
    };
  }, [currentPage]);

  const scrollToPage = (pageIndex: any) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
      window.scrollTo({
        top: pageIndex * window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const handleUpArrowClick = () => {
    scrollToPage(currentPage - 1);
  };

  const handleDownArrowClick = () => {
    scrollToPage(currentPage + 1);
  };

  useEffect(() => {
    const overlay = document.createElement("div");
    overlay.className = cn("backgroundOverlay");
    document.body.appendChild(overlay);
    setOverlayElement(overlay);

    return () => {
      if (overlay && document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    };
  }, []);

  useEffect(() => {
    if (!overlayElement) return; // 오버레이 요소가 없으면 실행 중단

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // 현재 스크롤 위치가 어느 페이지 구간에 있는지 계산
      const rawPageIndex = scrollPosition / windowHeight;
      const currentPageIndex = Math.floor(rawPageIndex);
      const nextPageIndex = currentPageIndex + 1;

      // 현재 페이지 내에서의 스크롤 진행도 (0~1)
      const scrollProgress = rawPageIndex - currentPageIndex;

      // 페이지 인덱스 업데이트 (반올림)
      const roundedPageIndex = Math.round(rawPageIndex);
      if (roundedPageIndex !== currentPage) {
        setCurrentPage(roundedPageIndex);
        handleGNBVisibility(roundedPageIndex === 0);
      }
    };

    // 초기 실행 - 페이지 로드 시 배경색 설정
    handleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 또는 의존성 변경 시 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages, overlayElement]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleUpArrowClick();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleDownArrowClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  return (
    <div className={cn("pageContainer")} ref={containerRef}>


      {/* Page 1 */}
      <div className={cn("indexWrap")}>
        <div className={cn("indexBKG")}>
          <h1 className={cn("indexTitle")}>
            나만의 웨딩 버디
            <br /> 쉽고 편하게 시작하세요
          </h1>
        </div>
        <div className={cn("checkList")}>
          <button
            type="submit"
            className={cn("indexBtn")}
            onClick={() => {
              handleWorkSpaceClick(1);
            }}
          >
            체크리스트 만들기
          </button>
        </div>
      </div>

      {/* Page 2 */}
      <div className={cn("page")} id="2">
        <div className={cn("secondPageContent")}>
          <div className={cn("secondPageSentence")}>
            <p className={cn("miniTitle")}>체크리스트</p>
            <h2>
              결혼준비 올인원
              <br />
              템플릿으로 똑똑하게
            </h2>
            <p>
              결혼 준비에 필요한 주요 항목이 담긴 기본 템플릿으로 바로
              시작하세요. 원하는 대로 항목을 추가, 삭제, 수정할 수 있어 더욱
              편리합니다.
            </p>
          </div>
          <div className={cn("imgCover")}>
            <Image src={main1} alt="웨디 이미지" fill objectFit="contain" />
          </div>
        </div>
      </div>

      {/* Page 3 */}
      <div className={cn("page")}>
        <div className={cn("thirdPageContent")}>
          <div className={cn("imgCover")}>
            <Image src={main2} alt="웨디 이미지" fill objectFit="contain" />
          </div>
          <div className={cn("thirdPageSentence")}>
            <p className={cn("miniTitle")}>대시보드</p>
            <h2>
              진행 상황 확인도,
              <br />
              예산 관리도 한번에
            </h2>
            <p>
              상태별 필터링을 통해 진행 상황을 한눈에 확인하세요. 메모와 기한
              설정까지 모든 정보를 한곳에서 편리하게 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {currentPage === 0 && (
        <ScrollArrow
          direction="down"
          onClick={handleDownArrowClick}
          className={cn("downArrow")}
        />
      )}
      <Footer />
    </div>
  );
}
