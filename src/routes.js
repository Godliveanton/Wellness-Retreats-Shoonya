import axios from "axios";

const getRetreats = async (page) => {
  const data = await axios.get(
    `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${page}&limit=3`
  );

  return data.data;
};

const searchRetreat = async (word, page) => {
  try {
    const data = await axios.get(
      `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?search=${word}&page=${page}&limit=3`
    );

    return data.data;
  } catch (error) {
    return "Not Found";
  }
};

const filterType = async (word, page) => {
  const data = await axios.get(
    `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?filter=${word}&page=${page}&limit=3`
  );

  return data.data;
};

export { getRetreats, searchRetreat, filterType };
