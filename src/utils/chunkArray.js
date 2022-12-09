const chunkArray = (data, pageSize) => {
  // @ Init chunked arr
  const chunkedArr = [];

  // @ Loop through arr
  data.forEach((val) => {
    // @ Get last element
    const last = chunkedArr[chunkedArr.length - 1];

    // @ Check if last and if last length is equal to the chunk len
    if (!last || last.length === pageSize) {
      chunkedArr.push([val]);
    } else {
      last.push(val);
    }
  });

  return chunkedArr;
};

export default chunkArray;
