import classNames from "classnames/bind";
import styles from "@/pages/style.module.scss"

const cn = classNames.bind(styles);

interface ScrollArrowProps {
  direction: 'up' | 'down';
  onClick: () => void;
  className?: string;
}

const ScrollArrow = ({ direction, onClick, className }: ScrollArrowProps) => {
  return (
    <div 
      className={cn("scrollArrow", direction === "up" ? "upArrow" : "downArrow", className)} 
      onClick={onClick}
    >
      {direction === "up" ? (
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 18L12 2L22 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L12 18L22 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
};

export default ScrollArrow;