import Iconformat from "@Components/feedback/IconFormat/Iconformat"
import { TIconTypes } from "@types"
import { Form } from "react-bootstrap"
import { Path, FieldValues, UseFormRegister } from "react-hook-form"


type InputProps<TFieldValue extends FieldValues> = {
  iconName: keyof typeof TIconTypes,
  title: string,
  type?: string;
  name: Path<TFieldValue>;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
}

const Input = <TFieldValue extends FieldValues>({ iconName, title, type, name, register, error, onBlur, formText,
  success, disabled
}: InputProps<TFieldValue>) => {
  const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className='mb-3'>
      <Form.Label><Iconformat icon={iconName} />
        {title}</Form.Label>
      <Form.Control type={type} 
         {...register(name)}
         onBlur={onblurHandler}
         isInvalid={error ? true : false}
         isValid={success ? true : false}
         disabled={disabled}
      
      />
      <Form.Control.Feedback type="invalid" style={{fontSize:"12px",textTransform:"lowercase"}}>{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid" style={{fontSize:"12px",textTransform:"lowercase"}}>{success}</Form.Control.Feedback>
      {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  )
}

export default Input
