import { Field, Input } from "@chakra-ui/react";

const InputField = ({
  mt,
  required = false,
  label,
  type,
  name = type,
  value,
  children,
  ...rest
}) => {
  return (
    <Field.Root required={required} mt={mt}>
      <Field.Label>
        {label}
        {required ? <Field.RequiredIndicator /> : null}
      </Field.Label>

      {children ? (
        children
      ) : (
        <Input type={type} name={name} value={value} {...rest} />
      )}
    </Field.Root>
  );
};
export default InputField;
