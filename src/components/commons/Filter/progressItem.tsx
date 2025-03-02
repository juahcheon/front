export default function ProgressItem({ item, func, selectedStatus }: any) {
  return (
    <div>
      <input
        type="checkbox"
        id={item}
        name="progressStatus"
        value={item}
        checked={selectedStatus === item} // 선택된 값과 같으면 체크
        onChange={() => func(item)}
      />
      <label htmlFor={item}>{item}</label>
    </div>
  );
}
