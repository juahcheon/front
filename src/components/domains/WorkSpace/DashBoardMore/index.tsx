import more from "@/../public/icons/moreCard.svg";
import { postCard } from "@/lib/apis/workSpace";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

interface DashBoardProps {
  memberData: any;
  setCardLength: any;
}

interface IFormInput {
  title: string;
}

export default function DashBoardMore({
  memberData,
  setCardLength,
}: DashBoardProps) {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    moreCard(data.title);
  };

  const { mutate: moreCard } = useMutation({
    mutationFn: (data: string) => postCard(memberData.memberId, data),
    onSuccess: () => setCardLength((prev: number) => prev + 1),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("form")}>
      <div className={cn("dashWrap")}>
        <button type="submit">카테고리 추가</button>
        <Image src={more} alt="더보기" width={28} height={28} />
        {/* <input type="text" {...register("title")} /> */}
      </div>
    </form>
  );
}
