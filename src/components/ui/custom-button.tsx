import clsx from "clsx"

const CustomButton = ({ children, className, ...attributes }: any) => {
  return (
    <button
      className={clsx(
        "bg-mainPrimary p-2 rounded-[8px] text-white hover:bg-mainSecondary duration-300 ease-in-out",
        className,
      )}
      {...attributes}
    >
      {children}
    </button>
  )
}

export default CustomButton
