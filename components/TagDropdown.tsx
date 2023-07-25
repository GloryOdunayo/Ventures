import React, { useEffect, useState } from "react";

function TagDropdown({ selectedTag, value, error, data }: any) {
    const [tag, setTag] = useState(value ? value : []);

    useEffect(() => {
        if (value) {
        setTag(value);
        selectedTag([...value]);
        }
    }, [value]);

    const addTags = (e: any) => {
        // if (e.key === "Enter" && e.target.value !== "") {
        e.preventDefault();
        setTag([...tag, e.target.value]);
        selectedTag([...tag, e.target.value]);
        e.target.value = "";
        // }
    };
    const removeTags = (index: any) => {
        setTag([...tag.filter((items: string) => tag.indexOf(items) !== index)]);
    };
    return (
        <div
        className={`tags name p-2 my-1 form--input w-100 ${
            error && "is-invalid form-input shadow-none "
        }`}
        >
        {tag.map((items: string, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div
            key={index}
            className="tags__item d-inline-flex align-items-center ps-2 pe-4 py-1 mx-1 my-1 "
            >
            <span>{items}</span>
            <i
                className="fa-solid fa-xmark ms-1  tags__item--close"
                aria-hidden="true"
                onClick={() => removeTags(index)}
            />
            </div>
        ))}

        <select
            className="tags--input border-0 w-100 ps-2 pe-4  py-2"
            name="plan"
            id="plan"
            onChange={(e) => addTags(e)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        >
            <option value="choose..." disabled selected hidden>
            Select multiple...
            </option>
            {data?.map((item: any, index: number) => (
            <option
                value={item}
                selected
                key={index}
                disabled={
                (tag?.includes(item) ||
                    (selectedTag.includes && selectedTag?.includes(item))) &&
                true
                }
            >
                {item}
            </option>
            ))}
        </select>
        </div>
    );
    }

export default TagDropdown;