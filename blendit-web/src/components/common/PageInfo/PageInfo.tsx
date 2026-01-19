type PageInfoProps = {
  currentPage: number;
  totalPages: number;
  className?: string;
};

export default function PageInfo({ 
  currentPage, 
  totalPages,
  className 
}: PageInfoProps) {
  return (
    <div className={`flex gap-[6px] items-center ${className || ''}`}>
      <span className="font-medium text-[18px] leading-[24px] text-(--text-primary)">
        {currentPage}
      </span>
      <span className="font-normal text-[18px] leading-[24px] text-(--text-secondary)">
        /
      </span>
      <span className="font-normal text-[18px] leading-[24px] text-(--text-secondary)">
        {totalPages}
      </span>
    </div>
  );
}
