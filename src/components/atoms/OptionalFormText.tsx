type OptionalFormTextProps = {
  required: boolean;
};

function OptionalFormText({ required }: OptionalFormTextProps) {
  return (
    <span className="text-sm text-gray-500" id="email-optional">
      {required ? '' : 'Optional'}
    </span>
  );
}

export default OptionalFormText;
