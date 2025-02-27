import profileImg from "@/../public/images/testImg.jpg";
import DashBoard from "@/components/domains/WorkSpace/DashBoard";
import DashBoardMore from "@/components/domains/WorkSpace/DashBoardMore";
import SideMenu from "@/components/domains/WorkSpace/SideMenu";
import SpaceSearch from "@/components/domains/WorkSpace/SpaceSearch";
import CheckListPage from "@/components/modals/CheckListPage";
import { getCard, getItem, getMember, moveSmallCard } from "@/lib/apis/workSpace";

import useLoginData from "@/lib/store/loginData";
import useColorStore from "@/lib/store/mainColor";
import useSideMenuStore from "@/lib/store/sideMenu";
import useSideMenuValStore from "@/lib/store/sideMenuValue";
import { useWorkSpaceStore } from "@/lib/store/workSpaceData";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./style.module.scss";
import { SmallCatItem } from "@/lib/apis/types/types";

const cn = classNames.bind(styles);

export default function WorkSpace() {
  const [card, setCard] = useState<any>([]);
  const [cardId, setCardId] = useState<number>(1);
  const [cardLength, setCardLength] = useState<number>(0);
  const { sideMenuState } = useSideMenuStore();
  const { sideMenuValue, setSideMenuValue } = useSideMenuValStore();
  const { data: loginData } = useLoginData();
  const { color } = useColorStore();
  const { checklistId, selectedItem, setSelectedItem } = useWorkSpaceStore();

  const { data: cardDatas, isSuccess } = useQuery({
    queryKey: ["cardData", cardId, cardLength],
    queryFn: () => getCard(cardId),
  });

  const { data: memberData } = useQuery({
    queryKey: ["memberData", cardId],
    queryFn: () => getMember(cardId),
  });



  const handleOpenModal = (item: SmallCatItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
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

  // useEffect(() => {
  //   if (loginData) {
  //     router.push("/login");
  //   }

  //   // setCardId(loginData?.id);
  // }, [loginData]);

  console.log(card);

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

    console.log(postMoveCard);

    setCard(dragCardList);
    moveCard(postMoveCard);
  };
  return (
    <div className={cn("workSide")}>
      <span className={cn("sideMenuBox", { active: sideMenuState })}></span>
      <main className={cn("workSpaceWrap")}>
        <div className={cn("profile")}>
          <Image
            src={
              loginData?.profileImageUrl !== null
                ? loginData?.profileImageUrl
                : profileImg
            }
            alt="프로필 사진"
            width={169}
            height={169}
          />
          <h2>
            {loginData?.name}님, 소중한 결혼식을 위해
            <br /> 웨디가 함께할께요.
          </h2>
          <div className={cn("dDay")}>
            <p>결혼식</p>
            <p className={cn("ddayNum")}>
              D - <span style={{ color: color }}>{memberData?.dDay}</span>
            </p>
          </div>
        </div>

        <SpaceSearch placeholder={"할 일을 검색해 주세요."} />

        <div className={cn("dashWrap")}>
          <DragDropContext onDragEnd={onDragEnd}>
            {card?.map((item: any, index: number) => (
              <DashBoard
                data={item}
                key={item.id}
                num={index}
                memberData={memberData}
                setCard={setCard}
                onOpenModal={handleOpenModal}
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
        />
      )}
    </div>
  );
}
