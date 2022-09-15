const showAll = async () => {
    try {
        const chargers  = await axios.get("/api/test");
        return chargers.data;
    } catch (error) {
        console.log(error);
  }
};
