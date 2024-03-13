import clsx from "clsx"

const CustomButton = ({ children, className, ...attributes }: any) => {
  return (
    <button
      className={clsx(
        "bg-rprimary p-2 rounded-[4px] text-rbackground hover:bg-rbackground hover:text-rprimary hover:border hover:border-rprimary duration-300 ease-in-out",
        className,
      )}
      {...attributes}
    >
      {children}
    </button>
  )
}

export default CustomButton
