type IconContainerType = {
  href: string;
};

const IconContainer = ({ href }: IconContainerType) => {
  return (
    <>
      <div className="border-[0.5px] border-gray-300 w-fit h-fit rounded-xl">
        <img src={href} width={"150rem"} loading="lazy" />
      </div>
    </>
  );
};

export default IconContainer;
