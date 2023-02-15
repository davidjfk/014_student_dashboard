//source: https://www.robinwieruch.de/react-checkbox/
export const Checkbox = ({ label, value, onChange }) => {
    return (
        <>
            <input type="checkbox" name="students" value={value} checked={value} onChange={onChange} />
            <label htmlFor="student1">   
                {label}
            </label>
        </>
    );
};
  