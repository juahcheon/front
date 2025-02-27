import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { useWorkSpaceStore } from '@/lib/store/workSpaceData'
import { useRouter } from "next/router";
import { useEffect } from "react";
import useLoginData from "@/lib/store/loginData";
import { getMyData } from "@/lib/apis/authme";
import { useQuery } from "@tanstack/react-query";

const cn = classNames.bind(styles);

export default function Home() {
  const router = useRouter();
  const { data: loginData, setData } = useLoginData();
  const setChecklistId = useWorkSpaceStore((state) => state.setChecklistId);

  useEffect(() => {
    // Clear any lingering login data if logged out
    const isLoggedOut = localStorage.getItem('isLoggedOut') === 'true';
    if (isLoggedOut) {
      setData(null);
    }
  }, [setData]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getMyData"],
    queryFn: getMyData,
  });

  const handleWorkSpaceClick = (checklistId: number) => {

    const isLoggedOut = localStorage.getItem('isLoggedOut') === 'true';
    if (isLoggedOut) {
      router.push("/logIn");
      return;
    }
  
    if (isSuccess) {
      console.log('Navigating to workspace');
      setChecklistId(checklistId);
      router.push('/workSpace');
    } else if (!isSuccess) {
      console.log('Navigating to login');
      router.push('/logIn');
    }
  };

  return (
    <div>
      <div className={cn("indexWrap")}>
        <div className={cn("indexBKG")}>
          <h1 className={cn("indexTitle")}>
            결혼의 모든 것
            <br /> 웨디에서 쉽고 간편하게
          </h1>
        </div>
        <div className={cn("checkList")}>
          <button type="submit" className={cn("indexBtn")} onClick={() => handleWorkSpaceClick(1)}>
            체크리스트 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
