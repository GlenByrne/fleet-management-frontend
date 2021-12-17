type SuccessButtonProps = {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
};

const SuccessButton = ({ text, type }: SuccessButtonProps) => {
  return (
    <button
      type={type}
      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      {text}
    </button>
  );
};

export default SuccessButton;
