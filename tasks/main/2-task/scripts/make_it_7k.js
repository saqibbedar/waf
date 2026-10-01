// make_it_7k.js: The download/data generation limit on Mockaroo site is 1,000. Hence, this file just duplicates all other fields except the id which is going to remain unique throughout 7,000 records.

import { EMP_DATASET_FILE_PATH } from "../config/index.js";

import { read_file, write_file } from "../src/utils/index.js";

const data = await read_file(EMP_DATASET_FILE_PATH);

// verify length before data generation
console.log(data.length);

// exiting data is 1k, this function extends it to 7k
function make_it_7k() {
    if (data.length <= 1000) {
        const original_data = [...data];
        for (let i = 1; i <= 6; i++) {
          original_data.forEach(d => {
              data.push({...d, id: parseInt(d.id, 10) + i * 1000});
          })
        }
    } else {
        console.log(`Script didn't ran\nData seems already > 1000\nVerify at ${EMP_DATASET_FILE_PATH}\nTotal length: ${data.length}`);
    }
}

make_it_7k();

// length verification after data generation
// console.log(data.length);

// Write data only if it is under 1k else don't attempt it, make_it_7k() will show default message to inform user that data is already inserted so any new attempt will be rejected or in simple words script is meant to be run for once only, else it will show the useful metadata.
if (data.length > 1000 && data.length === 7000) {
    await write_file(EMP_DATASET_FILE_PATH, JSON.stringify(data));
    console.log(`New 6000 records were inserted into employees.json file\nTotal file length after data insertion: ${data.length}\nVerify file at ${EMP_DATASET_FILE_PATH}`);
}