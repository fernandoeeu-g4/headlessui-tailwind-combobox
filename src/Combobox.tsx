import { useState, Fragment, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ComboboxOption } from "./MultipleCombobox";

// const options = [
//   { value: "1", label: "Durward Reynolds" },
//   { value: "2", label: "Kenton Towne" },
//   { value: "3", label: "Therese Wunsch" },
//   { value: "4", label: "Benedict Kessler" },
//   { value: "5", label: "Katelyn Rohan" },
// ];

type Props = {
  options: ComboboxOption[];
  selected: ComboboxOption[];
  setSelected: React.Dispatch<React.SetStateAction<ComboboxOption[]>>;
};

export function MyCombobox({ options, selected, setSelected }: Props) {
  // Se usarmos o useState aqui dentro, o componente funciona como esperado
  // Mas se usarmos via props, ele não funciona
  // O comportamento esperado é ao selecionar 1 opção já selecioanda, ela ser deselecionada
  // Com o useState, ele funciona como esperado
  // Com o useState via props, ele não funciona

  // const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className="flex flex-col space-x-2">
      <span className="text-lg">Headless</span>
      <Combobox
        value={selected}
        onChange={(options) => {
          console.log(options);
          setSelected(options);
        }}
        multiple
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(options: ComboboxOption[]) =>
                options.map((option) => option.label).join(", ")
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nada encontrado
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <div className="flex align-center justify-between">
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <div>
                            <CheckIcon height="16px" width="16px" />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
