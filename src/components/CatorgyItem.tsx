import classNames from "classnames";

export default function CatorgyItem({
  value,
  name,
  defaultChecked = false,
  onChange
}: {
  value: string;
  name: string,
  defaultChecked?: boolean;
  onChange?: (value: string) => void;
}) {

  return (
    <label className="cursor-pointer flex flex-1 justify-stretch items-center">
      <input
        type="radio"
        className="peer hidden"
        name="time-tab"
        value={value}
        defaultChecked={defaultChecked}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
      <div
        className={classNames(
          "text-center w-full h-full flex items-center justify-center text-[#666666] rounded-[8px] text-[16px] font-semibold transition-all duration-300 ",
          "peer-checked:text-[#000000] peer-checked:bg-[#C8FF00]",
          defaultChecked && "text-[#000000] bg-[#C8FF00]",
          "hover:bg-[#C8FF00] hover:text-[#000000]"
        )}
      >
        {name}
      </div>
    </label>
  );
}