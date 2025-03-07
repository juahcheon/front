import DashBoard from "@/components/domains/WorkSpace/DashBoard";
import DashBoardMore from "@/components/domains/WorkSpace/DashBoardMore";
import SideMenu from "@/components/domains/WorkSpace/SideMenu";
import SpaceSearch from "@/components/domains/WorkSpace/SpaceSearch";
import CheckListPage from "@/components/modals/CheckListPage";
import {
  getCard,
  getMember,
  moveSmallCard,
  postDday,
  postFile,
  saveProfile,
} from "@/lib/apis/workSpace";

import change from "@/../public/icons/pen.svg";
import MobileFilter from "@/components/commons/Filter/mobileFilter";
import SaveModal from "@/components/modals/SaveModal";
import { getMyData } from "@/lib/apis/authme";
import { getCheckList, postCheckListCreate } from "@/lib/apis/firstVisit";
import { SmallCatItem } from "@/lib/apis/types/types";
import useFilterStore from "@/lib/store/filter";
import useLoginData from "@/lib/store/loginData";
import useColorStore from "@/lib/store/mainColor";
import useSideMenuStore from "@/lib/store/sideMenu";
import useSideMenuValStore from "@/lib/store/sideMenuValue";
import { useWorkSpaceStore } from "@/lib/store/workSpaceData";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

interface IFormInput {
  newProfile: any;
}

