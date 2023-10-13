import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../helpers/redux/userSlide";
import { RootState } from "../helpers/redux/store";
import { User } from "../helpers/redux/types";
import { AppDispatch } from "../helpers/redux/store";

function TagsInput({ selectedTags, value, error }: any) {
  const [tags, setTags] = useState(value ? value : []);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState, User>((state) => state.user.users);
  React.useEffect(() => {
    dispatch(fetchUser());
    setTags(user.skills);
  }, []);

  useEffect(() => {
    if (value) {
      setTags(value);
      selectedTags([...value]);
    }
  }, [value]);

  const addTags = (e: any) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();
      setTags([...tags, e.target.value]);
      selectedTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };
  const removeTags = (index: any) => {
    setTags([...tags.filter((tag: string) => tags.indexOf(tag) !== index)]);
  };
  return (
    <div
      className={`tags name p-3 form--input w-100 ${
        error && "is-invalid form-input shadow-none "
      }`}
    >
      {tags.map((tag: string, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <div
          key={index}
          className="tags__item d-inline-flex align-items-center px-3 py-1 mx-1"
        >
          <span>{tag}</span>
          <i
            className="fa-solid fa-xmark ms-1  tags__item--close"
            aria-hidden="true"
            onClick={() => removeTags(index)}
          />
        </div>
      ))}
      <input
        type="text"
        className="tags--input border-0 m-2"
        onKeyUp={(e) => addTags(e)}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        placeholder="Type and press Enter ..."
      />
    </div>
  );
}

export default TagsInput;
