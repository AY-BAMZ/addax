import axios from "axios";

const getHolidays = async () => {
  const response = await axios.get(
    "https://date.nager.at/api/v3/NextPublicHolidaysWorldwide"
  );
  return response.data;
};

export default getHolidays;