export default function WorkSpace() {
  const [card, setCard] = useState<any>([]);
  const [dDay, setDDay] = useState<boolean>(false);
  const [day, setDay] = useState<string>("");
  const [cardId, setCardId] = useState<number>(0);
  const [cardLength, setCardLength] = useState<number>(0);
  const { sideMenuState } = useSideMenuStore();
  const { sideMenuValue, setSideMenuValue } = useSideMenuValStore();
  const { data: loginData } = useLoginData();
  const { color } = useColorStore();
  const { checklistId, selectedItem, setSelectedItem } = useWorkSpaceStore();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { filterBox } = useFilterStore();
  const [profile, setProfile] = useState<string>("");
  const [saveBtn, setSaveBtn] = useState<boolean>(false);

  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const dat = {
      profileImageUrl: profile,
    };
    console.log(123123);
    saveProfileImg({ id: loginData.id, dat });
    setSaveBtn(false);
  };

  // 유저 정보
  const { data } = useQuery({
    queryKey: ["getMyData"],
    queryFn: getMyData,
  });
  // 새로운 체크리스트 생성
  const handlePost = () => {
    if (data) {
      const dataBox: any = {
        memberId: data.id,
      };
      mutate(dataBox);
    }
  };

  // 체크리스트가 있는지 없는지 정보
  const { data: getCheck, isSuccess: checkError } = useQuery({
    queryKey: ["getMyData", data?.id],
    queryFn: () => getCheckList(data?.id),
    enabled: !!data?.id,
  });

  const { mutate } = useMutation({
    mutationFn: (data) => postCheckListCreate(data),
  });
  const { mutate: saveProfileImg } = useMutation({
    mutationFn: ({ id, dat }: { id: any; dat: any }) => saveProfile(id, dat),
  });
  const { mutate: postImgFile } = useMutation({
    mutationFn: (data: any) => postFile(data),
    onSuccess: (data) => {
      setProfile(data?.data);
    },
  });

  // 체크리스트 대분류들
  const { data: cardDatas, isSuccess } = useQuery({
    queryKey: ["cardData", cardId, cardLength],
    queryFn: () => getCard(cardId, filterBox.progressStatus),
    enabled: !dDay && cardId !== 0,
  });

  // dday와 체크리스트 정보
  const { data: memberData } = useQuery({
    queryKey: ["memberData", cardId, cardLength],
    queryFn: () => getMember(cardId),
    enabled: cardId !== 0,
  });

  // 체크리스트가 없으면 생성
  useEffect(() => {
    if (checkError) {
      handlePost();
      setCardLength((prev) => prev + 1);
    }
  }, [checkError]);
  useEffect(() => {
    setSaveBtn(false);
  }, []);

  useEffect(() => {
    if (data) {
      setCardId(data.id);
    }
  }, [data, getCheck]);

  useEffect(() => {
    setCardLength((prev) => prev + 1);
  }, [filterBox.progressStatus]);

  useEffect(() => {
    setProfile(loginData?.profileImageUrl);
  }, [loginData]);

  useEffect(() => {
    const newProfile = watch("newProfile");

    if (newProfile && newProfile[0]) {
      const formData = new FormData();
      formData.append("file", newProfile[0]); // 실제 파일 객체 추가

      console.log([...formData]); // 디버깅용: FormData 내용 확인

      postImgFile(formData); // FormData를 그대로 전송
      setSaveBtn(true);
    }
  }, [watch("newProfile")]);

  const handleOpenModal = (item: SmallCatItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleShowSaveModal = () => {
    setShowSaveModal(true);
  };

  const handleCloseSaveModal = () => {
    setShowSaveModal(false);
    setCardLength((prev) => prev + 1);
  };

  const handleItemDelete = () => {
    setCard((prev: any) => {
      return prev.map((cardItem: any) => ({
        ...cardItem,
        smallCatItems: cardItem.smallCatItems.filter(
          (item: any) => item.id !== selectedItem?.id
        ),
      }));
    });

    setSideMenuValue((prev: any) => {
      return prev.map((item: any) => ({
        ...item,
        smallCatItems: item.smallCatItems.filter(
          (smallItem: any) => smallItem.id !== selectedItem?.id
        ),
      }));
    });
  };

  useEffect(() => {
    setCard(cardDatas);
    setSideMenuValue(cardDatas);
  }, [isSuccess]);

  const { mutate: moveCard } = useMutation({
    mutationFn: (data) => moveSmallCard(data),
  });

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    console.log("이동한곳", destination, "이동전", source);

    if (!destination) return; // 드롭이 완료되지 않으면 아무것도 하지 않음

    const dragCardList = card.map((c: any) => ({
      ...c,
      smallCatItems: [...c.smallCatItems], // 내부 배열도 복사 (불변성 유지)
    }));

    // 올바른 index 찾기
    const sourceIndex = dragCardList.findIndex(
      (c: { id: number }) => c.id === Number(source.droppableId)
    );
    const destinationIndex = dragCardList.findIndex(
      (c: { id: number }) => c.id === Number(destination.droppableId)
    );

    if (sourceIndex === -1 || destinationIndex === -1) return; // 존재하지 않는 경우 리턴

    // smallCatItems 이동
    const [removedCard] = dragCardList[sourceIndex].smallCatItems.splice(
      source.index,
      1
    );
    dragCardList[destinationIndex].smallCatItems.splice(
      destination.index,
      0,
      removedCard
    );

    // 필터링된 리스트
    const filteredList = dragCardList.filter(
      (item: any) => item.id === Number(destination.droppableId)
    );

    if (!filteredList.length) return;

    // postMoveCard 생성
    let postMoveCard: any = {
      checklistId: filteredList[0]?.checklistId,
      largeCatItemId: filteredList[0]?.id,
      smallCatItemIds: filteredList[0]?.smallCatItems.map(
        (item: any) => item.id
      ),
    };

    setCard(dragCardList);
    moveCard(postMoveCard);
  };
  const { mutate: postDay } = useMutation({
    mutationFn: (data) => postDday(data),
    onSuccess: (data) => {
      console.log(data);
      // setCardLength((prev) => prev + 1);
      // 수정 필요
      location.reload();
    },
  });

  const handleChangeDday = () => {
    setDDay(false);
    let dayBox: any = { memberId: memberData.memberId, dDay: day };
    postDay(dayBox);
  };
  return (
    <div className={cn("workSide")}>
      <span className={cn("sideMenuBox", { active: sideMenuState })}></span>
      <main className={cn("workSpaceWrap")}>
        <div className={cn("profile")}>
          <div className={cn("profileImg")}>
            <Image src={profile} alt="프로필 사진" width={169} height={169} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={cn("profileChange")}
              // style={{ display: saveBtn ? "block" : "none" }}
            >
              <input
                type="file"
                id="profileChange"
                accept="image/*"
                {...register("newProfile")}
              />
              {!saveBtn && <label htmlFor="profileChange">변경하기</label>}
              {saveBtn && <button type="submit">저장하기</button>}
            </form>
          </div>
          <h2>
            {loginData?.name}님, 소중한 결혼식을 위해
            <br /> 웨디가 함께할께요.
          </h2>
          <div className={cn("dDay")}>
            <p>
              결혼식
              {dDay ? (
                <span onClick={handleChangeDday}>
                  <Image src={change} alt="수정완료" width={20} height={20} />
                  변경
                </span>
              ) : (
                <span onClick={() => setDDay(true)}>
                  <Image src={change} alt="수정하기" width={20} height={20} />
                </span>
              )}
            </p>
            <p className={cn("ddayNum")}>
              D-{" "}
              {dDay ? (
                <input
                  style={{ color: color }}
                  type="date"
                  className={cn("dDayChange")}
                  onChange={(e) => setDay(e.target.value)}
                />
              ) : (
                <span style={{ color: color, cursor: "auto" }}>
                  {memberData?.dDay != null ? memberData?.dDay : "?"}
                </span>
              )}
            </p>
          </div>
        </div>

        <SpaceSearch placeholder={"플랜을 검색해주세요."} />

        <MobileFilter />

        <div className={cn("dashWrap")}>
          <DragDropContext onDragEnd={onDragEnd}>
            {card
              ?.filter((item: any) =>
                filterBox.category.length === 0
                  ? true
                  : filterBox.category.includes(item.title)
              )
              .map((item: any, index: number) => (
                <DashBoard
                  data={item}
                  key={item.id}
                  num={index}
                  memberData={memberData}
                  setCard={setCard}
                  onOpenModal={handleOpenModal}
                  setCardLength={setCardLength}
                />
              ))}
            <DashBoardMore
              memberData={memberData}
              setCardLength={setCardLength}
            />
          </DragDropContext>
        </div>
      </main>

      <SideMenu state={sideMenuState} />

      {selectedItem && (
        <CheckListPage
          onClose={handleCloseModal}
          item={{ ...selectedItem, checklistId }}
          ids={{
            checklistId: checklistId || 0,
            largeCatItemId: selectedItem?.largeCatItemId || 0,
            smallCatItemId: selectedItem?.id || 0,
          }}
          onDeleteSuccess={handleItemDelete}
          onShowSaveModal={handleShowSaveModal}
        />
      )}

      {showSaveModal && (
        <SaveModal onClose={handleCloseSaveModal} statusName={""} />
      )}
    </div>
  );
}
