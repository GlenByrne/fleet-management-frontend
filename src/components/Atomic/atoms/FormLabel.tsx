type FormLabelProps = {
  label: String;
};

const FormLabel = ({ label }: FormLabelProps) => {
  return (
    <label className="block text-sm font-medium text-gray-700">{label}</label>
  );
};

export default FormLabel;
