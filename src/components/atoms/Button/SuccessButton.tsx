type SuccessButtonProps = {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
};

function SuccessButton({ text, type }: SuccessButtonProps) {
  return (
    <button
      type={type}
      className="inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
    >
      {text}
    </button>
  );
}

export default SuccessButton;
