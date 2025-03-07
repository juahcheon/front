import searchImg from "@/../public/icons/searchImg.svg";
import searchImg2 from "@/../public/icons/searchImg2.svg";
import useWorkSpaceStore from "@/lib/store/workSpace";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

interface IFormInput {
  searchWord: string;
}

interface searchProps {
  placeholder: string;
}

export default function SpaceSearch({ placeholder }: searchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { searchWord, setSearchWord } = useWorkSpaceStore();
  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  useEffect(() => {
    setSearchWord(watch("searchWord"));
  }, [watch("searchWord")]);

  return (
    <form className={cn("searchInput")} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="search">
        <button type="submit">
          {isFocused ? (
            <Image src={searchImg2} alt="검색버튼" width={26} height={26} />
          ) : (
            <Image src={searchImg} alt="검색버튼" width={26} height={26} />
          )}
        </button>
      </label>
      <input
        placeholder={placeholder}
        id="search"
        {...register("searchWord")}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </form>
  );
}
