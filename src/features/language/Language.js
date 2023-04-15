import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languageData } from "./data";
import { startApp, updateSelectedLanguage } from "./LanguageSlice";

const Language = () => {
  const selectedLanguage = useSelector(
    (state) => state?.language?.selectedLanguage || {}
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startApp());
  }, []);

  const handleLanguageSelection = (item) => {
    dispatch(updateSelectedLanguage(item));
  };

  return (
    <div className="App">
      {languageData.map((item, index) => {
        return (
          <p onClick={() => handleLanguageSelection(item)} key={item?.id}>
            {item?.language}
          </p>
        );
      })}
      <h1>{selectedLanguage?.data}</h1>
    </div>
  );
};

export default Language;
