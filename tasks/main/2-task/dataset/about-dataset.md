# About Data Generation

The complete [dataset](./employees.json) was generated on free account with maximum download size limit of 1000 rows from [Mockaroo](https://www.mockaroo.com/) site.

# Error in Data Generation

The given task's **Part 1: Data Generation** requires **at least 7,000 employee records**, however, it was impossible on free accounts, even if we make a free account but the constraint was only resolvable with pro account. Hence, dataset only contains **1,000 records only**.

![Error Image](error.png)

> IMPORTANT: I have prepared [make_it_7k.js](../scripts/make_it_7k.js) node script to generate 6k more records from existing 1k records with unique id. It will generate 7k records for single time, for next run, it will remain quite and it will show a dedicated reply on console with proper metadata.