import SearchPage from "./SearchPage.js"
import axion from "axios"
import Adapter from "enzyme-adapter-react-16";
import React from 'react'
import { shallow, configure, mount } from "enzyme";

configure({ adapter: new Adapter() });
jest.mock("axios")

        let wrapper;
        let mockSubmit;

        beforeEach (() => {
            mockSubmit = jest.fn();
            wrapper = shallow(<SearchPage submit={mockSubmit} />)
        })

        it("should handleChange for seType", () => {
            const expected_state = {
                message: "",
                redirect: false,
                paperdata: [],
                tableHeaders: [
                  "SE Type",
                  "Claim",
                  "Level of Evidence",
                  "Type of Evidence",
                  "Title",
                  "Author",
                  "Journal Name",
                  "DOI",
                ],
                startDate: "1665",
                endDate: "2020",
                seType: "TDD",
                claims: [],
                seTypeOption: [
                  { title: "TDD", value: "TDD" },
                  { title: "BDD", value: "BDD" },
                ],
                claimsOptions: [
                  { title: "all claims", value: "all claims" },
                  { title: "great performance", value: "great performance" },
                  { title: "more productive", value: "more productive" },
                ],
                tableRendered: false,
                sortBy: "",
                columnToSelect: [
                  { title: "Year", value: "Year" },
                  { title: "Volume", value: "Volume" },
                ],
                radioYear: "custom",
                startDateOption: Array.from(
                  { length: 2021 - 1665 },
                  (x, i) => `${i + 1665}`
                ),
                endDateOption: Array.from(
                  { length: 2021 - 1665 },
                  (x, i) => `${i + 1665}`
                ),
              };

              wrapper.instance().handleSETypeChange("TDD");
              expect(wrapper.state()).toEqual(expected_state);
        })


    