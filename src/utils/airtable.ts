import { PageContent } from "@/types";

const Airtable = require("airtable");

// Authenticate
Airtable.configure({
  apiKey: 'patrKQVLBjjomKAFt.97ed01bd88088f6f5246e8966c8c421a39337cc665ebfa80db95edfa3e51d727',
});

// Initialize a base
const base = Airtable.base('appyDUZyarAXWHWQl');

// Reference a table
const table = base('tblTNHE0GPh1T0Rbs');

// return minified record for a specific page
const getPageContent = (page: string, records: any[]): PageContent => {
  const record = records.find(record => record.fields.page === page);

  return {
    ...record.fields
  };
};


export { table, getPageContent };