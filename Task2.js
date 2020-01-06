const getBondsData = async ({ date, isins }) => {
  const result = await http.post({
    url: `/bonds/${date}`,
    body: isins
  });

  return result;
};

class BondsClient {
  constructor() {
    this._instanceCreated = true;
    this.cachedData = {};
  }

  async getBondsDataCached(data) {
    const { date, isins } = data;
    if (!this.cachedData[date]) {
      const res = await getBondsData({ date, isins });
      this.cachedData[date] = {};
      res.forEach(item => {
        const { isin } = item;
        this.cachedData[date][isin] = item;
      });
      return res;
    } else {
      const existingIsins = [];
      const isinsForRequests = [];
      isins.forEach(isin => {
        if (this.cachedData[date][isin]) {
          existingIsins.push(this.cachedData[date][isin]);
        } else {
          isinsForRequests.push(isin);
        }
      });
      const res = await getBondsData({ date, isinsForRequests });
      res.forEach(item => {
        const { isin } = item;
        this.cachedData[date][isin] = item;
      });
      return [...res, ...existingIsins];
    }
  }
}
