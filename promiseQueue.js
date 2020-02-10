function timeOut(ms, data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data.isins);
    }, ms);
  });
}
const getBondsData = async ({ date, isins }) => {
  const result = await timeOut(300, {
    date,
    isins: isins.map(isin => ({
      isin,
      data: {
        r: Math.round(Math.random() * 100)
      }
    }))
  });
  return result;
};

class BondsClient {
  constructor() {
    this.cachedData = {};
    this.isPending = false;
    this.queue = [];
  }

  async getBondsDataCached(args) {
    const result = await new Promise((resolve, reject) => {
      this.queue.push({
        args,
        resolve,
        reject
      });
      this.dequeue();
    });
    return result;
  }

  dequeue() {
    if (this.isPending) {
      return false;
    }

    const nextItem = this.queue.shift();

    if (!nextItem) {
      return false;
    }

    const { date, isins } = nextItem.args;

    if (!this.cachedData[date]) {
      this.isPending = true;
      getBondsData(nextItem.args).then(value => {
        this.cachedData[date] = {};
        value.forEach(isinData => {
          const { isin } = isinData;
          this.cachedData[date][isin] = isinData;
        });
        this.isPending = false;
        nextItem.resolve(value);
        this.dequeue();
      });
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

      getBondsData({ ...nextItem.args, isins: isinsForRequests }).then(
        value => {
          value.forEach(item => {
            const { isin } = item;
            this.cachedData[date][isin] = item;
          });
          this.isPending = false;

          nextItem.resolve([...value, ...existingIsins]);
          this.dequeue();
        }
      );
    }
  }
}

const bc = new BondsClient();
const res = bc.getBondsDataCached({
  date: "20180120",
  isins: ["XS0971721963", "RU000A0JU4L3"]
});

const res2 = bc.getBondsDataCached({
  date: "20180120",
  isins: ["XS0971721963", "11111A0JU4L3"]
});

const res3 = bc.getBondsDataCached({
  date: "20180120",
  isins: ["XS0971721962", "11111A0JU4L3"]
});

res.then(e => {
  console.log(1, e);
});

res2.then(e => {
  console.log(2, e);
});

res3.then(e => {
  console.log(3, e);
});
