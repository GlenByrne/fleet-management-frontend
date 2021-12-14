type InputLabelProps = {
  label: string;
  htmlFor: string;
};

const InputLabel = ({ label, htmlFor }: InputLabelProps) => {
  return (
    <label
      className="block text-sm font-medium text-gray-700"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
};

export default InputLabel;
