type ItemDetailsPanelFormInputProps = {
  disabled?: boolean;
  required?: boolean;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[] | undefined;
  onChange(value: string | number | readonly string[]): any;
};

export function ItemDetailsPanelFormInput(
  props: ItemDetailsPanelFormInputProps
) {
  return (
    <input
      type={props.type}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className="w-full px-4 py-3 bg-transparent border border-[#666666] rounded-lg text-[#666666] focus:outline-none focus:border-[#7ea8d6] focus:ring-[#3b9bff] mb-3"
      required={props.required}
      disabled={props.disabled}
    />
  );
}
