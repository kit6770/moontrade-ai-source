import classNames from "classnames";

export default function TabSetItem({
  value,
  name,
  icon,
  defaultChecked = false,
  onChange,
}: {
  value: string;
  name: string;
  icon?: React.JSX.Element;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="cursor-pointer flex justify-stretch items-center">
      <input
        type="radio"
        className=" hidden"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <div
        className={classNames(
          "rounded-[6px] px-[20px] py-[4px]",
          // 'peer-checked:text-[#000000] peer-checked:bg-[#C8FF00]',
          defaultChecked ? "text-[#000000] bg-[#C8FF00]" : "bg-[#F9F9F9]",
          "hover:bg-[#C8FF00] hover:text-[#000000]"
        )}
      >
        {icon}
      </div>
    </label>
  );
}