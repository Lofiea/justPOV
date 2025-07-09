
export default function CustomButton({ label, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{label}</Text>
        </TouchableOpacity>
    );
}