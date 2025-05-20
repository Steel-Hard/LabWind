interface OptionType {
    value: string;
    label: string;
  }

  import  {
    OptionProps,
 
  } from "react-select";
  
  
const CheckboxOption = (props: OptionProps<OptionType, true>) => {
    const {
      data,
      isSelected,
      innerRef,
      innerProps,
      isFocused
    } = props;
  
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          backgroundColor: isFocused ? '#f0f0f0' : 'white',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          style={{ marginRight: '8px' }}
        />
        <label>{data.label}</label>
      </div>
    );
  };

export {
    CheckboxOption
};
export type { OptionType };
