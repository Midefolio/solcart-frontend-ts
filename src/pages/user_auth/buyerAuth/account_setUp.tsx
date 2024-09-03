import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useUtilsContext from "../../../hook/useUtilsContext";
import countryList from "react-select-country-list";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import { State, City } from "country-state-city";
import ReactPasswordChecklist from "react-password-checklist";
import AutoSlider from "../../../component/auto_slider";
import useUtils from "../../../utils/useutils";
import useApi from "../../../hook/useApi";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import { useNavigate } from "react-router-dom";

const AccountSetUp = () => {
  const { newUser, setCountry, country, setNewUser, BASE_URL } =
    useUtilsContext();
  const { isSending, notifyError, notifySuccess } = useUtils();
  const { dispatch } = useUserAuthContext();
  const { makeRequest } = useApi();
  const [password, setPassword] = useState("");
  const [isoCode, setIsoCode] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [see, setSee] = useState(false);
  const code: any = countryList().getData();
  const set_up_api = BASE_URL + "userAuth/setup-account";
  const Navigate = useNavigate();

  const getStates = async () => {
    let stateArr: any = [];
    const states = State.getStatesOfCountry(country?.value);
    states.map((i) => {
      stateArr.push({ label: i.name, value: i.isoCode });
    });
    setStates(stateArr);
  };

  const getCities = async () => {
    let cityArr: any = [];
    const cities = City.getCitiesOfState(country?.value, `${isoCode}`);
    cities.map((i) => {
      cityArr.push({ label: i.name, value: i.name });
    });
    setCities(cityArr);
  };

  useEffect(() => {
    getStates();
  }, [country?.value]);

  useEffect(() => {
    getCities();
  }, [isoCode]);

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
    setNewUser((prev: any) => ({ ...prev, country: e.value }));
  };

  const selectState = (e: any): void => {
    setIsoCode(e.value);
    setCities([]); // Re-initialize the cities array
    setNewUser((prev: any) => ({ ...prev, state: e.label, city: "" }));
  };

  const selectCity = (e: any): void => {
    setNewUser((prev: any) => ({ ...prev, city: e.label }));
  };

  const finishSetUp = async () => {
    if(newUser.email == "") return notifyError("email is misssing");
    if(newUser.firstName == "") return notifyError("Enter First Name");
    if(newUser.lastName == "") return notifyError("Enter Last Name");
    if(newUser.state == "") return notifyError("Select State");
    if(newUser.city == "") return notifyError("Select City");
    if(newUser.password == "") return notifyError("Enter Password");
    isSending(true, "Setting Up Your Account...");
    const cb = () => {
      isSending(false);
    };
    const res = await makeRequest("POST", set_up_api, newUser, cb);
    if (res) {
      isSending(false);
      localStorage.setItem("solCart_JWT", res.data);
      localStorage.setItem("solCart-active", 'main');
      localStorage.setItem("solCart-email", res.email);
      dispatch({ type: "LOGIN", payload: res.data });
      Navigate("/profile/main"); // navigate to dashboard
      notifySuccess("Account Setup Successfully");
    }
  };

  return (
    <>
      <div className="my-modal ov-scroll bg-white">
        <AutoSlider />
        <div className="my-col-6 xs-12 ls-h-100vh my-bottom-50 bg-white">
          <div className="my-col-10 my-bottom-10 xs-container xs-down-8 down-9">
            <div className="my-mother">
              <span className="ubuntuBold px20 xs-px13">Account SetUp</span>
            </div>
            <div>
              <span className="ubuntuLight faded-sol xs-px10">
                Let's quickly set up your account
              </span>
            </div>
            <div className="my-mother down-5 xs-down-5">
              <div className="my-col-6 xs-6">
                <div>
                  <span className="ubuntuBold xs-px11 px13">
                    FirstName<sup className="red">*</sup>
                  </span>
                </div>
                <input
                  type="text"
                  value={newUser?.firstName}
                  onChange={(e) => {
                    setNewUser((prev: any) => ({
                      ...prev,
                      firstName: e.target.value.replace(/[\s.]/g, ""),
                    }));
                  }}
                  className="input my-col-11 down-1 xs-11 bg-faded-3 px12 InterLight"
                  placeholder="Type here"
                />
              </div>
              <div className="my-col-6 xs-6">
                <div>
                  <span className="ubuntuBold xs-px11 px13">
                    LastName<sup className="red">*</sup>
                  </span>
                </div>
                <input
                  type="text"
                  value={newUser?.lastName}
                  onChange={(e) => {
                    setNewUser((prev: any) => ({
                      ...prev,
                      lastName: e.target.value.replace(/[\s.]/g, ""),
                    }));
                  }}
                  className="input my-col-12 down-1 xs-12 bg-faded-3 px12 InterLight"
                  placeholder="Type here"
                />
              </div>
              <div className="my-col-12 down-2 xs-12 xs-down-5">
                <div>
                  <span className="ubuntuBold px13 xs-px11">
                    Country<sup className="red">*</sup>
                  </span>
                </div>
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
              <div className="my-col-6 down-2 xs-6 xs-down-5">
                <div>
                  <span className="ubuntuBold xs-px11 px13">
                    State<sup className="red">*</sup>
                  </span>
                </div>
                <div className="my-col-11 xs-11">
                  <Select
                    name="basic-select"
                    onChange={(e: any) => {
                      selectState(e);
                    }}
                    options={states}
                    className="basic-select"
                    classNamePrefix="select"
                    components={{ MenuList }}
                  />
                </div>
              </div>
              <div className="my-col-6 xs-px12 xs-down-5 down-2 xs-6">
                <div>
                  <span className="ubuntuBold px13 xs-px11">
                    City<sup className="red">*</sup>
                  </span>
                </div>
                <Select
                  name="basic-select"
                  onChange={(e: any) => {
                    selectCity(e);
                  }}
                  options={cities}
                  className="basic-select"
                  classNamePrefix="select"
                  components={{ MenuList }}
                />
              </div>
              <div className="my-col-12 down-2 xs-12 xs-down-5">
                <div>
                  <span className="ubuntuBold px13 xs-px11">
                    Password<sup className="red">*</sup>
                  </span>
                </div>
                <input
                  type={see ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setNewUser((prev: any) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  className="input my-col-11 xs-10 bg-faded-3 down-1 ubuntuLight px12"
                  placeholder="Type password"
                />
                <span
                  className="input xs-2 my-col-1 right bg-faded-3 down-1 ubuntuLight"
                  style={{ padding: "5px 8px" }}
                  onClick={() => setSee(!see)}
                >
                  {see ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              <div className="my-col-12 down-3 xs-down-7 xs-12 xs-down-7 down-5">
                <ReactPasswordChecklist
                  rules={["minLength", "specialChar", "number", "capital"]}
                  minLength={8}
                  value={password}
                  className="ubuntuLight px13 xs-px11"
                  messages={{
                    minLength: "Minimum 8 characters",
                    specialChar: "At least 1 special character",
                    number: "At least 1 number",
                    capital: "At least 1 capital letter",
                  }}
                />
              </div>
              <div className="my-col-11 down-7 my-mother xs-down-10">
                <button
                  onClick={finishSetUp}
                  className="btn bg-dark full-width ubuntuBold text-white"
                >
                  Set Up Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSetUp;
