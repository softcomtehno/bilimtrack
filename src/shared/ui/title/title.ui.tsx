type TitleProps = {
  title: string;
  description?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Тип для компонента иконки
};

export function Title({ title, description, Icon }: TitleProps) {
  return (
    <div className="flex flex-col gap-2 mt-2 mb-2">
      <div className="flex items-center gap-1">
        {Icon && <Icon size={20}  />}
        <h4 className="font-bold text-large text-black/80 ">{title}</h4>
      </div>
      {description && <p className="text-default-500">{description}</p>}
    </div>
  );
}
