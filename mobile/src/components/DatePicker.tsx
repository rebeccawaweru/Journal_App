import DateTimePickerModal from "react-native-modal-datetime-picker";
interface DateProps {
    isDatePickerVisible:boolean,
    handleConfirm: (date:Date) => void
    hideDatePicker: () => void
}
export default function DatePicker(props:DateProps){
    const {isDatePickerVisible,handleConfirm,hideDatePicker} = props
    return <DateTimePickerModal
    isVisible={isDatePickerVisible}
    mode="date"
    onConfirm={handleConfirm}
    onCancel={hideDatePicker}
    textColor="black"
  />
}