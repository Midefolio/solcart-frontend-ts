import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import {
  getCategory,
  getSubCategory,
  getSubCatTypes,
} from "../../../data/category";

const height = 35;

const SelectCategory = ({ Item, setItem }: any) => {
  const { currentUser } = useUserAuthContext();
  const category = getCategory();
  const [subCat, setSubCat] = useState(getSubCategory(Item?.main_category));
  const [subCatType, setsubCatType] = useState<any>(
    getSubCatTypes(Item.main_category, Item.sub_category)
  );

  // Options for the condition
  const conditionOptions = [
    { value: "New", label: "New" },
    { value: "Fairly Used", label: "Fairly Used" },
  ];

  useEffect(() => {
    const suBcat = getSubCategory(Item?.main_category);
    setSubCat(suBcat);
  }, [Item]);

  useEffect(() => {
    const types = getSubCatTypes(Item.main_category, Item.sub_category);
    setsubCatType(types);
  }, [Item]);

  const MenuList = (props: any) => {
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;
    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        width={`100%`}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }: any) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };

  return (
    <>
      <div className="my-mother down-5">
        <span className="px13 xs-px12">
          Category <sup className="red">*</sup>
        </span>
        <div className="my-mother down-1 xs-down-1">
          <Select
            name="basic-select"
            value={{ value: Item?.main_category, label: Item?.main_category }}
            onChange={(e: any) => {
              setItem((prev: any) => ({ ...prev, main_category: e.value }));
              setItem((prev: any) => ({ ...prev, sub_category: "" }));
              setItem((prev: any) => ({ ...prev, under_sub_category: "" }));
              Item.main_category = e.value;
              Item.sub_category = "";
              Item.under_sub_category = "";
              localStorage.setItem(
                `${currentUser?.user_id}`,
                JSON.stringify(Item)
              );
              const suBcat = getSubCategory(e.value);
              setSubCat(suBcat);
            }}
            options={category}
            className="basic-select"
            classNamePrefix="select"
            components={{ MenuList }}
          />
        </div>
      </div>

      {subCat && (
        <div className="my-mother down-5 xs-down-2">
          <span className="px13 xs-px12">
            {Item?.main_category} type<sup className="red">*</sup>
          </span>
          <div className="my-mother xs-down-1 down-1">
            <Select
              name="basic-select"
              value={{ value: Item?.sub_category, label: Item?.sub_category }}
              onChange={(e: any) => {
                setItem((prev: any) => ({ ...prev, sub_category: e.value }));
                Item.sub_category = e.value;
                localStorage.setItem(
                  `${currentUser?.user_id}`,
                  JSON.stringify(Item)
                );
                const Types = getSubCatTypes(Item.main_category, e.value);
                setsubCatType(Types);
              }}
              options={subCat}
              className="basic-select"
              classNamePrefix="select"
              components={{ MenuList }}
            />
          </div>
        </div>
      )}

      {subCatType && (
        <div className="my-mother down-5 xs-down-2">
          <span className="px13 xs-px12 ">
            {Item?.sub_category} type<sup className="red">*</sup>
          </span>
          <div className="my-mother xs-down-1 down-1">
            <Select
              name="basic-select"
              value={{
                value: Item?.under_sub_category,
                label: Item?.under_sub_category,
              }}
              onChange={(e: any) => {
                setItem((prev: any) => ({
                  ...prev,
                  under_sub_category: e.value,
                }));
                Item.under_sub_category = e.value;
                localStorage.setItem(
                  `${currentUser?.user_id}`,
                  JSON.stringify(Item)
                );
              }}
              options={subCatType}
              className="basic-select"
              classNamePrefix="select"
              components={{ MenuList }}
            />
          </div>
        </div>
      )}

      {/* New Select field for Item condition */}
      <div className="my-mother down-5 xs-down-2">
        <span className="px13 xs-px12">
          Item Condition <sup className="red">*</sup>
        </span>
        <div className="my-mother xs-down-1 down-1">
          <Select
            name="condition-select"
            value={{
              value: Item?.condition,
              label: Item?.condition,
            }}
            onChange={(e: any) => {
              setItem((prev: any) => ({
                ...prev,
                condition: e.value,
              }));
              Item.condition = e.value;
              localStorage.setItem(
                `${currentUser?.user_id}`,
                JSON.stringify(Item)
              );
            }}
            options={conditionOptions}
            className="basic-select"
            classNamePrefix="select"
            components={{ MenuList }}
          />
        </div>
      </div>
    </>
  );
};

export default SelectCategory;
