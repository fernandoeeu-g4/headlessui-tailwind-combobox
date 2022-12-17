import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { MyCombobox } from "./Combobox";
import { MultipleCombobox, ComboboxOption } from "./MultipleCombobox";

const URL = "https://jsonplaceholder.typicode.com/users";

const options = [
  { value: 1, label: "Durward Reynolds" },
  { value: 2, label: "Kenton Towne" },
  { value: 3, label: "Therese Wunsch" },
  { value: 4, label: "Benedict Kessler" },
  { value: 5, label: "Katelyn Rohan" },
];

type User = {
  id: string;
  email: string;
  name: string;
};

const getUsers = async () => {
  const { data } = await axios(URL);
  return data as User[];
};

const useUsers = () => useQuery("useUsers", getUsers);

const mapper = (users: User[]): ComboboxOption[] =>
  users.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

function App() {
  const { data, isLoading } = useUsers();

  const usersOptions = data ? mapper(data) : [];

  const [selectedUsers, setSelectedUsers] = useState<ComboboxOption[]>([]);
  const [query, setQuery] = useState("");

  return (
    <div className="flex justify-center items-center">
      <MyCombobox
        options={usersOptions}
        selected={selectedUsers}
        setSelected={setSelectedUsers}
      />
    </div>
  );
}
export default App;

{
  /* <MultipleCombobox
  {...{
    // options: usersOptions,
    query,
    setQuery,
    selected: selectedUsers,
    setSelected: setSelectedUsers,
    isDisabled: isLoading,
  }}
  options={usersOptions}
/> */
}
