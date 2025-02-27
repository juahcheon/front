import styles from "./style.module.scss";
import classNames from "classnames/bind";

import fontBold from "@/../public/icons/font-bold.png"
import fontItalic from "@/../public/icons/font-italic.png"
import fontMiddle from "@/../public/icons/font-middleline.png"
import fontUnder from "@/../public/icons/font-underline.png"
import youtube from "@/../public/icons/youtube-icon.png"
import link from "@/../public/icons/link-icon.png"
import picture from "@/../public/icons/picture-icon.png"
import Image from "next/image";

const cn = classNames.bind(styles);

export default function TextEditor() {

  return (
    <div>
      <div className={cn("editorWrap")}>
        <button>
          <Image src={fontBold} alt="폰트 굵게" width={35} height={35} />
        </button>
        <button>
          <Image src={fontItalic} alt="폰트 기울기" width={35} height={35} />
        </button>
        <button>
          <Image src={fontMiddle} alt="폰트 중간줄" width={35} height={35} />
        </button>
        <button>
          <Image src={fontUnder} alt="폰트 밑줄" width={35} height={35} />
        </button>
        <button>
          <Image src={youtube} alt="유튜브 링크" width={35} height={35} />
        </button>
        <button>
          <Image src={link} alt="파일 첨부" width={35} height={35} />
        </button>
        <button>
          <Image src={picture} alt="사진 첨부" width={35} height={35} />
        </button>
      </div>
    </div>
  )
};