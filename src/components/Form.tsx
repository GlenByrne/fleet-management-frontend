import { createElement, ReactNode } from 'react';
import { useForm } from 'react-hook-form';

type FormProps = {
  onSubmit: () => void;
  children: ReactNode;
};

function Form({ onSubmit, children }: FormProps) {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) =>
            child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child
          )
        : children}
    </form>
  );
}

export default Form;
