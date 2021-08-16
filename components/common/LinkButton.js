import Link from "next/link";

const LinkButton = ({style, href=null, text, onClick=()=>{}}) => {
  return (
    <button className={style} onClick={()=>onClick()}>
        {href ? <Link href={href}>{text}</Link> : text}
  </button>
  )
};

export default LinkButton;