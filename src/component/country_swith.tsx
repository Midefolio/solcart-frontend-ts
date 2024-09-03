import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import useUtilsContext from "../hook/useUtilsContext";

interface Props {
  SwithCountry: (value: boolean) => void;
}

const SwithCountry = ({ SwithCountry }: Props) => {
  const code: any = countryList().getData();
  const { country, setCountry } = useUtilsContext();
  const height = 35;

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

  const selectCountry = (e: any): void => {
    setCountry((prev: any) => ({ ...prev, value: e.value, label: e.label }));
  };

  return (
    <>
      <div
        className="my-modal bg-blur z-highers"
        onClick={() => {
          SwithCountry(false);
        }}
      >
        <div className="my-col-4 off-4 down-10 xs-down-10vh rad-10 xs-10 xs-off-1 my-bottom-20 bg-white">
          <div className="my-container down-5 xs-10 xs-off-1 xs-down-5">
            <div className="px13 ubuntuBold">Change Location</div>
            <div className="my-mother xs-down-3 down-1">
              <Select
                name="basic-select"
                value={country}
                onChange={selectCountry}
                options={code}
                className="basic-select"
                classNamePrefix="select"
                components={{ MenuList }}
              />
            </div>
            <div className="my-mother down-4 xs-down-5">
              <span className="country-flag ">
                <ReactCountryFlag countryCode={country?.value} svg />
              </span>
              <span className="mg-10 px13 ubuntuBold">{country?.label}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwithCountry;
